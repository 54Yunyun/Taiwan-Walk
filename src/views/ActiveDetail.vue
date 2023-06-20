<script setup>
import { ref } from 'vue';
import { api } from '../axios/api.js';
import { useRouter } from 'vue-router';
const router = useRouter();
// 取得點選的縣市ID
const id = router.currentRoute.value.params.Id;
const activeData = ref([]);
// 取得相關縣市資料
const searchActive = async () => {
  const cityUrl = `v2/Tourism/Activity?$filter=ActivityID%20eq%20'${id}'&$top=1&$format=JSON`;
  const res = await api.fetchOne(cityUrl);
  console.log('res', res);
  const { data, status } = res;
  if (status == 200) {
    activeData.value = data;
  }
};
console.log('activeData', activeData);
searchActive();
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
            >節慶活動</router-Link
          >
        </li>
        <li class="breadcrumb-item">{{ active.City }}</li>
        <li class="breadcrumb-item">{{ active.ActivityName }}</li>
      </ol>
    </nav>
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
    <!-- 活動資訊 -->
    <div class="container active-wrap">
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
    </div>
  </div>
</template>
