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
              <router-link to="/comment">
                <button class="btn btn-success" type="button">Comment</button>
              </router-link>
          </div>
      </div>
  
<div class="row">    
          <div class="col-6">
              <h1>List des comments</h1>
          
          <div v-for="comment in comments" v-bind:key="comment">
              <div class="row">
                  <div class="col-12">
                    <h4>Comment num {{ comment.comment_id }} <button type="button" class="btn btn-info">Voir +</button></h4>
                    <p>{{ comment.title }}</p>
                  </div>
              </div>
              <div class="row">
                  <div class="col-1">
                    <button type="button"
                            :class="{ 'btn-primary': !comments_users_like.includes(comments.comment_id), 'btn-secondary': comments_users_like.includes(comments.comment_id)}"
                            class="btn" @click="like(comments.comment_id)">Like</button>
                  </div>
                  <div class="col-1">
                      <button type="button" :disabled="comments_users_disLike.includes(comments.comment_id)" class="btn btn-warning" @click="dislike(comments.comment_id)">Dislike</button>
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
  name: 'ListComments',
  data() {
    return {
       comments: [],
       comments_users_like: [],
       comments_users_disLike: [],
    }
  },
  components: {

  },
  methods : {
    getAllComments() {
      fetch('http://localhost:3000/api/posts/')
      .then(response => response.json() )
      .then(data => {
        this.comments = data
      })
    },
    like(comment_id) {

      console.log('like comment ' + comment_id)
      this.comments_users_like.push(comment_id)
    },
    dislike(comment_id) {
      console.log('dislike comment ' + comment_id)
      this.comments_users_disLike.push(comment_id)
    },
  },
  mounted() {
    this.getAllComments();
  }
}
</script>

<style>

</style>
