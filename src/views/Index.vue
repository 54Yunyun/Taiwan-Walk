<script setup>
import dayjs from 'dayjs';
import { api } from '../axios/api.js'
import { ref,onBeforeMount,computed } from 'vue';
const activityDataList = ref([]);
const placeDataList = ref([]);
const foodDataList = ref([]);

// api url
const activityUrl = 'v2/Tourism/Activity?%24top=30&%24format=JSON'
const placeUrl = 'v2/Tourism/ScenicSpot?%24orderby=DescriptionDetail&%24top=30&%24skip=5&%24format=JSON'
const foodUrl = 'v2/Tourism/Restaurant?%24orderby=RestaurantName&%24top=30&%24skip=5&%24format=JSON'

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
  console.log('activityDataList',activityDataList);
}
// 取得景點資料
const fetchScenicSpotList = async () => {
  const res = await api.fetchList(placeUrl);
  const {data,status} = res;
  if(status == 200) {
    placeDataList.value=data.slice(0, 4);
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
        <select class="form-select" aria-label="Default select example">
          <option selected>探索景點</option>
          <option value="1">節慶活動</option>
          <option value="2">品嚐美食</option>
        </select>
        <input
          id="alt"
          class="keyword w-100"
          type="text"
          placeholder="你想去哪裡？請輸入關鍵字"
        />
        <div class="form-btn">
          <button class="search-btn">
            <span class="search-img">
              <img src="../assets/icon/Union.png" alt="" />
            </span>
            搜尋
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 輪播區 -->
  <div class="container">
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner carousel-fade">
        <div class="carousel-item active">
          <img
            src="../assets/img/ScenicSpotPicture.png"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>新北市</h5>
            <p>不厭亭</p>
          </div>
        </div>

        <div class="carousel-item">
          <img
            src="../assets/img/ScenicSpotPicture-2.png"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>宜蘭縣</h5>
            <p>羅東林業文化園區</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="../assets/img/ScenicSpotPicture-3.png"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>苗栗縣</h5>
            <p>2021 苗栗龍系列活動</p>
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
  <div class="container">
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
      <div class="col-12 col-lg-6 mb-3 pointer" v-for="data in activityDataList" :key="data">
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
      <div class="card col-lg-3 col-md-6" v-for="data in placeDataList" :key="data">
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
.title-underline {
  line-height: 1.5;
  border-bottom: 2px #e0da48 solid;
  padding-bottom: 2px;
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
.info:hover .arrow,
.active-more:hover .arrow {
  animation: jump 0.5s infinite;
}
@keyframes jump {
  0% { transform: translateX(0); }
  50% { transform: translateX(3px); }
  100% { transform: translateX(0); }
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
.active-title {
  font-size: 30px;
}
.active-more a {
  color: #ff725e;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
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
