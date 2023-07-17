import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../Layout.vue'),
      children: [
        {
          path: '/',
          name: 'Index',
          component: () => import('../views/Index.vue'),
        },
        {
          path: '/scenicSpotIndex/:city?/:class?',
          name: 'ScenicSpotIndex',
          component: () => import('../views/ScenicSpot/ScenicSpotIndex.vue'),
        },
        {
          path: '/activeIndex/:city?/:class?',
          name: 'ActiveIndex',
          component: () => import('../views/Active/ActiveIndex.vue'),
        },
        {
          path: '/restaurantIndex/:city?/:class?',
          name: 'RestaurantIndex',
          component: () => import('../views/Restaurant/RestaurantIndex.vue'),
        },
        {       
          path: '/activeDetail/:Id',
          name: 'ActiveDetail',
          component: () => import('../views/Active/ActiveDetail.vue')
        },
        {       
          path: '/scenicSpotDetail/:Id',
          name: 'ScenicSpotDetail',
          component: () => import('../views/ScenicSpot/ScenicSpotDetail.vue')
        },
        {       
          path: '/restaurantDetail/:Id',
          name: 'RestaurantDetail',
          component: () => import('../views/Restaurant/RestaurantDetail.vue')
        },
      ],
    },
  ],
});
export default router;
