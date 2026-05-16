import {createRouter, createWebHistory} from "vue-router";

const router=createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "主页",
      path: "/home",
      component: ()=>import("../pages/Home.vue")
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router;