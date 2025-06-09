
import { Box, Button, TextField } from '@mui/material';
import { ethers } from 'ethers';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { abi, contractAddress as address } from '../ABI';

const Deposit: NextPage = () => {
  const router = useRouter();
  const { writeContract } = useWriteContract();
  const { query: { id } } = router;
  const [amount, setAmount] = useState<string>("");
  const onSave = () => {
    writeContract({
      abi,
      address,
      functionName: 'donate',
      args: [
        id
      ],
      value: ethers.parseEther(amount),
    })
  }
  return (
    <Box mt={2}>
      <TextField fullWidth value={amount} type='number' onChange={(e) => setAmount(e.target.value)} />
      <Button variant='contained' onClick={onSave}>募捐</Button>
    </Box>
  );
};

export default Deposit;