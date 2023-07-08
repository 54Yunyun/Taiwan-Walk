<script setup>
import { ref,onBeforeMount } from 'vue';
import dayjs from 'dayjs';
import { api } from '../axios/api.js'
import { useRouter } from 'vue-router';
import { cities } from '../assets/js/cities.js';
import {useLoading} from 'vue-loading-overlay'

const activityDataList = ref([]);
const placeDataList = ref([]);
const foodDataList = ref([]);
const imgData = ref([]);
const selectedActive = ref("");
const selectedCity = ref("");
const router = useRouter();
// api url
const activityUrl = 'v2/Tourism/Activity?%24top=30&%24format=JSON'
const placeUrl = 'v2/Tourism/ScenicSpot?%24o&%24top=30&%24format=JSON'
const foodUrl = 'v2/Tourism/Restaurant?%24&%24top=30&%24skip=13&%24format=JSON'

// 格式化日期
const today = new Date();
const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');

// 取得活動資料
const fetchActivityList = async () => {
  const res = await api.fetchList(activityUrl);
  const {data,status} = res;
  if(status == 200) {
    // 取最近日期的前四筆活動
    const sortedData = data.filter(item => new Date(item.StartTime) >= today)
    .sort((a, b) => new Date(a.StartTime) - new Date(b.StartTime));
    activityDataList.value=sortedData.slice(0, 4);
  }
}
// 取得景點資料
const fetchScenicSpotList = async () => {
  const res = await api.fetchList(placeUrl);
  const {data,status} = res;
  if(status == 200) {
   console.log('data',data);
    placeDataList.value=data.slice(0, 4);
    if (data[0].Picture != null) {
      imgData.value = [
        {
          url: data[0].Picture.PictureUrl1
            ? data[0].Picture.PictureUrl1
            : 'src/assets/img/nullPicture.png',
          description: data[0].ScenicSpotName
            ? data[0].ScenicSpotName
            : '',
        },
        {
          url: data[1].Picture.PictureUrl1
            ? data[1].Picture.PictureUrl1
            : 'src/assets/img/nullPicture.png',
          description: data[1].ScenicSpotName
            ? data[1].ScenicSpotName
            : '',
        },
        {
          url: data[2].Picture.PictureUrl1
            ? data[2].Picture.PictureUrl1
            : 'src/assets/img/nullPicture.png',
          description: data[2].ScenicSpotName
            ? data[2].ScenicSpotName
            : '',
        },
        {
          url: data[3].Picture.PictureUrl1
            ? data[3].Picture.PictureUrl1
            : 'src/assets/img/nullPicture.png',
          description: data[3].ScenicSpotName
            ? data[3].ScenicSpotName
            : '',
        },
      ];
    }
  }
  console.log('placeUrl',placeUrl);
}

// 取得美食資料
const fetchRestaurantList = async () => {
  const res = await api.fetchList(foodUrl);
  const {data,status} = res;
  if(status == 200) {
    foodDataList.value=data.slice(0, 4);
  }
  console.log('foodUrl',foodUrl);
}

// go to activity detail page
const goActivity = (data) => {
    const activityID = data.ActivityID; 
    const url = `/activeDetail/${activityID}`;
    router.push({ path: url });
}
// go to place detail page
const goPlace = (data) => {
  const placeID = data.ScenicSpotID; 
  const url = `/placeDetail/${placeID}`;
  router.push({ path: url });
}
// 搜尋 探索景點、節慶活動、品嚐美食
const search = () => {
  if (selectedActive.value === 'PlacesIndex') {
    router.push('/placesIndex');
  } else if (selectedActive.value === 'ActiveIndex') {
    router.push('/activeIndex');
  } else if (selectedActive.value === 'FoodIndex') {
    router.push('/foodIndex');
  }
};

