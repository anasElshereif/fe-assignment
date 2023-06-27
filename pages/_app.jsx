import { ConfigProvider } from 'antd';
import axios from 'axios';
import { DEFAULT_COLOR, API_URL, API_TOKEN } from '../config/config';
import '../styles/globals.scss';
import '../styles/set.scss';
import '../styles/ant-custom.scss';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common = { Authorization: `Bearer ${API_TOKEN}` };

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: DEFAULT_COLOR,
          colorInfo: DEFAULT_COLOR,
          fontSize: 16,
          fontFamily: 'Roboto',
          borderRadius: 0,
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
