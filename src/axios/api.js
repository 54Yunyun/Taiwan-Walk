import axios from 'axios';

// 登入資訊
const ClientID = import.meta.env.VITE_CLIENT_ID;
const ClientSecret = import.meta.env.VITE_CLIENT_SECRET;
const tokenUrl =
  'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';

const data = {
  grant_type: 'client_credentials',
  client_id: ClientID,
  client_secret: ClientSecret,
};

// 定義api基礎路徑
const basicPath = 'https://tdx.transportdata.tw/api/basic/';

const api = {
  async login() {
    try {
      const res = await axios.post(tokenUrl, data, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });
      const accessToken = res.data;
      return {
        authorization: `Bearer ${accessToken.access_token}`,
      };
    } catch (e) {
      return e.response;
    }
  },
  async fetchList(url) {
    try {
      const res = await axios.get(`${basicPath}${url}`, {
        headers: this.login(),
      });
      return res;
    } catch (e) {
      return e.response;
    }
  },
    async fetchOne(url) {
      try {
        const res = await axios.get(`${basicPath}${url}`, {
          headers: this.login(),
        });
        return res;
      } catch (e) {
        return e.response;
      }
    },
};

export { api };
