import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/blog",
      name: "blog",
      component: require("./views/blog.vue").default,
    },
    {
      path: "/post/:id",
      name: "post",
      component: require("./views/post.vue").default,
    },
    {
      path: "/covers",
      name: "covers",
      component: require("./views/covers.vue").default,
    },
    {
      path: "*",
      redirect: "/blog",
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue"),
    // },
  ],
})
