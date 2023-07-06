<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const currentPage = ref('');
const route = useRoute();
watchEffect(() => {
  currentPage.value = route.name;
});
</script>
<template>
  <div class="header-wrap shadow">
    <!-- logo -->
    <div class="header-title">
      <router-link :to="{ name: 'Index' }">
        <img src="../assets/icon/Group-27.png" alt="logo" class="logo" />
        台灣走走 <span class="mobile-none">．Tai Walk</span>
      </router-link>
    </div>
    <!-- 漢堡選單 -->
    <div class="main-nav">
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">          
            <router-link :to="{ name: 'ActiveIndex' }"
              ><li :class="{ current: currentPage === 'ActiveIndex' || currentPage === 'ActiveDetail'}">
                精選活動
              </li></router-link
            >
            <router-link :to="{ name: 'PlacesIndex' }"
              ><li :class="{ current: currentPage === 'PlacesIndex' || currentPage === 'PlaceDetail'}">
                探索景點
              </li></router-link
            >
            <router-link :to="{ name: 'FoodIndex' }"
              ><li :class="{ current: currentPage === 'FoodIndex' }">
                品嚐美食
              </li></router-link
            >
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
<style scope>
.header-wrap {
  width: 100vw;
  height: 80px;
  display: flex;
}
.header-title {
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 5%;
}
.header-title a {
  color: #6e7d60;
}
.logo {
  vertical-align: top;
}

#menu a {
  margin-right: 20px;
  font-size: 18px;
  color: #646464;
}

#menuToggle input {
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
}
.main-nav {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 5%;
}

nav #menu li.current {
  color: #6e7d60;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  border-bottom: 2px solid #e0da48;
}
@media screen and (min-width: 768px) {
  #menu {
    display: flex;
    margin-top: 20px;
  }
  #menu li {
    border-bottom: 2px solid transparent;
    transition: border-bottom .3s ease-in-out;
  }
  #menu li:hover {
    color: #6e7d60;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
    border-bottom: 2px solid #e0da48;
  }
}
@media screen and (max-width: 767px) {
  @keyframes slideIn {
    0% {
      transform: translate(100%, -100%) scale(0);
    }
    100% {
      transform: translate(100%, -100%) scale(1);
    }
  }
  .main-nav{
    width: 0;
  }
  .header-title {
    width: 100%;
    justify-content: center;
  }
  .mobile-none{
    display: none;
  }

  #menuToggle {
    display: block;
    position: relative;
    right: 90%;
  }

  #menuToggle a {
    text-decoration: none;
    color: #232323;
    transition: color .3s ease;
  }

  #menuToggle a:hover {
    color: #6e7d60;
  }

  #menuToggle span {
    display: block;
    width: 30px;
    height: 3px;
    position: relative;
    margin-bottom: 5px;
    background: #a8b8a5;
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform .5s cubic-bezier(0.77, 0.2, 0.05, 1);
  }

  #menuToggle span:first-child {
    transform-origin: 0% 0%;
  }

  #menuToggle span:nth-last-child(2) {
    transform-origin: 0% 100%;
  }

  #menuToggle input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #a8b8a5;
  }

  #menuToggle input:checked ~ span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  #menuToggle input:checked ~ span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
  }

  #menu {
    position: absolute;
    text-align: center;
    width: 300px;
    margin: -100px 0 0 -150px;
    padding: 50px;
    padding-top: 125px;
    background: #ccc;
    list-style-type: none;
    border-radius: 0 10% 0;
    transform-origin: top right;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    transform: translate(100%, 0%);
    transition: transform .5s cubic-bezier(0.77, 0.2, 0.05, 1);
  }

  #menu li {
    padding: 10px 0;
    font-size: 22px;
  }

  #menuToggle input:checked ~ ul {
    transform: none;
  }
}
</style>
