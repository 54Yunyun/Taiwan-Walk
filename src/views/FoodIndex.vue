<script setup>
import { ref, watch } from 'vue';
import { cities } from '../assets/js/cities.js';
// 活動分類
const foods = [
  {
    name: '地方特產',
    imgUrl: 'src/assets/img/food_1.jpeg',
    value: '地方特產',
  },
  {
    name: '中式美食',
    imgUrl: 'src/assets/img/food_2.jpeg',
    value: '中式美食',
  },
  {
    name: '甜點冰品',
    imgUrl: 'src/assets/img/food_3.jpeg',
    value: '甜點冰品',
  },
  {
    name: '異國料理',
    imgUrl: 'src/assets/img/food_4.jpeg',
    value: '異國料理',
  },
  {
    name: '伴手禮',
    imgUrl: 'src/assets/img/food_5.jpeg',
    value: '伴手禮',
  },
  {
    name: '素食',
    imgUrl: 'src/assets/img/food_6.jpeg',
    value: '素食',
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
        <li class="breadcrumb-item">品嚐美食</li>
      </ol>
    </nav>
    <!-- 搜尋 -->
    <div class="row py-4 d-flex justify-content-center">
      <div class="col-lg-3 mb-3">
        <CSelectCities />
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
          placeholder="你想吃什麼？請輸入關鍵字"
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
        v-for="food in foods"
        :key="food.name"
      >
        <div class="card-img">
          <img :src="food.imgUrl" :alt="food.name" />
        </div>
        <span class="active-title">{{ food.name }}</span>
      </div>
    </div>
  </div>
</template>
