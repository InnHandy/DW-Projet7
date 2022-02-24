<template>
<div class="container" >
    <div class="row">
          <div class="col-md-4">
              <router-link  to="/listposts">
              <header>
                <img src="../assets/icon-above-font.png" class="img-fluid" alt="Responsive image" style="width:100px">
              </header>
              </router-link>
          </div>
          <div class="col-md-2 pt-4">
            <button class="btn btn-danger mb-2" type="button" @click="deconnect()">Logout</button>
          </div>
          <div class="col-md-2 pt-4">
              <router-link  to="/account">
                <button class="btn btn-warning" type="button">Account</button>
              </router-link>
          </div>
          <div class="col-md-2 pt-4">
              <router-link  to="/createpost">
                <button class="btn btn-success" type="button">Poster</button>
              </router-link>
          </div>
    </div>
    <br>
        <br>
        <br>
    <div class="row">    
          <div class="col-md-12">
              <h1>List des posts</h1>
              <div v-for="post in posts" v-bind:key="post">
                <div class="row">
                  <div class="col-md-12">
                    <h4>Post num {{ post.id }} </h4>
                    <p><a href="{{ post.link }}">{{ post.link }}</a> </p>
                    <p>{{ post.content }}</p>
                   <p>  <button type="button" class=" btn-info" @click="goToPost(post.id)">Voir le Post</button></p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <button type="button"
                            :class="{ 'btn-primary': !JSON.parse(post.posts_users_like).includes(post.id), 'btn-secondary': JSON.parse(post.posts_users_like).includes(post.id)}"
                            class="btn" @click="liker(post.id)" :disabled="JSON.parse(post.posts_users_dislike).includes(post.id)">{{ post.posts_nb_like }}Like</button>
                  </div>
                  <div class="col-md-6">
                      <button type="button" :disabled="JSON.parse(post.posts_users_like).includes(post.id)" class="btn btn-warning" @click="disliker(post.id)">{{ post.posts_nb_like }}Dislike</button>
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
     }
  },
  components: {
  },
  methods : {
    deconnect(){
     localStorage.clear();
     this.$router.push('/') 
    },
    goToPost(id) {
      this.$router.push('/listposts/'+ id );
    },

    getAllPosts() {
      let options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
      fetch('http://localhost:3000/api/posts/', options)
      .then(response => response.json() )
      .then(data => {
        this.posts = data;
        console.log(this.posts)
      })
    },
    liker(id) {
      let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
            body: {
              user_id: localStorage.getItem('userId')
            }
        };
      fetch('http://localhost:3000/api/posts/'+ id + '/like', options)
      .then(response => response.json() )
      .then(data => {
        console.log(data)});
      this.getAllPosts()
    },
    disliker(id) {
      let options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: {
          user_id: localStorage.getItem('userId')
        }
      };
      fetch('http://localhost:3000/api/posts/'+ id + '/like', options)
      .then(response => response.json() )
      .then(data => {
        console.log(data)});
      this.getAllPosts()
    },},
  mounted() {
    this.getAllPosts();
  }}  
</script>

<style>
</style>
