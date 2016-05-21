import Vue from 'vue';
import touch from 'vue-touch';
import vueRoute from 'vue-router';

import bottom from './component/bottom.html';
import home from './component/home.html';
import newslist from './component/newslist.html';
import productlist from './component/productlist.html';
import me from './component/me.html';
import newsinfo from './component/newsinfo.html';
import loading from './component/loading.html';
import login from './component/login.html';

import './css/animate.css';
import './css/weui.css'
import './css/style.css';

//注册中间间
Vue.use(touch);
Vue.use(vueRoute);

//注册全局组件
Vue.component("bottom",bottom);
Vue.component("home",home);
Vue.component("newslist",newslist);
Vue.component("productlist",productlist);
Vue.component("me",me);
Vue.component("newsinfo",newsinfo);
Vue.component("loading",loading);
Vue.component("login",login);

//定义过渡
Vue.transition('left', {
  enterClass: 'bounceInRight',
  leaveClass: 'bounceOutLeft',
  type: 'animation'
});
Vue.transition('right', {
  enterClass: 'bounceInLeft',
  leaveClass: 'bounceOutRight',
  type: 'animation'
});

$.ajaxSettings.crossDomain = true;

//新建根组件
var app = Vue.extend({});

//创建路由表
global.route = new vueRoute();

//服务器配置
global.root = "http://115.28.229.151";

//配置路由
route.map({
  '/home' : {
    component : home
  },
  '/productlist': {
    component : productlist
  },
  '/newslist' : {
    component : newslist
  },
  '/me' : {
    component : me,
    auth : true
  },
  '/' : {
    component : home
  },
  '/newsinfo/:nid' : {
    component : newsinfo
  },
  '/login' : {
    component : login
  }
});

//登录判断
route.beforeEach((transition)=>{
   if( transition.to.auth && !localStorage.getItem("admin") ) { //切换到这个组件之前，需要进行认证
       sessionStorage.setItem("nextPath",transition.to.path);
       route.go({path:'/login'});
       return;
   }
   
   transition.next();
});

//启动路由
route.start(app,'body');