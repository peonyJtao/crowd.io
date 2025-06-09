import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import Layout from '../components/Layout';
import { config } from '../wagmi';

const client = new QueryClient();
const lang =  'zh';
function MyApp({ Component, pageProps }: AppProps) {
  return (

    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider >
          <Layout>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
            <Component {...pageProps} />
            </LocalizationProvider>
          </Layout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

  );
}

export default MyApp;
