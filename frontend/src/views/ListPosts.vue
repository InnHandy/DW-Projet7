<template>
    <div class="container">
      <div class="row">
          <div class="col-8">
              <header>
                <img src="../assets/icon-above-font.png" class="img-fluid" alt="Responsive image" style="width:100px">
              </header>
          </div>
          <div class="col-1">
              <router-link to="/login">
                <button class="btn btn-success" type="button">logout</button>
              </router-link>
          </div>
          <div class="col-1">
              <router-link to="/account">
                <button class="btn btn-success" type="button">mon compte</button>
              </router-link>
          </div>
          <div class="col-1">
              <router-link to="/createPost">
                <button class="btn btn-success" type="button">Post</button>
              </router-link>
          </div>
      </div>

<div class="row">    
          <div class="col-6">
              <h1>List des posts</h1>
          <div v-for="post in posts" v-bind:key="post">
              <div class="row">
                  <div class="col-12">
                    <h4>Post num {{ post.id }} <button type="button" class="btn btn-info">Voir +</button></h4>
                    <p>{{ post.title }}</p>
                  </div>
              </div>
              <div class="row">
                  <div class="col-1">
                    <button type="button"
                            :class="{ 'btn-primary': !posts_users_like.includes(post.id), 'btn-secondary': posts_users_like.includes(post.id)}"
                            class="btn" @click="like(post.id)">Like</button>
                  </div>
                  <div class="col-1">
                      <button type="button" :disabled="posts_users_disLike.includes(post.id)" class="btn btn-warning" @click="dislike(post.id)">Dislike</button>
                  </div>
              </div>
              <br>
          </div>
          </div>
</div>
    </div>
     
</template>

<script>
export default {
  name: 'ListPosts',
  data() {
    return {
       posts: [],
       posts_users_like: [],
       posts_users_disLike: [],
    }
  },
  components: {

  },
  methods : {
    getAllPosts() {
      fetch('http://localhost:3000/api/posts/')
      .then(response => response.json() )
      .then(data => {
        this.posts = data
      })
    },
    like(id) {

      console.log('like post ' + id)
      this.posts_users_like.push(id)
    },
    dislike(id) {
      console.log('dislike post ' + id)
      this.posts_users_disLike.push(id)
    },
  },
  mounted() {
    this.getAllPosts();
  }
}
</script>

<style>

</style>
