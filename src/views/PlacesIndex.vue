<script setup>
import { ref, watch } from 'vue';
import { cities } from '../assets/js/cities.js';
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
        <li class="breadcrumb-item">探索景點</li>
      </ol>
    </nav>
    <!-- 搜尋 -->
    <div class="row py-4 d-flex justify-content-center">
      <div class="col-lg-3 mb-3">
        <select class="form-select">
          <option value="all" selected>全部縣市</option>
          <option
            v-for="option in cities"
            :value="option.value"
            :key="option.value"
          >
            {{ option.name }}
          </option>
        </select>
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
          placeholder="你想去哪裡？請輸入關鍵字"
        />
      </div>
      <div class="form-btn col-lg-2 mb-3">
        <button class="search-btn">
          <span class="search-img">
            <img src="../assets/icon/Union.png" alt="" />
          </span>
          搜尋
        </button>
      </div>
    </div>
    <!-- 預設內容 -->
    <div class="index-title">熱門主題</div>
    <div class="card-wrap row">
      <div
        class="card g-3 col-lg-3 col-md-6"
        v-for="place in places"
        :key="place.name"
      >
        <div class="card-img">
          <img :src="place.imgUrl" :alt="place.name" />
        </div>
        <span class="active-title">{{ place.name }}</span>
      </div>
    </div>
  </div>
</template>
