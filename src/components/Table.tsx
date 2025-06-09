import { Button, Drawer } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import FlexBox from './FlexBox';
import { H5, Tiny } from './Typography';

import { abi, contractAddress as address } from '../ABI';
type Record = {
  id: BigInt,
  title: string,
  amountCollected: BigInt,
  donators: string[],
  donations: string[],
  endTime: BigInt,
  startTime: BigInt,
  image: string,
  target: BigInt,
  description: string,
  owner: string,
  closed: BigInt,
  status: boolean
}
const renderDateTime = (dateTime: number) => {
  return dateTime && format(dateTime, "yyyy-MM-dd HH:MM:SS");
};
export default function BasicTable({
  data
}: { data: any[] }) {

  const { writeContract } = useWriteContract();
  const account = useAccount();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [record, setRecrod] = useState<Record | null>(null);

  const reject = (id: BigInt) => {
    writeContract({
      abi,
      address,
      functionName: 'reject',
      args: [
        Number(id)
      ],
    })
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>名称</TableCell>
              <TableCell>项目发起人</TableCell>
              <TableCell>描述</TableCell>
              <TableCell>状态</TableCell>
              <TableCell>详情</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((item, index) => <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {
                    { 0: '运行中', 1: '已结束', 2: '已取消' }[Number(item?.closed)]}</TableCell>
                <TableCell>
                  {
                    Number(item.closed) === 0 && <Button onClick={() => {
                      router.push(`/deposit?id=${item.id}`)
                    }}>募捐</Button>
                  }
                  <Button onClick={() => {
                    setRecrod(item)
                    setOpen(true)
                  }}>查看</Button>
                  {
                    (account.address === item.owner && Number(item.closed) === 0) && <Button onClick={() => reject(item.id)}>撤销</Button>
                  }
                  {
                    (!account.status && Number(item.closed) === 1) && <Button onClick={() => reject(item.id)}>提币</Button>
                  }

                </TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="right" sx={{
        "& .MuiDrawer-paper": {
          width: '600px',
          padding: '20px'
        }
      }}>
        <FlexBox>
          <H5>ID</H5>
          <Tiny>{record?.id}</Tiny>
        </FlexBox>
        <FlexBox>
          <H5>名称</H5>
          <Tiny>{record?.title}</Tiny>
        </FlexBox>
        <FlexBox>
          <H5>描述</H5>
          <Tiny>{record?.description}</Tiny>
        </FlexBox>
        <FlexBox>
          <H5>项目发起人</H5>
          <Tiny>{record?.owner}</Tiny>
        </FlexBox>
        <FlexBox>
          <H5>项目参与人数</H5>
          <Tiny>{record?.donators?.length}</Tiny>
        </FlexBox>
        <FlexBox>
          <H5>项目筹备金额</H5>
          <Tiny>{record?.amountCollected ? ethers.formatEther(record?.amountCollected + '') : 0} ETH</Tiny>
        </FlexBox>
        <FlexBox>
          <H5>项目筹备金额</H5>
          <Tiny>{record?.target ? ethers.formatEther(record?.target + '') : 0} ETH</Tiny>
        </FlexBox>
        <FlexBox>
          <H5>项目开始时间</H5>
          <Tiny>{record?.startTime && renderDateTime(Number(record?.startTime) * 1000)}</Tiny>
        </FlexBox>
        <FlexBox>
          <H5>项目结束时间</H5>
          <Tiny>{record?.endTime && renderDateTime(Number(record?.endTime) * 1000)}</Tiny>
        </FlexBox>
        <FlexBox>
          <H5>项目是否结束</H5>
          <Tiny>{
            { 0: '运行中', 1: '已结束', 2: '已取消' }[Number(record?.closed)]}</Tiny>
        </FlexBox>

      </Drawer>
    </>
  );
}