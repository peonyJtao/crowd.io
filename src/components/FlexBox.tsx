import { Box, BoxProps } from "@mui/material";
const FlexBox = ({ sx, children }: { sx?: BoxProps, children?: React.ReactNode }) => {
  return <Box display="flex" alignItems="center" justifyContent="space-between" sx={sx}>
    {children}
  </Box>
}
export default FlexBox;