onBeforeMount(() => {
  fetchActivityList();
  fetchScenicSpotList();
  fetchRestaurantList();
});
</script>
<template>
  <!-- 搜尋景點 -->
  <div class="container">
    <div class="search-wrap row">
      <div class="search-title col-lg">
        探索<span class="title-underline">台灣之美</span>
        <br />
        讓我們更親近這片土地
        <div class="title-info">
          <img src="../assets/icon/Vector.png" alt="" />
          台灣旅遊景點導覽 Taiwan Travel Guide
        </div>
      </div>
      <div class="search-select col-lg">
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
        <select class="form-select" aria-label="Default select example" v-model="selectedActive">
          <option value="" selected disabled hidden>請選擇活動</option>
          <option value="PlacesIndex">精選活動</option>
          <option value="ActiveIndex">探索景點</option>
          <option value="FoodIndex">品嚐美食</option>
        </select>
       
        <div class="form-btn">
          <button class="search-btn" @click="search">
            <span class="search-img">
              <img src="../assets/icon/Union.png" alt="" />
            </span>
            搜尋
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
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
        <div class="carousel-inner carousel-fade align-items-center">
          <div
            v-for="(item, index) in imgData"
            :key="index"
            :class="{ 'carousel-item': true, active: index === 0 }"
          >
            <img
              :src="item.url"
              class="d-block w-100"
              :alt="`Slide ${index + 1}`"
            />
            <div class="carousel-description d-none d-md-block position-absolute">
            <p>{{ item.description }}</p>
          </div>
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

  <!-- 近期活動 -->

    <div class="active-wrap row">
      <div class="active-title-wrap d-flex">
        <div class="active-title title-underline">近期活動</div>
        <div class="active-more">
          <router-link :to="{ name: 'ActiveIndex' }">
            查看更多活動<img src="../assets/icon/arrow-right16_R.png" class="arrow" alt="" /> 
          </router-link>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 gy-3">
      <div class="col-12 col-lg-6 mb-3 pointer" v-for="data in activityDataList" :key="data" @click="goActivity(data)">
        <div class="active-card card shadow">
          <div class="row g-0">
            <div class="overflow-hidden col-4">
              <div class="card-img active-img"
              :style="{ 'background-image': 'url(' + (data.Picture.PictureUrl1 ? data.Picture.PictureUrl1 : 'src/assets/img/nullPicture.png') + ')' }">
              </div>
            </div>
            <div class="col-8">
              <div class="card-body">
                <p class="card-date fz-18">{{ formatDate(data.StartTime) }} - {{ formatDate(data.EndTime) }}</p>
                <div class="card-title">{{ data.ActivityName }}</div>
                <p class="card-text">
                  <div class="place">
                    <div class="text-muted">
                      <i class="bi bi-geo-alt"></i><span class="city">{{ data.Address ? data.Address : '詳見官網'  }}</span> 
                    </div>
                    <div class="info pointer">
                      詳細介紹<img src="../assets/icon/arrow-right16_G.png" class="arrow" alt="詳細介紹">
                    </div>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 熱門打卡景點 -->
  <div class="container">
    <div class="active-wrap row">
      <div class="active-title-wrap d-flex">
        <div class="active-title title-underline">熱門打卡景點</div>
        <div class="active-more pointer">
          <router-link :to="{ name: 'PlacesIndex' }">
            查看更多景點<img src="../assets/icon/arrow-right16_R.png" class="arrow" alt="" />
          </router-link>       
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card col-lg-3 col-md-6" v-for="data in placeDataList" :key="data" @click="goPlace(data)">
        <div class="overflow-hidden places-card shadow">
          <div class="card-img"
              :style="{ 'background-image': 'url(' + (data.Picture.PictureUrl1 ? data.Picture.PictureUrl1 : 'src/assets/img/nullPicture.png') + ')' }">
          </div>
        </div>
        <div class="card-body">
          <div class="card-title">{{ data.ScenicSpotName }}</div>
          <div class="text-muted"><i class="bi bi-geo-alt"></i><span class="city">{{ data.Address }}</span> </div>
        </div>
      </div> 
    </div>
  </div>

  <!-- 一再回訪美食 -->
  <div class="container">
    <div class="active-wrap row">
      <div class="active-title-wrap d-flex">
        <div class="active-title title-underline">一再回訪美食</div>
        <div class="active-more">
          <router-link :to="{ name: 'FoodIndex' }">
            查看更多美食<img src="../assets/icon/arrow-right16_R.png" class="arrow" alt="" />
          </router-link>        
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card col-lg-3 col-md-6" v-for="data in foodDataList" :key="data">
        <div class="overflow-hidden places-card shadow ">
          <div class="card-img"
              :style="{ 'background-image': 'url(' + (data.Picture.PictureUrl1 ? data.Picture.PictureUrl1 : 'src/assets/img/nullPicture.png') + ')' }">
          </div>
        </div>
        <div class="card-body">
          <div class="card-title">{{ data.RestaurantName }}</div>
          <div class="text-muted"><i class="bi bi-geo-alt"></i><span class="city">{{ data.Address }}</span> </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-description{
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
}
.card{
  border: 0;
}

.card-img{
  transform:scale(1,1);transition: all 1s ease-out;
}
.card-img:hover{
  transform:scale(1.2,1.2);
}
.search-wrap {
  margin-top: 10%;
}
.search-title {
  font-size: 40px;
  margin-bottom: 5%;
}

.title-info {
  padding-top: 10px;
  font-size: 16px;
  line-height: 2;
}
.form-select {
  margin-bottom: 10px;
  padding: 13px;
}
.search-btn{
  padding: 13px;
  margin-top: 10px;
}

.search-select {
  width: 100%;
  margin-bottom: 5%;
}




.keyword {
  font-size: 14px;
  padding: 13px;
  border: 1px solid #bcbcbc;
  border-radius: 4px;
  background-color: #f9f9f9;
}
.search-btn {
  font-size: 16px;
  margin-top: 10px;
  padding: 13px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #bcbcbc;
  background-color: #7f977b;
  color: #fff;
}
.form-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.arrow-right {
  position: absolute;
}
.active-wrap {
  padding-top: 5%;
  display: flex;
  justify-content: space-around;
}
.active-title-wrap {
  justify-content: space-between;
  align-items: center;
  padding-bottom: 3%;
}


.active-card {
  height: 160px;
  border-radius: 12px;
}
.card-date {
  font-size: 15px;
}
.card-title {
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-body{
  height: 160px;
 padding: 15px 10px 0 10px;
}
.place{
  height: 45%;
  margin-top: 5%;
  display: flex;
  font-size: 15px;
  /* align-items: end; */
  justify-content: space-between;
}
.city{
  padding: 0 3px 0 3px;
  font-size: 15px;
}
.info{
  font-size: 15px;
  display: flex;
  align-items: center;
  color: #7F977B;
}
.text-muted{
  display: flex;
  align-items: center;
}
.active-img{
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}

.card-group .card{
  margin: 10px;
}
.places-card{
  /* width: 250px; */
  height: 180px;
}

@media (max-width:768px) {
  .search-title{
    text-align: center;

  }
}
</style>
