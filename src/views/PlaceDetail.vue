<script setup>
import { ref,onBeforeMount } from 'vue';
import { api } from '../axios/api.js';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
const router = useRouter();
// 取得點選的縣市ID
const id = router.currentRoute.value.params.Id;
// 格式化日期
const today = new Date();
const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');
// 裝 API 回傳的資料
const imgData = ref([]);
const placeData = ref([]);
const mapSrc = ref('');
let positionLat = ref('');
let positionLon = ref('');
const activeDataList = ref([]);
const placeDataList = ref([]);
const goBackCity = ref();
// 取得相關縣市資料
const searchPlace = async () => {
  const cityUrl = `v2/Tourism/ScenicSpot?$filter=ScenicSpotID%20eq%20'${id}'&$top=1&$format=JSON`;
  const res = await api.fetchOne(cityUrl);
  console.log('res', res);
  const { data, status } = res;
  if (status == 200) {
    placeData.value = data;
    console.log('data[0]', data[0]);
    if (data[0].Picture != null) {
      imgData.value = [
        {
          url: data[0].Picture.PictureUrl1
            ? data[0].Picture.PictureUrl1
            : 'src/assets/img/nullPicture.png',
          description: data[0].Picture.PictureDescription1
            ? data[0].Picture.PictureDescription1
            : '',
        },      
      ];
    }
    if (data[0].Position != null) {
      mapSrc.value = `https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${data[0].Position.PositionLat},${data[0].Position.PositionLon}&z=16&output=embed&t=`;
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
onBeforeMount(async () => {
  await searchPlace();
  fetchNearbyActive();
  fetchNearbyPlace();
});
</script>
<template>
  <div class="detail container p-5" v-for="place in placeData" :key="place">
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
            >探索景點</router-Link
          >
        </li>
        <li class="breadcrumb-item">{{ place.City }}</li>
        <li class="breadcrumb-item">{{ place.ScenicSpotName }}</li>
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
        {{ place.ScenicSpotName }}
      </div>
      <div class="active-class-wrap" v-if="place.Class1 || place.Class2">
        <span class="active-class" v-if="place.Class1">
          # {{ place.Class1 }}</span
        >
        <span class="active-class" v-if="place.Class2">
          # {{ place.Class2 }}</span
        >
      </div>
      <div class="active-description-wrap mt-4">
        <div class="active-description-title">景點介紹：</div>
        <span class="active-description-content">
          {{ place.DescriptionDetail ? place.DescriptionDetail : '無' }}
        </span>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6 ">
          <div class="bg-light border-radius p-4 mb-5">
            <div class="active-description-title">
              開放時間：<span
                >{{ place.OpenTime }}</span
              >
            </div>
            <div class="active-description-title">
              服務電話：<span>{{ place.Phone ? place.Phone : '無' }}</span>
            </div>           
            <div class="active-description-title">
              景點地址：<span>{{
                place.Address
                  ? place.Address
                  : place.Location
                  ? place.Location
                  : '無'
              }}</span>
            </div>
            <div class="active-description-title">
              官方網站：<a :href="place.WebsiteUrl">
                <span>{{
                  place.WebsiteUrl ? place.WebsiteUrl : '無'
                }}</span></a
              >
            </div>
            <div class="active-description-title">
              票價資訊：<span>{{
                place.TicketInfo ? place.TicketInfo : '無'
              }}</span>
            </div>
            <div class="active-description-title">
              注意事項：<span>{{
                place.Remarks ? place.Remarks : '無'
              }}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mb-5">
          <iframe class="map border-radius" :src="mapSrc"> </iframe>
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
