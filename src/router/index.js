import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "@src/views/Posts/";
import PostsId from "@src/views/Posts/_id";

Vue.use(VueRouter);

//If here were more Routes, I would split them into separate modules
const routes = [
  {
    path: "/",
    redirect: "/posts",
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/posts/:id",
    name: "PostsId",
    component: PostsId,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
