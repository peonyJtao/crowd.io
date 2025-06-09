import { Button, } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from 'next/router';
import FlexBox from "./FlexBox";
const Header = () => {
  const router = useRouter()
  const routerLink = (path: string) => {
    router.push(path);
  }
  return <FlexBox sx={{ pt: 1, pb: 1 }}>
    <FlexBox sx={{ gap: 2 }}>
      <Button onClick={() => routerLink("/")}>
        所有众筹
      </Button>
      <Button onClick={() => routerLink("/crowdFunding")}>
        我的众筹
      </Button>
    </FlexBox>
    <FlexBox>
      <ConnectButton />
      <Button sx={{ ml: 2 }} variant="contained" onClick={() => routerLink("/createCrowdFunding")}>
        创建项目
      </Button>
    </FlexBox>
  </FlexBox>
}
export default Header;