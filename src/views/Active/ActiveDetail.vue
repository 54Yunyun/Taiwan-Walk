<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../api/api.js';
import { useRouter } from 'vue-router';
import { cities } from '../../constants/cities.js';
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
const nearbyActivity = ref([]);
const nearbyScenicSpot = ref([]);
const nearbyRestaurant = ref([]);
const goBackCity = ref();
const mode = 'Activity';

// 取得相關縣市資料
const fetchOne = async () => {
  const data = await api.fetchOne(mode, id);
  activeData.value = data;
  const matchedCity = cities.find((city) => city.name === data[0].City);
  goBackCity.value = matchedCity ? matchedCity.value : '';
  console.log(goBackCity);
  positionLat.value = data[0].Position.PositionLat;
  positionLon.value = data[0].Position.PositionLon;
  mapSrc.value = `https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${positionLat.value},${positionLon.value}&z=16&output=embed&t=`;
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
};

// 取得附近活動
const fetchNearbyActive = async () => {
  const data = await api.fetchNearbyList(
    mode,
    positionLat.value,
    positionLon.value
  );
  nearbyActivity.value = data;
};

// 取得附近景點
const fetchNearbyScenicSpot = async () => {
  const data = await api.fetchNearbyList(
    'ScenicSpot',
    positionLat.value,
    positionLon.value
  );
  console.log('fetchNearbyScenicSpot',data);
  nearbyScenicSpot.value = data;
};

// 取得附近美食
const fetchNearbyRestaurant= async () => {
  const data = await api.fetchNearbyList(
    'Restaurant',
    positionLat.value,
    positionLon.value
  );
  nearbyRestaurant.value = data;
};

// 取得點選的縣市ID
const goActive = async (ActivityID) => {
  id = ActivityID;
  const url = `/activeDetail/${ActivityID}`;
  // 跳轉至對應 id 頁面
  router.push(url);
  await searchActive();
};
const goPlace = async (ScenicSpotID) => {
  id = ScenicSpotID;
  const url = `/scenicSpotDetail/${ScenicSpotID}`;
  // 跳轉至對應 id 頁面
  router.push(url);
  await fetchNearbyPlace();
};
onMounted(async () => {
  await fetchOne();
  // await fetchNearbyActive();
  // await fetchNearbyScenicSpot();
  // await fetchNearbyRestaurant();
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
            :to="{ name: 'ActiveIndex', params: { city: goBackCity } }"
            class="text-decoration-none"
          >
            {{ active.City }}</router-Link
          >
        </li>
        <li class="breadcrumb-item">
          <router-Link
            :to="{
              name: 'ActiveIndex',
              params: {
                city: goBackCity,
                class: active.Class1 || active.Class2 || '',
              },
            }"
            class="text-decoration-none"
          >
            {{
              active.Class1 ? active.Class1 : active.Class2 ? active.Class2 : ''
            }}</router-Link
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
                  src="../../assets/icon/arrow-right16_R.png"
                  class="arrow"
                  alt=""
                />
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="card col-lg-3 col-md-6"
          v-for="data in nearbyActivity"
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
              <router-link :to="{ name: 'ScenicSpotIndex' }">
                查看更多景點<img
                  src="../../assets/icon/arrow-right16_R.png"
                  class="arrow"
                  alt=""
                />
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="card col-lg-3 col-md-6"
          v-for="data in nearbyScenicSpot"
          :key="data"
          @click="goPlace(data.ScenicSpotID)"
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
              ><span class="city">{{ data.Address }}</span>
            </div>
          </div>
        </div>
        <!-- 鄰近的美食 -->
        <div class="active-wrap">
          <div
            class="active-title-wrap d-flex justify-content-between align-items-center mb-4"
          >
            <div class="active-title title-underline">鄰近的美食</div>
            <div class="active-more pointer">
              <router-link :to="{ name: 'ScenicSpotIndex' }">
                查看更多美食<img
                  src="../../assets/icon/arrow-right16_R.png"
                  class="arrow"
                  alt=""
                />
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="card col-lg-3 col-md-6"
          v-for="data in nearbyRestaurant"
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
            <div class="card-title">{{ data.RestaurantName }}</div>
            <div class="text-muted">
              <i class="bi bi-geo-alt"></i
              ><span class="city">{{ data.Address }}</span>
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
.card-img {
  height: 180px;
  transform: scale(1, 1);
  transition: all 1s ease-out;
}

.card-img:hover {
  transform: scale(1.2, 1.2);
}
</style>
