import { Box } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useReadContract, useWatchContractEvent } from 'wagmi';
import { abi, contractAddress as address } from '../ABI';
import Table from '../components/Table';
const Home: NextPage = () => {
  const [list, setList] = useState([]);
  // 获取所有项目
  const data = useReadContract({
    abi,
    address,
    functionName: 'getProject',
  })
  console.log(data.data,'da');
  

  useEffect(() => {
    if (data.data) {
      // @ts-ignore
      setList(data.data);
    }
  }, [data.data]);
  useWatchContractEvent({
    address,
    abi,
    eventName: 'TrCreateCrowdansfer',
    onLogs(logs) {
      console.log(logs, 'logs');
      const _data = useReadContract({
        abi,
        address,
        functionName: 'getProject',
      })
      if (_data.data) {
        // @ts-ignore
        setList(_data.data);
      }
    },
  })
  
  return (
    <Box mt={2}>
      <Table data={list} />
    </Box>
  );
};

export default Home;