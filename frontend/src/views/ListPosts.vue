<template>
<div class="container" >
    <div class="row">
          <div class="col-8">
              <header>
                <img src="../assets/icon-above-font.png" class="img-fluid" alt="Responsive image" style="width:100px">
              </header>
          </div>
          <div class="col-2 pt-4">
              <router-link  to="/signup">
                <button class="btn btn-warning mb-2" type="button">signup</button>
              </router-link>
          </div>
          <div class="col-2 pt-4">
              <router-link  to="/">
                <button class="btn btn-success" type="button">login</button>
              </router-link>
          </div>
    </div>
    <div class="row">    
          <div class="col-6">
              <h1>List des posts</h1>
              <div v-for="post in posts" v-bind:key="post">
                <div class="row">
                  <div class="col-12">
                    <h4>Post num {{ post.id }} <button type="button" class="btn btn-info" @click="goToPost(post.id)">Voir +</button></h4>
                    <p><a href="{{ post.link }}">{{ post.link }}</a> </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
                   <!-- <button type="button"
                            :class="{ 'btn-primary': !posts_users_like.includes(post.id), 'btn-secondary': posts_users_like.includes(post.id)}"
                            class="btn" @click="like(post.id)">Like</button> -->
                    <button v-if="!post.posts_users_like.includes(post.id)"  type="button" class="btn btn-primary" @click="liker(post.id)">{{ posts_nb_like }} Like</button>
                    <button v-else  type="button" class="btn btn-primary" @click="unliker(post.id)">{{ posts_nb_like }} Unlike</button>
                  </div>
                  <div class="col-2">
                      <button type="button" :disabled="post.posts_users_dislike.includes(post.id)" v-if="!post.posts_users_dislike.includes(post.id)" class="btn btn-warning" @click="disliker(post.id)"> {{ posts_nb_dislike }}Dislike</button>
                      <button v-else  type="button" class="btn btn-primary" @click="undisliker(post.id)">{{ posts_nb_dislike }} Unlike</button>
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
       posts_users_dislike: [],
       link: "",
       title: "",
       content:"",
       user_id: 0,
       posts_nb_like: 0,
       posts_nb_dislike: 0,
       like:0


    }
  },
  components: {

  },
  methods : {
    goToPost(id) {
      this.$router.push('/listposts/'+ id )
    },
    createPost() {
      this.$router.push('/createpost/')
    },

    getAllPosts() {
      fetch('http://localhost:3000/api/posts/')
      .then(response => response.json() )
      .then(data => {
        this.posts = data
      })
    },
    getNbLikes(id){
      fetch('http://localhost:3000/api/posts/'+ id)
      .then(response => response.json() )
      .then(data => {
        this.posts = data
      })
    },
    liker(id) {

      console.log('like post ' + id);
      this.posts_users_like.push(id);
      let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
      fetch('http://localhost:3000/api/posts/'+ id, options)
      .then(response => response.json() )
      .then(data => {
        data.posts_nb_like +=1;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': 'Bearer ' + localStorage.getItem("token") },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:3000/api/posts/' + id, requestOptions)
            .then(response => response.json())
            .then(newdata => console.log(newdata))
      });
      console.log(this.posts_nb_like);
    },
    disliker(id) {
      console.log('dislike post ' + id);
      this.posts_users_dislike.push(id);
    },
    unliker(id) {

      console.log('unlike post ' + id);
      this.posts_users_like.splice(this.posts_users_like.indexOf(id, 1));
      this.posts_nb_like-=1
    },
    undisliker(id) {

      console.log('unlike post ' + id)
      this.posts_users_dislike.splice(this.posts_users_dislike.indexOf(id, 1))
      //rafraichir la liste des posts en relançant la requete ou mettre à jour le tableau de post local
    }
  },
  mounted() {
    this.getAllPosts();
  }
  }

  
    
</script>

<style>

</style>
