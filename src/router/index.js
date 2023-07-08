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
          path: '/placesIndex/:city?/:class?',
          name: 'PlacesIndex',
          component: () => import('../views/PlacesIndex.vue'),
        },
        {
          path: '/activeIndex/:city?/:class?',
          name: 'ActiveIndex',
          component: () => import('../views/ActiveIndex.vue'),
        },
        {
          path: '/foodIndex',
          name: 'FoodIndex',
          component: () => import('../views/FoodIndex.vue'),
        },
        {       
          path: '/activeDetail/:Id',
          name: 'ActiveDetail',
          component: () => import('../views/ActiveDetail.vue')
        },
        {       
          path: '/placeDetail/:Id',
          name: 'PlaceDetail',
          component: () => import('../views/PlaceDetail.vue')
        },
      ],
    },
  ],
});
export default router;
