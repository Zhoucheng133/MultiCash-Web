import {createRouter, createWebHistory} from "vue-router";
import {routerHandler} from "../utils/handler";

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
    },
    {
      path: "/login",
      component: ()=>import("../pages/Login.vue")
    },
    {
      path: "/register",
      component: ()=>import("../pages/Register.vue")
    }
  ]
})

router.beforeEach(async (to) => {
  return routerHandler(to)
})

export default router;