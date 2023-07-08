<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { api } from '../axios/api.js';
import dayjs from 'dayjs';
import { cities } from '../assets/js/cities.js';

const router = useRouter();
const route = useRoute();
// 格式化日期
const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');
const loading = ref();
const currentPage = ref(1);
const citiesList = ref([]);
const chineseCityName = ref();
const activeClass = ref();
let selectedId = ref();
let citiesCount = ref(0);
const selectedCity = ref(route.params.city || '');
const selectedActive = ref(route.params.active || '');
let search = ref(false);

const routeParams = {
  city: selectedCity.value,
  active: selectedActive.value,
};

// 監聽縣市
// watch(selectedCity, (newVal) => {
//   cityName = newVal;
// });

const onClickHandler = function (page) {
  currentPage.value = page;
};

const visibleCities = computed(() => {
  // 如果當前頁碼是 1，起始index start 則是 0，從 citiesList  index[0] 取出 12 筆資料
  const start = (currentPage.value - 1) * 12;
  // 因index 起始是 0 ，所以 end 為 start + 12;
  const end = start + 12;
  // 回傳 index[start] ~ index[end] 的資料
  return citiesList.value.slice(start, end);
});



// 取得點選的縣市ID
const handleCardClick = (ScenicSpotID) => {
  selectedId.value = ScenicSpotID;
  console.log('id', ScenicSpotID);
  const url = `/placeDetail/${selectedId.value}`;
  // 跳轉至對應 id 頁面
  router.push({ path: url });
};

const selectSearch = async () => {
  loading.value = true;
  // 檢查是否有選擇縣市及活動
  const isCitySelected = selectedCity.value !== undefined;
  const isActivitySelected = selectedActive.value !== undefined;
  console.log('isCitySelected', selectedCity.value);
  // 如果兩者都選了，則進行縣市加活動的搜尋
  if (isCitySelected && isActivitySelected) {
    activeClass.value = selectedActive.value;
    const url = `v2/Tourism/ScenicSpot/${selectedCity.value}?${selectedActive.value}%27&$top=200&$format=JSON
    &$select=ScenicSpotID,ScenicSpotName,Address,City,Picture,Class1,Class2
    &$filter=contains(Class1,'${selectedActive.value}') or contains(Class2,'${selectedActive.value}')`;
    const res = await api.fetchList(url);
    const { data, status } = res;
    console.log("data",data);
    if (status == 200) {
      loading.value = false;
      search.value = true;
      citiesCount.value = data.length;
      citiesList.value = data;
      const matchedCity = cities.find(
        (city) => city.value === selectedCity.value
      );
      console.log('matchedCity', matchedCity);
      chineseCityName.value = matchedCity ? matchedCity.name : '';
      routeParams.city = selectedCity.value;
      routeParams.active = selectedActive.value;
      console.log('routeParams', routeParams);
      router.replace({ name: 'PlacesIndex', params: routeParams });
    }
  } else if (isCitySelected) {
    // 如果只選了縣市，則進行縣市搜尋
    const url = `v2/Tourism/ScenicSpot/${selectedCity.value}?%24StartTime&%24format=JSON`;
    const res = await api.fetchList(url);
    const { data, status } = res;
    if (status == 200) {
      loading.value = false;
      search.value = true;
      citiesCount.value = data.length;
      citiesList.value = data;
      const matchedCity = cities.find(
        (city) => city.value === selectedCity.value
      );
      routeParams.city = selectedCity.value;
      chineseCityName.value = matchedCity ? matchedCity.name : '';
      router.replace({ name: 'PlacesIndex', params: routeParams });
    }
  } else if (isActivitySelected) {
    activeClass.value = selectedActive.value;
    // 如果只選了活動，則進行活動搜尋
    const url = `v2/Tourism/ScenicSpot?$filter=Class1%20eq%20%27${selectedActive.value}%27&$top=200&$format=JSON`;
    const res = await api.fetchList(url);
    const { data, status } = res;
    console.log('res', res.data);
    if (status == 200) {
      loading.value = false;
      search.value = true;
      citiesCount.value = data.length;
      citiesList.value = data;
      routeParams.active = selectedActive.value;
      router.replace({ name: 'PlacesIndex', params: routeParams });
    }
  }
};



