import { Box, Button, TextField, styled } from "@mui/material";
import { format } from "date-fns";
import { ethers } from 'ethers';
import { useFormik } from "formik";
import { useRouter } from 'next/router';
import { useWriteContract } from 'wagmi';
import * as Yup from "yup";
import { abi, contractAddress as address } from '../ABI';

type Crowd = {
  title: string,
  description: string,
  target: number | null,
  endTime: string,
  image: string,
}

const initialValues: Crowd = {
  title: "",
  description: "",
  target: null,
  endTime: '',
  image: ""
};

const AppTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '24px'
}));

const renderDate = (dateTime: number) => {
  return dateTime && format(dateTime, "yyyy-MM-dd");
};

const CreateCrowdFunding = () => {
  const router = useRouter()
  const { writeContract } = useWriteContract();
  const validationSchema = Yup.object({
    title: Yup.string().required("名称必填"),
    description: Yup.string().required("描述必填"),
    target: Yup.number().required("目标金额必填"),
    endTime: Yup.number().required("持续时长必填"),
    image: Yup.string().required("图片必填"),
  });
  const onSave = () => {
    const { title, description, target, endTime, image } = values;
    const _target = ethers.parseEther(target + '');
    console.log([
      title,
      description,
      _target,
      endTime,
      image
    ]);

    writeContract({
      abi,
      address,
      functionName: 'createCrowd',
      args: [
        title,
        description,
        _target,
        endTime,
        image
      ],
    }, {
      onSuccess: (tx) => {
        router.push("/crowdFunding");
      },
      onError: (error) => {
        console.log(error, 'error');
      }
    })
  }
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSave
  });

  return <Box mt={2}>
    <h1>Create CrowdFunding</h1>
    <form onSubmit={handleSubmit}>
      <AppTextField fullWidth label="项目名称" name="title" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.title} helperText={touched.title && errors.title} error={Boolean(touched.title && errors.title)} />
      <AppTextField fullWidth label="描述" name="description" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.description} helperText={touched.description && errors.description} error={Boolean(touched.description && errors.description)} />
      <AppTextField fullWidth placeholder="0.5ETH" label="目标金额" type="number" name="target" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.target} helperText={touched.target && errors.target} error={Boolean(touched.target && errors.target)} />
      <AppTextField fullWidth label="图片" name="image" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.image} helperText={touched.image && errors.image} error={Boolean(touched.image && errors.image)} />
      <AppTextField placeholder="持续时长秒" fullWidth type="number" name="endTime" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.endTime} helperText={touched.endTime && errors.endTime} error={Boolean(touched.endTime && errors.endTime)} />
      <Button variant="contained" type="submit">确定</Button>
    </form>
  </Box>
}
export default CreateCrowdFunding