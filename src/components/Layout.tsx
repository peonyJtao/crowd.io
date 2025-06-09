import { Box } from "@mui/material";
import Header from '../components/Header';
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{
      maxWidth: `1200px`,
      margin: `0 auto`,
      padding: `0 1rem`,
    }}>
      <Header />
      {
        children
      }
    </Box>
  );
};
export default Layout;