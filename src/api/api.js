import axios from 'axios';
const today = new Date().toISOString().split('T')[0];

// 登入資訊
const { VITE_CLIENT_ID: ClientID, VITE_CLIENT_SECRET: ClientSecret } =
  import.meta.env;

const tokenUrl = import.meta.env.VITE_TOKEN_URL;

const data = {
  grant_type: 'client_credentials',
  client_id: ClientID,
  client_secret: ClientSecret,
};

// 定義api基礎路徑
const basicPath = import.meta.env.VITE_API_URL;

const api = {
  persist: true,
  async login() {
    try {
      const res = await axios.post(tokenUrl, data, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });
      const accessToken = res.data;
      return {
        authorization: `Bearer ${accessToken.access_token}`,
      };
    } catch (err) {
      console.error(err);
    }
    return;
  },
  // 首頁，取得活動列表
  async fetchActivityList() {
    try {
      const url = `${basicPath}Activity?$select=ActivityId,
                    ActivityName,Picture,Address,Class1,Class2
                    &$filter=Picture/PictureUrl1 ne null and StartTime ge ${today}  
                    &$top=30&$format=JSON`;
      const res = await axios.get(url, {
        headers: this.login(),
      });
      const { data, status } = res;
      if (status === 200) {
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  },
  // 取得景點列表
  async fetchPlaceList() {
    try {
      const url = `${basicPath}ScenicSpot?$select=ScenicSpotId,
      ScenicSpotName,Picture,Address,Class1,Class2,Class3,OpenTime,TicketInfo
      &$filter=Picture/PictureUrl1 ne null &$top=30&$format=JSON`;
      const res = await axios.get(url, {
        headers: this.login(),
      });
      const { data, status } = res;
      if (status === 200) {
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  },
  // 取得美食列表
  async fetchRestaurantList() {
    try {
      const url = `${basicPath}Restaurant?$select=RestaurantId,
      RestaurantName,Picture,Address,Class,OpenTime&$filter=Picture/
      PictureUrl1 ne null &$top=30&$format=JSON`;
      const res = await axios.get(url, {
        headers: this.login(),
      });
      const { data, status } = res;
      if (status === 200) {
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return [];
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
  // 精選活動、探索景點、品嚐美食首頁，取得列表（城市）
  async fetchCityList(mode, city) {
    try {
      let url = `${basicPath}${mode}/${city}?`;
      url += `$top=30&$format=JSON`;
      url += `&$select=${mode}ID,${mode}Name,Address,Picture`;
      switch (mode) {
        case 'ScenicSpot':
          url +=
            ',Class1,Class2,Class3,OpenTime,TicketInfo&$filter=Picture/PictureUrl1 ne null';
          break;
        case 'Restaurant':
          url += ',Class,OpenTime&$filter=Picture/PictureUrl1 ne null';
          break;
        case 'Activity':
          url += `,Class1,Class2&$orderby=StartTime asc&$filter=Picture/PictureUrl1 ne null`;
          break;
      }
      const res = await axios.get(url, {
        headers: this.login(),
      });
      const { data, status } = res;

      if (status === 200) {
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  },
  // 精選活動、探索景點、品嚐美食首頁，取得列表（城市、類別）
  async fetchCityClassList(mode, city, className) {
    try {
      let filter = '';
      let url = `${basicPath}${mode}/${city}?${className}`;
      url += `$top=200&$format=JSON`;
      url += `&$select=${mode}ID,${mode}Name,Address,Picture`;
      switch (mode) {
        case 'ScenicSpot':
          url += ',Class1,Class2,Class3,OpenTime,TicketInfo';
          filter += ` or contains(Class1,'${className}') or contains(Class2,'${className}')`;
          break;
        case 'Restaurant':
          url += ',Class,OpenTime';
          filter += ` or contains(Class,'${className}')`;
          break;
        case 'Activity':
          url += ',Class1,Class2&$orderby=StartTime asc ';
          filter += ` or contains(Class1,'${className}') or contains(Class2,'${className}  ')`;
          break;
      }
      url += `&$filter=Picture/PictureUrl1 ne null`;
      filter = filter.replace(' or ', '');
      url += ` and (${filter})`;
      const res = await axios.get(url, {
        headers: this.login(),
      });
      const { data, status } = res;
      if (status === 200) {
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  },
  // 精選活動、探索景點、品嚐美食，鄰近的資料
  async fetchNearbyList(mode, lat, lon) {
    try {
      let url = `${basicPath}${mode}?`;
      url += `$top=4&$format=JSON`;
      url += `&$select=${mode}ID,${mode}Name,Address,Picture`;
      switch (mode) {
        case 'ScenicSpot':
          url += ',Class1,Class2,Class3,OpenTime,TicketInfo';
          break;
        case 'Restaurant':
          url += ',Class,OpenTime';
          break;
        case 'Activity':
          url += ',Class1,Class2';
          break;
      }
      url += `&$spatialFilter=nearby(${lat},${lon},50000)`;
      url += `&$filter=Picture/PictureUrl1 ne null`;
      const res = await axios.get(url, {
        headers: this.login(),
      });
      const { data, status } = res;
      if (status === 200) {
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  },

  async fetchOne(mode, id) {
    try {
      let url = `${basicPath}${mode}?$filter=${mode}ID eq '${id}' 
      and Picture/PictureUrl1 ne null&$top=1&$format=JSON`;
      const res = await axios.get(url, {
        headers: this.login(),
      });
      const { data, status } = res;
      if (status === 200) {
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  },
};

export { api };
