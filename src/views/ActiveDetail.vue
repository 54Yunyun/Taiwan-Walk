<script setup>
import { ref, onBeforeMount } from 'vue';
import { api } from '../axios/api.js';
import { useRouter } from 'vue-router';
import { cities } from '../assets/js/cities.js';
import dayjs from 'dayjs';
const router = useRouter();
// 取得點選的縣市ID
let id = router.currentRoute.value.params.Id;
// 格式化日期
const today = new Date();
const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');

// 裝 API 回傳的資料
const imgData = ref([]);
const activeData = ref([]);
const mapSrc = ref('');
let positionLat = ref('');
let positionLon = ref('');
const activeDataList = ref([]);
const placeDataList = ref([]);
const goBackCity = ref();

// 取得相關縣市資料
const searchActive = async () => {
  const cityUrl = `v2/Tourism/Activity?$filter=ActivityID%20eq%20'${id}'&$top=1&$format=JSON`;
  const res = await api.fetchOne(cityUrl);
  const { data, status } = res;
  if (status == 200) {
    activeData.value = data;
    const matchedCity = cities.find(
        (city) => city.name === data[0].City
      );
    goBackCity.value = matchedCity ? matchedCity.value : '';
    positionLat.value = data[0].Position.PositionLat;
    positionLon.value = data[0].Position.PositionLon;
 
    if (data[0].Picture != null) {
      imgData.value = [
        {
          url: data[0].Picture.PictureUrl1
            ? data[0].Picture.PictureUrl1
            : '/src/assets/img/nullPicture.png',
          description: data[0].Picture.PictureDescription1
            ? data[0].Picture.PictureDescription1
            : '',
        },
        {
          url: data[0].Picture.PictureUrl2
            ? data[0].Picture.PictureUrl2
            : '/src/assets/img/nullPicture.png',
          description: data[0].Picture.PictureDescription2
            ? data[0].Picture.PictureDescription2
            : '',
        },
        {
          url: data[0].Picture.PictureUrl3
            ? data[0].Picture.PictureUrl3
            : '/src/assets/img/nullPicture.png',
          description: data[0].Picture.PictureDescription3
            ? data[0].Picture.PictureDescription3
            : '',
        },
      ];
    }
    if (data[0].Position != null) {
      mapSrc.value = `https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${positionLat.value},${positionLon.value}&z=16&output=embed&t=`;
    }
  }
};

// 取得附近活動
const fetchNearbyActive = async () => {
  const placeUrl = `v2/Tourism/Activity?$spatialFilter=nearby(Position, ${positionLat.value}, ${positionLon.value}, 2000)`;
  const res = await api.fetchList(placeUrl);
  const { data, status } = res;
  if (status == 200) {
    activeDataList.value = data.slice(0, 4);
  }
};

// 取得附近景點
const fetchNearbyPlace = async () => {
  const placeUrl = `v2/Tourism/ScenicSpot?$spatialFilter=nearby(Position, ${positionLat.value}, ${positionLon.value}, 2000)`;
  const res = await api.fetchList(placeUrl);
  const { data, status } = res;
  if (status == 200) {
    placeDataList.value = data.slice(0, 4);
  }
};

// 取得點選的縣市ID
const goActive = async (ActivityID) => {
  id = ActivityID;
  const url = `/activeDetail/${ActivityID}`;
  // 跳轉至對應 id 頁面
  router.push(url);
  await searchActive();
};

