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
            <button class="btn btn-warning mb-2" type="button" @click="deconnect()">Logout</button>
          </div>
          <div class="col-md-2 pt-4">
              <router-link  to="/listposts">
                <button class="btn btn-success" type="button">Retour</button>
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
              <h1>Post</h1>
              <div v-for="post in posts" v-bind:key="post">
                <div class="row">
                  <div class="col-md-12">
                    <h4>Post num {{ post.id }} <button type="button" class="btn btn-info" @click="goToComments(post.id)">Voir Commentaires</button></h4>
                    <p><a href="{{ post.link }}">{{ post.link }}</a> </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <button type="button"
                            :class="{ 'btn-primary': !JSON.parse(post.posts_users_like).includes(post.id), 'btn-secondary': JSON.parse(post.posts_users_like).includes(post.id)}"
                            class="btn" @click="liker(post.id)" :disabled="JSON.parse(post.posts_users_dislike).includes(post.id)">{{ post.posts_nb_like }}Like</button>
                  </div>
                  <div class="col-md-4">
                      <button type="button" :disabled="JSON.parse(post.posts_users_like).includes(post.id)" class="btn btn-warning" @click="disliker(post.id)">{{ post.posts_nb_dislike }}Dislike</button>
                  </div>
                  <div class="col-md-4">
                  <button v-if=" adminDelete" 
                  type="button" @click="deletePost(post.id)" >Supprimez </button>
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
  name: 'Post',
  data() {
    return {
       posts: [],
       user_id: localStorage.getItem("userId"),
       is_Admin: localStorage.getItem("is_Admin"),
       id : window.location.href.split('/')[5],


    }
  },
  components: {

  },
  methods : {
    adminDelete(){
      if (this.is_Admin == true){return true;}
      else {return false;}
    },
    
    deconnect(){
     localStorage.clear();
     this.$router.push('/') 
    },
    getOnePost() {
      let options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
      fetch('http://localhost:3000/api/posts/'+ this.id, options)
      .then(response => response.json() )
      .then(data => {
        this.posts = Object.values(data);
        console.log(this.posts)
      })
    },

    deletePost(id) {
            let url = `http://localhost:3000/api/posts/` + id;
            let options = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    alert("Suppression du message confirmé ! 😢");
                    this.$router.push('/listposts');
                })
                .catch(error => console.log(error))
        },
      goToComments(id) {
      this.$router.push('/listposts/'+ this.id + '/listcomments');
      localStorage.setItem('postID', id)
    },
    createPost() {
      this.$router.push('/createpost/')
    },
    liker(id) {

      console.log('like post ' + id);
      //this.posts_users_like.push(id);
      let options = {
            method: "POST",
            headers: {
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
      this.getOnePost();
      window.location.reload();

    },
    disliker(id) {
      console.log('dislike post ' + id);
      //this.posts_users_like.push(id);
      let options = {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: {
          user_id: localStorage.getItem('userId')
        }
      };
      fetch('http://localhost:3000/api/posts/'+ id + '/dislike', options)
      .then(response => response.json() )
      .then(data => {
        console.log(data)});
      this.getOnePost();
      window.location.reload();
      
    }
  },
  mounted() {
    this.getOnePost();
  },
}
</script>

<style>
</style>

