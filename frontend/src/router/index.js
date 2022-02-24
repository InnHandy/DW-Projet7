import { createRouter, createWebHashHistory } from 'vue-router'
import Account from '../views/Account.vue'
import Comment from '../views/Comment.vue'
import CreateComment from '../views/CreateComment.vue'
import CreatePost from '../views/CreatePost.vue'
import Post from '../views/Post.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import ListPosts from '../views/ListPosts.vue'
import ListComments from '../views/ListComments.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  }
  ,
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/listposts',
    name: 'ListPosts',
    component: ListPosts,
  },
  {
    path: '/listposts/:id',
    name: 'Post',
    component: Post,
  },
  {
    path: '/createpost',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/listposts/:id/listcomments',
    name: 'ListComments',
    component: ListComments
  },
  {
    path: '/listposts/:id/listcomments/:comment_id',
    name: 'Comment',
    component: Comment,
  },
  {
    path: '/listposts/:id/listcomments/createcomment',
    name: 'CreateComment',
    component: CreateComment,
  }
]
/*

import Home from '../views/Home.vue'
import Home from '../views/Home.vue'getAllPosts);
import Home from '../views/Home.vue'createPost);
import Home from '../views/Home.vue'getOnePost);
import Home from '../views/Home.vue'likePost);
import Home from '../views/Home.vue'modifyPost);
import Home from '../views/Home.vue'deletePost);
import Home from '../views/Home.vue'getAllComments);
import Home from '../views/Home.vue'createComment);
import Home from '../views/Home.vue'.likeComment);
import Home from '../views/Home.vue'getOneComment);
import Home from '../views/Home.vue'modifyComment);
import Home from '../views/Home.vue'deleteComment);
import Login from '../views/Login.vue'

*/
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
