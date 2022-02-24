<template>
    <div class="container">
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
              <router-link to="/account">
                <button class="btn btn-success" type="button">mon compte</button>
              </router-link>
          </div>
          <div class="col-md-2 pt-4">
              
                <button class="btn btn-success" type="button" @click="retour()">Retour</button>
              
          </div>
      </div>
<br>
        <br>
        <br>
<div class="row">    
          <div class="col-md-12">
              <h1>List des comments</h1>
          <div v-for="comment in comments" v-bind:key="comment">
              <div class="row">
                  <div class="col-md-12">
                    <h4>Comment num {{ comment.comment_id }} <button type="button" class="btn btn-info">Voir +</button></h4>
                    <p>{{ comment.title }}</p>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-4">
                    <button type="button"
                            :class="{ 'btn-primary': !JSON.parse(comment.comments_users_like).includes(comment.comment_id), 'btn-secondary': JSON.parse(comment.comments_users_like).includes(comment.comment_id)}"
                            class="btn" @click="liker(comment.comment_id)" :disabled="comments_users_like.includes(comment.comment_id)">{{ comment.comments_nb_like }}Like</button>
                  </div>
                  <div class="col-md-4">
                      <button type="button" :disabled="JSON.parse(comment.comments_users_dislike).includes(comment.comment_id)" class="btn btn-warning" @click="disliker(comment.comment_id)">Dislike</button>
                  </div>
                  <div class="col-md-4">
                  <button v-if="adminDelete()" 
                  type="button" @click="deleteComment(comment.comment_id)" >Supprimez </button>
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
       comment_id : window.location.href.split('/')[7],
       post_id : window.location.href.split('/')[5],
       user_id: localStorage.getItem("userId"),
       is_Admin: localStorage.getItem("is_Admin"),
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
    retour(){
      this.$router.go(-1);
    },
    getOneComment() {
      let url = 'http://localhost:3000/api/posts/' + this.post_id + '/comments/' + this.comment_id;
      let options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
      fetch(url, options)
      .then(response => response.json() )
      .then(data => {
        this.comments = Object.values(data);
      })
    },
    deleteComment(id) {
            if(this.is_Admin==false){alert("Vous n'êtes pas admin, action impossible ! ")}
            else{
            let url  = 'http://localhost:3000/api/posts/' + this.post_id + '/comments/' + id;
            let options = {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
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
    liker(id) {
      console.log('like comment ' + id);
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
      fetch('http://localhost:3000/api/posts/' + this.post_id + '/comments/'+ id + '/like', options)
      .then(response => response.json() )
      .then(data => {
        console.log(data)});
      this.getOneComment()

    },
    disliker(id) {
      console.log('dislike comment ' + id);
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
      fetch('http://localhost:3000/api/posts/' + this.post_id + '/comments/'+ id + '/dislike', options)
      .then(response => response.json() )
      .then(data => {
        console.log(data)});
      this.getOneComment()
    }
  },
  mounted() {
    this.getOneComment();
  }
}
</script>

<style>

</style>