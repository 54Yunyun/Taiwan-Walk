<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../axios/api.js';
import dayjs from 'dayjs';
import { cities } from '../assets/js/cities.js';

const router = useRouter();
// 格式化日期
const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');

const currentPage = ref(1);
const citiesList = ref([]);
let selectedId = ref();
let cityName = ref();
let citiesCount = ref(0);
const selectedCity = ref(cities[0]);
let search = ref(false);

// 監聽縣市
watch(selectedCity, (newVal) => {
  cityName = newVal;
});

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

// 取得相關縣市資料
const searchCity = async () => {
  const cityUrl = `v2/Tourism/ScenicSpot/${cityName}?%24StartTime&%24format=JSON`;
  const res = await api.fetchOne(cityUrl);
  console.log('res', res);
  const { data, status } = res;
  if (status == 200) {
    search.value = true;
    citiesCount.value = data.length;
    citiesList.value = data;
    console.log('citiesList', citiesList.value);
  }
};

// 取得點選的縣市ID
const handleCardClick = (ScenicSpotID) => {
  selectedId.value = ScenicSpotID;
  console.log('id', ScenicSpotID);
  const url = `/placeDetail/${selectedId.value}`;
  // 跳轉至對應 id 頁面
  router.push({ path: url });
};

// 活動分類
const places = [
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
        <li class="breadcrumb-item">精選活動</li>
      </ol>
    </nav>
    <!-- 搜尋 -->
    <div class="row py-4 d-flex justify-content-center">
      <div class="col-lg-3 mb-3">
        <div class="select-wrap">
          <select class="form-select" v-model="selectedCity">
            <option value="all" selected></option>
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
        <select class="form-select">
          <option value="all" selected>全部主題</option>
          <option></option>
        </select>
      </div>
      <div class="col-lg-4 mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="想找有趣的？請輸入關鍵字"
        />
      </div>
      <div class="form-btn col-lg-2 mb-3">
        <button class="search-btn" @click="searchCity">
          <span class="search-img">
            <img src="../assets/icon/Union.png" alt="" />
          </span>
          搜尋
        </button>
      </div>
    </div>
    <!-- 預設內容 -->
    <div v-if="!search">
      <div class="index-title">熱門主題</div>
      <div class="card-wrap row">
        <div
          class="card g-3 col-lg-3 col-md-6"
          v-for="active in places"
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
        搜尋結果
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
