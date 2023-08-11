<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '../../api/api.js';
import { cities } from '../../constants/cities.js';
import { scenicSpotClass } from '../../constants/scenicSpotClass.js';
import dayjs from 'dayjs';

const router = useRouter();
const route = useRoute();
const mode = 'ScenicSpot';
// 格式化日期
const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');
const currentPage = ref(1);
const citiesList = ref([]);
const chineseCityName = ref();
const activeClass = ref();
const selectedCity = ref(route.params.city || '');
const selectedActive = ref(route.params.active || '');
let selectedId = ref();
let citiesCount = ref(0);
let search = ref(false);
let data = [];

const routeParams = {
  city: selectedCity.value,
  class: selectedActive.value,
};

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
  const url = `/scenicSpotDetail/${selectedId.value}`;
  // 跳轉至對應 id 頁面
  router.push({ path: url });
};

const selectSearch = async () => {
  // 檢查是否有選擇縣市及活動
  const isCitySelected = selectedCity.value !== '';
  const isActivitySelected = selectedActive.value !== '';
  // 如果兩者都選了，則進行縣市加活動的搜尋
  if (isCitySelected && isActivitySelected) {
    activeClass.value = selectedActive.value;
    data = await api.fetchCityClassList(
      mode,
      `${selectedCity.value}`,
      `${selectedActive.value}`
    );
  } else if (isCitySelected) {
    // 如果只選了縣市，則進行縣市搜尋
    data = await api.fetchCityClassList(mode, `${selectedCity.value}`, '');
  } else if (isActivitySelected) {
    activeClass.value = selectedActive.value;
    // 如果只選了活動，則進行活動搜尋
    data = await api.fetchCityClassList(mode, '', `${selectedActive.value}`);
  }
  if (data.length > 0) {
    search.value = true;
  }

  citiesCount.value = data.length;
  citiesList.value = data;
  const matchedCity = cities.find((city) => city.value === selectedCity.value);
  chineseCityName.value = matchedCity ? matchedCity.name : '';
  routeParams.city = selectedCity.value;
  routeParams.class = selectedActive.value;
  router.replace({ name: 'ScenicSpotIndex', params: routeParams });
};

const reloadData = () => {
  selectedCity.value = '';
  selectedActive.value = '';
  search.value = false;
  routeParams.city = '';
  routeParams.class = '';
  router.replace({ name: 'ScenicSpotIndex', params: routeParams });
};

const clear = () => {
  selectedCity.value = '';
  selectedActive.value = '';
};
const goActiveClass = async (ClassName) => {
  data = await api.fetchCityClassList(mode, '', `${ClassName}`);
  search.value = true;
  activeClass.value = ClassName;
  citiesList.value = data;
  citiesCount.value = citiesList.value.length;
  routeParams.city = '';
  routeParams.class = ClassName;
  router.replace({ name: 'ScenicSpotIndex', params: routeParams });
};
watch(route, () => {
  if (route.params.city !== undefined) {
    selectedCity.value = route.params.city;
  }
  if (route.params.active !== undefined) {
    selectedActive.value = route.params.active;
  }
});
onMounted(() => {
  const city = route.params.city || '';
  const className = route.params.class || '';
  selectSearch();
});
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
        <li class="breadcrumb-item">
          <a @click="reloadData" class="breadcrumb-item">探索景點</a>
        </li>
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
          <option value="" selected disabled hidden>請選擇主題</option>
          <option
            v-for="placeClass in scenicSpotClass"
            :value="placeClass.name"
            :key="placeClass.name"
          >
            {{ placeClass.name }}
          </option>
        </select>
      </div>

      <div class="form-btn col-lg-3 mb-3">
        <button class="search-btn" @click="selectSearch">
          <span class="search-img">
            <img src="../../assets/icon/Union.png" alt="" />
          </span>
          搜尋
        </button>
        <button class="search-btn clear-btn" @click="clear">清除</button>
      </div>
    </div>
    <!-- 預設內容 -->
    <div v-if="!search">
      <div class="index-title">熱門主題</div>
      <div class="card-wrap row">
        <div
          class="card g-3 col-lg-3 col-md-6"
          v-for="scenicSpotClass in scenicSpotClass"
          :key="scenicSpotClass.name"
        >
          <div class="card-img">
            <img
              :src="scenicSpotClass.imgUrl"
              :alt="scenicSpotClass.name"
              @click="goActiveClass(scenicSpotClass.name)"
            />
          </div>
          <span class="active-title">{{ scenicSpotClass.name }}</span>
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
      <div class="row" v-if="citiesCount === 0">
        <div class="no-data-wrap pt-5 col-lg-3 col-md-6">
          <div class="no-data-container">
            <div class="no-data-img">
              <div class="no-data-circle">
                <img src="../../assets/icon/noData.png" alt="" />
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
                :src="active.Picture.PictureUrl1"
                :alt="active.ActivityName"
              />
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">{{ active.ScenicSpotName }}</div>
            <div class="text-muted">
              <div class="active-location">
                <i class="bi bi-geo-alt"></i
                ><span class="city">{{ active.Address }}</span>
              </div>
              <span
                class="active-class-icon"
                v-if="active.Class1 || active.Class2"
                ><i class="bi bi-tag"></i
              ></span>
              <span class="active-class" v-if="active.Class1"
                ># {{ active.Class1 }}</span
              >
              <span class="active-class" v-if="active.Class2"
                ># {{ active.Class2 }}</span
              >
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
