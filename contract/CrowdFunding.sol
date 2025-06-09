// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CrowdFunding {
    struct Crowd {
        address owner; // 项目owner
        uint256 id; // 项目id
        string title; // 项目名称
        string description; // 项目描述
        uint256 target; // 目标金额
        uint256 startTime; // 开始时间
        uint256 endTime; // 结束时间
        uint256 amountCollected; // 筹集金额
        string image; // 项目图片
        address[] donators; // 项目参与者
        uint256[] donations; // 参与者捐款金额
        uint256 closed; // 项目是否结束 0 开始 1 结束 2 取消
        bool status; // 是否提款
    }
    mapping(uint256 => Crowd) public project;
    // 项目索引
    uint256 public index = 0;
    // 创建项目事件
    event CreateCrowd(address indexed owner, uint256 id, uint256 amount);
    // 提款事件
    event Deposit(
        address indexed owner,
        uint256 id,
        address indexed rejectTodonators,
        uint256 amount
    );
    // 退款事件
    event Reject(
        address indexed owner,
        uint256 id,
        address indexed rejectTodonators,
        uint256 amount
    );
    // 退款失败事件
    error RejectErr(
        address owner,
        uint256 id,
        address rejectTodonators,
        uint256 amount
    );

    // 创建项目
    function createCrowd(
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _endTime,
        string memory _image
    ) public returns (uint256) {
        Crowd storage crowd = project[index];
        crowd.startTime = block.timestamp;
        crowd.owner = msg.sender;
        crowd.id = index;
        crowd.title = _title;
        crowd.description = _description;
        crowd.target = _target;
        crowd.endTime = block.timestamp + _endTime;
        crowd.image = _image;
        crowd.amountCollected = 0;
        index++;
        emit CreateCrowd(crowd.owner, crowd.id, _target);
        return index - 1;
    }

    // 捐款
    function donate(uint256 _id) external payable {
        Crowd storage crowd = project[_id];
        require(crowd.closed == 0, " project is closed");
        crowd.donators.push(msg.sender);
        crowd.donations.push(msg.value);
        crowd.amountCollected += msg.value;
        if (crowd.endTime <= block.timestamp) {
            crowd.closed = 1;
        }
        emit Deposit(crowd.owner, crowd.id, msg.sender, msg.value);
    }

    // 提款
    function withdraw(uint256 _id) external {
        Crowd storage crowd = project[_id];
        // 项目是否结束
        require(block.timestamp > crowd.endTime, "project is not closed");
        // 是否项目owner
        require(crowd.owner == msg.sender, "is not owner");
        uint256 amount = crowd.amountCollected;
        (bool sent, ) = payable(crowd.owner).call{value: amount}("");
        if (sent) {
            crowd.closed = 1;
            crowd.status = true;
        }
    }

    // 退款 项目方取消项目
    function reject(uint256 _id) external {
        Crowd storage crowd = project[_id];
        // 项目结束
        // require(crowd.endTime > block.timestamp, "project is not closed");
        // 项目owner
        require(crowd.owner == msg.sender, "is not owner");
        crowd.closed = 2;
        if (crowd.amountCollected != 0) {
            for (uint256 i; i < index; i++) {
                address donators = crowd.donators[i];
                uint256 value = crowd.donations[i];
                (bool sent, ) = payable(donators).call{value: value}("");
                if (sent) {
                    emit Reject(msg.sender, crowd.id, donators, value);
                } else {
                    revert RejectErr(msg.sender, crowd.id, donators, value);
                }
            }
        }
    }

    // 获取所有项目
    function getProject() external view returns (Crowd[] memory) {
        Crowd[] memory allCrowd = new Crowd[](index);
        for (uint256 i; i < index; i++) {
            Crowd storage crowd = project[i];
            allCrowd[i] = crowd;
        }
        return allCrowd;
    }
}

