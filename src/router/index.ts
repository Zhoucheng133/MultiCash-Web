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
      name: "登录",
      path: "/login",
      component: ()=>import("../pages/Login.vue")
    },
    {
      name: "注册",
      path: "/register",
      component: ()=>import("../pages/Register.vue")
    },
    {
      name: "修改密码",
      path: "/password",
      component: ()=>import("../pages/ChangePassword.vue")
    }
  ]
})

router.beforeEach(async (to) => {
  return routerHandler(to)
})

export default router;
