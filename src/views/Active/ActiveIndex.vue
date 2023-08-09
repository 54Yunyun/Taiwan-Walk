<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '../../api/api.js';
import { cities } from '../../constants/cities.js';
import { activesClass } from '../../constants/activesClass.js';
import dayjs from 'dayjs';

const router = useRouter();
const route = useRoute();
const mode = 'Activity';
// 格式化日期
const today = new Date().toISOString();
const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');
const loading = ref();
const currentPage = ref(1);
const citiesList = ref([]);
const chineseCityName = ref();
const activeClass = ref();
const selectedCity = ref(route.params.city || '');
const selectedActive = ref(route.params.active || '');
let selectedId = ref();
let citiesCount = ref(0);
let search = ref(false);
let showAllData = ref(false);
let data = ref([]);
let allData = ref([]);

const routeParams = {
  city: String,
  class: String,
};
const onClickHandler = (page) => {
  currentPage.value = page;
};

const visibleCities = computed(() => {
  // 如果當前頁碼是 1，起始index start 則是 0，從 citiesList  index[0] 取出 12 筆資料
  const start = (currentPage.value - 1) * 12;
  // 因index 起始是 0 ，所以 end 為 start + 12;
  const end = start + 12;
  // 回傳 index[start] ~ index[end] 的資料
  if (showAllData.value) {
    citiesCount.value = allData.value.length;
    return allData.value.slice(start, end); // 显示所有活动
  } else {
    citiesCount.value = citiesList.value.length;
    return citiesList.value.slice(start, end);
  }
});

const selectSearch = async () => {
  // 檢查是否有選擇縣市及活動
  const isCitySelected = selectedCity.value !== '';
  const isActivitySelected = selectedActive.value !== '';
  // 如果兩者都選了，則進行縣市加活動的搜尋
  if (isCitySelected && isActivitySelected) {
    activeClass.value = selectedActive.value;
    data.value = await api.fetchCityClassList(
      mode,
      `${selectedCity.value}`,
      `${selectedActive.value}`
    );
  } else if (isCitySelected) {
    // 如果只選了縣市，則進行縣市搜尋
    data.value = await api.fetchCityList(mode, `${selectedCity.value}`, '');
  } else if (isActivitySelected) {
    activeClass.value = selectedActive.value;
    // 如果只選了活動，則進行活動搜尋
    data.value = await api.fetchCityClassList(mode, '', `${selectedActive.value}`);
  }
  if (data.length >= 0) {
    search.value = true;
  }

  allData.value = data;
  citiesList.value = data.value.filter((data) => data.StartTime >= today);
  citiesCount.value = citiesList.value.length;

  const matchedCity = cities.find((city) => city.value === selectedCity.value);
  chineseCityName.value = matchedCity ? matchedCity.name : '';
  routeParams.city = selectedCity.value;
  routeParams.class = selectedActive.value;
  router.replace({ name: 'ActiveIndex', params: routeParams });
};

const reloadData = () => {
  selectedCity.value = '';
  selectedActive.value = '';
  search.value = false;
  showAllData.value = false;
  routeParams.city = '';
  routeParams.class = '';
  router.replace({ name: 'ActiveIndex', params: routeParams });
};

// 取得點選的縣市ID
const goActive = (ActivityID) => {
  selectedId.value = ActivityID;
  const url = `/activeDetail/${selectedId.value}`;
  // 跳轉至對應 id 頁面
  router.push({ path: url });
};

const goActiveClass = async (ClassName) => {
  data = await api.fetchCityClassList(mode, '', `${ClassName}`);
  search.value = true;
  activeClass.value = ClassName;
  allData.value = data;
  citiesList.value = data.filter((data) => data.StartTime >= today);
  citiesCount.value = citiesList.value.length;
  routeParams.city = '';
  routeParams.class = ClassName;
  router.replace({ name: 'ActiveIndex', params: routeParams });
};
const clear = () => {
  selectedCity.value = '';
  selectedActive.value = '';
};
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
          <a @click="reloadData" class="text-decoration-none">精選活動 </a>
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
            v-for="activeClass in activesClass"
            :value="activeClass.name"
            :key="activeClass.name"
          >
            {{ activeClass.name }}
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
          v-for="activeClass in activesClass"
          :key="activeClass.name"
        >
          <div class="card-img" @click="goActiveClass(activeClass.name)">
            <img :src="activeClass.imgUrl" :alt="activeClass.name" />
          </div>
          <span class="active-title">{{ activeClass.name }}</span>
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
      <div class="all-data d-flex mt-2 w-100">
        <input type="checkbox" v-model="showAllData" @click="test" />
        <label>顯示已過期活動</label>
      </div>
      <!-- 查無資料 -->
      <div class="row" v-if="citiesCount == 0">
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
          @click="goActive(active.ActivityID)"
        >
          <div class="overflow-hidden places-card shadow">
            <div class="card-img search-card-img">
              <img
                :src="
                  active.Picture.PictureUrl1
                    ? active.Picture.PictureUrl1
                    : 'src/assets/img/nullPicture.png'
                "
                :alt="active.ActivityName"
              />
            </div>
          </div>
          <div class="card-body">
            <div class="card-date">
              {{ formatDate(active.StartTime) }} -
              {{ formatDate(active.EndTime) }}
            </div>
            <div class="card-title">{{ active.ActivityName }}</div>
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
              <span class="active-class" v-if="active.Class1">
                # {{ active.Class1 }}</span
              >
              <span class="active-class" v-if="active.Class2">
                # {{ active.Class2 }}</span
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