// 活動分類
const placesClass = [
  {
    name: '自然風景類',
    imgUrl: 'src/assets/img/place_1.jpeg',
    value: '自然風景類',
  },
  {
    name: '觀光工廠類',
    imgUrl: 'src/assets/img/place_2.jpeg',
    value: '觀光工廠類',
  },
  {
    name: '遊憩類',
    imgUrl: 'src/assets/img/place_3.jpeg',
    value: '遊憩類',
  },
  {
    name: '休閒農業類',
    imgUrl: 'src/assets/img/place_4.jpeg',
    value: '休閒農業類',
  },
  {
    name: '生態類',
    imgUrl: 'src/assets/img/place_5.jpeg',
    value: '生態類',
  },
  {
    name: '溫泉類',
    imgUrl: 'src/assets/img/place_6.jpeg',
    value: '古蹟類',
  },
  {
    name: '古蹟類',
    imgUrl: 'src/assets/img/place_7.jpeg',
    value: '古蹟類',
  },
];
</script>
<template>
  <div class="purpose-index container p-5">
    <!-- 麵包屑 -->
    <nav aria-label="breadcrumb" class="py-2 mt-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-Link :to="{ name: 'Index' }" class="text-decoration-none"
            >首頁</router-Link
          >
        </li>
        <li class="breadcrumb-item">探索景點</li>
      </ol>
    </nav>
    <!-- 搜尋 -->
    <div class="row py-4 d-flex">
      <div class="col-lg-3 mb-3">
        <div class="select-wrap">
          <select class="form-select" v-model="selectedCity">
            <option value="" selected disabled hidden>請選擇縣市</option>
            <option
              v-for="city in cities"
              :value="city.value"
              :key="city.value"
            >
              {{ city.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-lg-3 mb-3">
        <select class="form-select" v-model="selectedActive">
          <option value="" selected disabled hidden>請選擇分類</option>
          <option
            v-for="placeClass in placesClass"
            :value="placeClass.name"
            :key="placeClass.name"
          >
            {{ placeClass.name }}
          </option>
        </select>
      </div>

      <div class="form-btn col-lg-2 mb-3">
        <button class="search-btn" @click="selectSearch">
          <span class="search-img">
            <img src="../assets/icon/Union.png" alt="" />
          </span>
          搜尋
        </button>
      </div>
    </div>
    <!-- 預設內容 -->
    <div v-if="!search">
      <div class="index-title">熱門分類</div>
      <div class="card-wrap row">
        <div
          class="card g-3 col-lg-3 col-md-6"
          v-for="active in placesClass"
          :key="active.name"
        >
          <div class="card-img">
            <img :src="active.imgUrl" :alt="active.name" />
          </div>
          <span class="active-title">{{ active.name }}</span>
        </div>
      </div>
    </div>
    <!-- 搜尋內容 -->
    <div v-if="search">
      <div class="index-title">
        {{ chineseCityName }} {{ activeClass }} 搜尋結果
        <span class="search-all"
          >共有 <span class="search-count">{{ citiesCount }} </span> 筆</span
        >
      </div>
      <!-- 查無資料 -->
      <div class="row" v-if="citiesCount == 0">
        <div class="no-data-wrap pt-5 col-lg-3 col-md-6">
          <div class="no-data-container">
            <div class="no-data-img">
              <div class="no-data-circle">
                <img src="../assets/icon/noData.png" alt="" />
              </div>
            </div>
            <div class="no-data-info pt-2">很抱歉，找不到任何資料!</div>
          </div>
        </div>
      </div>
      <!-- 有資料 -->
      <div class="row" v-if="citiesCount > 0">
        <div
          class="card g-3 col-lg-3 col-md-6"
          v-for="(active, index) in visibleCities"
          :key="index"
          @click="handleCardClick(active.ScenicSpotID)"
        >
          <div class="overflow-hidden places-card shadow">
            <div class="card-img search-card-img">
              <img
                :src="
                  active.Picture.PictureUrl1
                    ? active.Picture.PictureUrl1
                    : active.Picture.PictureUrl2
                    ? active.Picture.PictureUrl2
                    : active.Picture.PictureUrl3
                    ? active.Picture.PictureUrl3
                    : 'src/assets/img/nullPicture.png'
                "
                :alt="active.ActivityName"
              />
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">{{ active.ScenicSpotName }}</div>
            <div class="text-muted">
              <div class="active-location">
                <i class="bi bi-geo-alt"></i
                ><span class="city">{{ active.City }}</span>
              </div>
              <span
                class="active-class-icon"
                v-if="active.Class1 || active.Class2"
                ><i class="bi bi-tag"></i
              ></span>
              <span class="active-class" v-if="active.Class1"># {{
                active.Class1
              }}</span>
              <span class="active-class" v-if="active.Class2"># {{
                active.Class2
              }}</span>
            </div>
          </div>
        </div>
        <div class="pagination mt-5">
          <vue-awesome-paginate
            :total-items="citiesCount"
            :items-per-page="12"
            :max-pages-shown="4"
            v-model="currentPage"
            :on-click="onClickHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>