onBeforeMount(async () => {
  await searchActive();
  fetchNearbyActive();
  fetchNearbyPlace();
});
</script>
<template>
  <div class="detail container p-5" v-for="active in activeData" :key="active">
    <!-- 麵包屑 -->
    <nav aria-label="breadcrumb" class="py-2 mt-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-Link :to="{ name: 'Index' }" class="text-decoration-none"
            >首頁</router-Link
          >
        </li>
        <li class="breadcrumb-item">
          <router-Link
            :to="{ name: 'ActiveIndex' }"
            class="text-decoration-none"
            >精選活動</router-Link
          >
        </li>
        <li class="breadcrumb-item">
          <router-Link
            :to="{ name: 'ActiveIndex',  params: { city: goBackCity}}"
            class="text-decoration-none"
            > {{ active.City }}</router-Link
          >
        </li>
        <li class="breadcrumb-item">
          <router-Link
            :to="{ name: 'ActiveIndex', params: { city: goBackCity, active: active.Class1 || active.Class2 || '' }}"
            class="text-decoration-none"
            > {{ active.Class1 ? active.Class1 : active.Class2 ? active.Class2 : "" }}</router-Link
          >
        </li>
        <li class="breadcrumb-item">{{ active.ActivityName }}</li>
      </ol>
    </nav>
    <!-- 輪播區 -->
    <div class="carousel">
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            v-for="(item, index) in imgData"
            :key="index"
            type="button"
            :data-bs-target="'#carouselExampleCaptions'"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            :aria-current="index === 0 ? 'true' : 'false'"
            :aria-label="`Slide ${index + 1}`"
          ></button>
        </div>
        <div class="carousel-inner carousel-fade">
          <div
            v-for="(item, index) in imgData"
            :key="index"
            :class="{ 'carousel-item': true, active: index === 0 }"
          >
            <img
              :src="item.url"
              class="d-block w-100"
              :alt="item.ActivityName"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <!-- 活動資訊 -->
    <div class="active-wrap">
      <div class="active-name">
        {{ active.ActivityName }}
      </div>
      <div class="active-class-wrap" v-if="active.Class1 || active.Class2">
        <span class="active-class" v-if="active.Class1">
          # {{ active.Class1 }}</span
        >
        <span class="active-class" v-if="active.Class2">
          # {{ active.Class2 }}</span
        >
      </div>
      <div class="active-description-wrap mt-4">
        <div class="active-description-title">活動介紹：</div>
        <span class="active-description-content">
          {{ active.Description ? active.Description : '無' }}
        </span>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6">
          <div class="bg-light border-radius p-4 mb-5">
            <div class="active-description-title">
              活動時間：<span
                >{{ formatDate(active.StartTime) }} -
                {{ formatDate(active.EndTime) }}</span
              >
            </div>
            <div class="active-description-title">
              聯絡電話：<span>{{ active.Phone ? active.Phone : '無' }}</span>
            </div>
            <div class="active-description-title">
              主辦單位：<span>{{
                active.Organizer ? active.Organizer : '無'
              }}</span>
            </div>
            <div class="active-description-title">
              活動地點：<span>{{
                active.Address
                  ? active.Address
                  : active.Location
                  ? active.Location
                  : '無'
              }}</span>
            </div>
            <div class="active-description-title">
              官方網站：<a :href="active.WebsiteUrl">
                <span>{{
                  active.WebsiteUrl ? active.WebsiteUrl : '無'
                }}</span></a
              >
            </div>
            <div class="active-description-title">
              活動費用：<span>{{ active.Charge ? active.Charge : '無' }}</span>
            </div>
            <div class="active-description-title">
              注意事項：<span>{{
                active.Remarks ? active.Remarks : '無'
              }}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mb-5">
          <iframe class="map border-radius" :src="mapSrc"> </iframe>
        </div>
        <!-- 鄰近的活動 -->
        <div class="active-wrap">
          <div
            class="active-title-wrap d-flex justify-content-between align-items-center mb-4"
          >
            <div class="active-title title-underline">鄰近的活動</div>
            <div class="active-more pointer">
              <router-link :to="{ name: 'ActiveIndex' }">
                查看更多活動<img
                  src="../assets/icon/arrow-right16_R.png"
                  class="arrow"
                  alt=""
                />
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="card col-lg-3 col-md-6"
          v-for="data in activeDataList"
          :key="data"
          @click="goActive(data.ActivityID)"
        >
          <div class="overflow-hidden places-card shadow">
            <div
              class="card-img"
              :style="{
                'background-image':
                  'url(' +
                  (data.Picture.PictureUrl1
                    ? data.Picture.PictureUrl1
                    : '/src/assets/img/nullPicture.png') +
                  ')',
              }"
            ></div>
          </div>
          <div class="card-body">
            <div class="card-title">{{ data.ActivityName }}</div>
            <div class="text-muted">
              <i class="bi bi-geo-alt"></i
              ><span class="city">{{ data.Address }}</span>
            </div>
          </div>
        </div>
        <!-- 鄰近的景點 -->
        <div class="active-wrap">
          <div
            class="active-title-wrap d-flex justify-content-between align-items-center mb-4"
          >
            <div class="active-title title-underline">鄰近的景點</div>
            <div class="active-more pointer">
              <router-link :to="{ name: 'PlacesIndex' }">
                查看更多景點<img
                  src="../assets/icon/arrow-right16_R.png"
                  class="arrow"
                  alt=""
                />
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="card col-lg-3 col-md-6"
          v-for="data in placeDataList"
          :key="data"
          @click="goActive(data.ScenicSpotID)"
        >
          <div class="overflow-hidden places-card shadow">
            <div
              class="card-img"
              :style="{
                'background-image':
                  'url(' +
                  (data.Picture.PictureUrl1
                    ? data.Picture.PictureUrl1
                    : '/src/assets/img/nullPicture.png') +
                  ')',
              }"
            ></div>
          </div>
          <div class="card-body">
            <div class="card-title">{{ data.ScenicSpotName }}</div>
            <div class="text-muted">
              <i class="bi bi-geo-alt"></i
              ><span class="city">{{ data.City }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.places-card {
  /* width: 250px; */
  height: 180px;
}
</style>
