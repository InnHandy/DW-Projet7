<template>
    <div class="container">
      <div class="row">
          <div class="col-8">
              <router-link  to="/listposts">
              <header>
                <img src="../assets/icon-above-font.png" class="img-fluid" alt="Responsive image" style="width:100px">
              </header>
             </router-link> 
          </div>
          <div class="col-2 pt-4">
            <button class="btn btn-warning mb-2" type="button" @click="deconnect()">Logout</button>
          </div>
          <div class="col-1">
              <router-link to="/account">
                <button class="btn btn-success" type="button">mon compte</button>
              </router-link>
          </div>
          <div class="col-1">
              
                <button class="btn btn-success" type="button" @click="retour()">Retour</button>
              
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
                            :class="{ 'btn-primary': !comments_users_like.includes(comment.comment_id), 'btn-secondary': comments_users_like.includes(comment.comment_id)}"
                            class="btn" @click="liker(comment.comment_id)">{{ comment.comments_nb_like }}Like</button>
                  </div>
                  <div class="col-1">
                      <button type="button" :disabled="comments_users_disLike.includes(comment.comment_id)" class="btn btn-warning" @click="disliker(comment.comment_id)">Dislike</button>
                  </div>
                  <div class="col-2">
                  <button v-if="adminDelete()" 
                  type="button" @click="deletePost(comment.comment_id)" >Supprimez </button>
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
  name: 'Comment',
  data() {
    return {
       comments: [],
       comments_users_like: [],
       comments_users_disLike: [],
       texte : "",
       comment_id : window.location.href.split('/')[5],
       post_id : window.location.href.split('/')[7],
       user_id: localStorage.getItem("userId"),
       comments_nb_like: 0,
       comments_nb_dislike: 0,
       is_Admin: localStorage.getItem("is_Admin"),
    }
  },
  components: {

  },
  methods : {
    deconnect(){
     localStorage.clear();
     this.$router.push('/') 
    },
    retour(){
      this.$router.go(-1);
    },
    getOneComment() {
      let url = 'http://localhost:3000/api/posts/' + this.post_id + '/comments/' + this.comment_id;
      let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
      fetch(url, options)
      .then(response => response.json() )
      .then(data => {
        this.comments = data
      })
    },
    deleteComment(id) {
            if(this.is_Admin==false){alert("Vous n'êtes pas admin, action impossible ! ")}
            else{
            let url  = 'http://localhost:3000/api/posts/' + this.post_id + '/comments/' + id;
            let options = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    alert("Suppression du commentaire confirmé ! 😢");
                    window.location.reload();
                })
                .catch(error => console.log(error))
        }},
    like(id) {

      console.log('like comment ' + id)
      this.comments_users_like.push(id)
    },
    dislike(id) {
      console.log('dislike comment ' + id)
      this.comments_users_disLike.push(id)
    },
  },
  mounted() {
    this.getOneComment();
  }
}
</script>

<style>

</style>