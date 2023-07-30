<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../../api/api.js';
import { useRouter } from 'vue-router';
import { cities } from '../../constants/cities.js';
import dayjs from 'dayjs';
const router = useRouter();
const mode = 'ScenicSpot';
// 取得點選的縣市ID
const id = router.currentRoute.value.params.Id;
// 格式化日期
const today = new Date();
const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');
// 裝 API 回傳的資料
const imgData = ref([]);
const scenicSpotData = ref([]);
const mapSrc = ref('');
const nearbyActivity = ref([]);
const nearbyScenicSpot = ref([]);
const nearbyRestaurant = ref([]);
const goBackCity = ref();
let breadcrumbCity = ref();
let positionLat = ref('');
let positionLon = ref('');
// 取得相關縣市資料
const fetchOne = async () => {
  const data = await api.fetchOne(mode, id);
  scenicSpotData.value = data;
  const matchedCity = cities.find((city) => city.name === data[0].Address.substring(0, 3));
  breadcrumbCity.value = matchedCity ? matchedCity.name : '';
  goBackCity.value = matchedCity ? matchedCity.value : '';
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

// 取得附近景點
const fetchNearbyActive = async () => {
  const data = await api.fetchNearbyList(
    mode,
    positionLat.value,
    positionLon.value
  );
  nearbyScenicSpot.value = data;
};

// 取得附近活動
const fetchNearbyScenicSpot = async () => {
  const data = await api.fetchNearbyList(
    'Activity',
    positionLat.value,
    positionLon.value
  );
  nearbyActivity.value = data;
};

// 取得附近美食
const fetchNearbyRestaurant = async () => {
  const data = await api.fetchNearbyList(
    'Restaurant',
    positionLat.value,
    positionLon.value
  );
  nearbyRestaurant.value = data;
};

const goModeDetail =  (mode, id) => {
  const url = `/${mode}Detail/${id}`;
  router.push(url);
};

onMounted(async () => {
  await fetchOne();
  await fetchNearbyActive();
  await fetchNearbyScenicSpot();
  await fetchNearbyRestaurant();
});
</script>
<template>
  <div
    class="detail container p-5"
    v-for="scenicSpot in scenicSpotData"
    :key="scenicSpot"
  >
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
            :to="{ name: 'ScenicSpotIndex' }"
            class="text-decoration-none"
            >探索景點</router-Link
          >
        </li>
        <li class="breadcrumb-item">
          <router-Link
            :to="{ name: 'ScenicSpotIndex', params: { city: goBackCity } }"
            class="text-decoration-none"
          >
            {{ breadcrumbCity }}</router-Link
          >
        </li>
        <li class="breadcrumb-item">
          <router-Link
            :to="{
              name: 'ScenicSpotIndex',
              params: {
                city: goBackCity,
                class: scenicSpot.Class1 || scenicSpot.Class2 || '',
              },
            }"
            class="text-decoration-none"
          >
            {{
              scenicSpot.Class1
                ? scenicSpot.Class1
                : scenicSpot.Class2
                ? scenicSpot.Class2
                : ''
            }}</router-Link
          >
        </li>
        <li class="breadcrumb-item">{{ scenicSpot.ScenicSpotName }}</li>
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
        {{ scenicSpot.ScenicSpotName }}
      </div>
      <div
        class="active-class-wrap"
        v-if="scenicSpot.Class1 || scenicSpot.Class2"
      >
        <span class="active-class" v-if="scenicSpot.Class1">
          # {{ scenicSpot.Class1 }}</span
        >
        <span class="active-class" v-if="scenicSpot.Class2">
          # {{ scenicSpot.Class2 }}</span
        >
      </div>
      <div class="active-description-wrap mt-4">
        <div class="active-description-title">景點介紹：</div>
        <span class="active-description-content">
          {{
            scenicSpot.DescriptionDetail ? scenicSpot.DescriptionDetail : '無'
          }}
        </span>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6">
          <div class="bg-light border-radius p-4 mb-5">
            <div class="active-description-title">
              開放時間：<span>{{ scenicSpot.OpenTime }}</span>
            </div>
            <div class="active-description-title">
              服務電話：<span>{{
                scenicSpot.Phone ? scenicSpot.Phone : '無'
              }}</span>
            </div>
            <div class="active-description-title">
              景點地址：<span>{{
                scenicSpot.Address ? scenicSpot.Address : '無'
              }}</span>
            </div>
            <div class="active-description-title">
              官方網站：<a :href="scenicSpot.WebsiteUrl">
                <span>{{
                  scenicSpot.WebsiteUrl ? scenicSpot.WebsiteUrl : '無'
                }}</span></a
              >
            </div>
            <div class="active-description-title">
              票價資訊：<span>{{
                scenicSpot.TicketInfo ? scenicSpot.TicketInfo : '無'
              }}</span>
            </div>
            <div class="active-description-title">
              注意事項：<span>{{
                scenicSpot.Remarks ? scenicSpot.Remarks : '無'
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
          @click="goModeDetail('scenicSpot', data.ScenicSpotID)"
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
          @click="goModeDetail('active', data.ActivityID)"
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
        <!-- 鄰近的美食 -->
        <div class="active-wrap">
          <div
            class="active-title-wrap d-flex justify-content-between align-items-center mb-4"
          >
            <div class="active-title title-underline">鄰近的美食</div>
            <div class="active-more pointer">
              <router-link :to="{ name: 'RestaurantIndex' }">
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
          @click="goModeDetail('restaurant', data.RestaurantID)"
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
.card-img {
  height: 180px;
  transform: scale(1, 1);
  transition: all 1s ease-out;
}

.card-img:hover {
  transform: scale(1.2, 1.2);
}
</style>
