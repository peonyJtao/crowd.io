import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { abi, contractAddress } from '../ABI';
import Table from '../components/Table';
import { Box } from '@mui/material';
const CrowdFunding: NextPage = () => {
  const [list,setList] = useState([]);
  const account = useAccount();
  // 获取所有项目
  const data = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getProject',
  })
  useEffect(()=>{
    if(account.address && data.data){
      // @ts-ignore
      setList(data.data.filter((item:any)=>item.owner === account.address));
    }
  },[account.address, data.data])
  
  return (
   <Box mt={2}>
      <Table data={list || []}  />
    </Box>
  );
};

export default CrowdFunding;