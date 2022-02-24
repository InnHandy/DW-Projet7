<template>
<div class="container" >
    <div class="row">
          <div class="col-md-4">
              <header>
              <router-link  to="/listposts">
              <header>
                <img src="../assets/icon-above-font.png" class="img-fluid" alt="Responsive image" style="width:100px">
              </header>
             </router-link>               
             </header>
          </div>
          <div class="col-md-2 pt-4">
            <button class="btn btn-warning mb-2" type="button" @click="deconnect()">Logout</button>
          </div>
          <div class="col-md-2 pt-4">
              <router-link to="/account">
                <button class="btn btn-success" type="button">Account</button>
              </router-link>
          </div>
          <div class="col-md-2 pt-4">
                <button class="btn btn-success" type="button" @click="createComment()">Commenter</button>
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
              <h1>List des comments </h1>
          
          <div v-for="comment in comments" v-bind:key="comment">
              <div class="row">
                  <div class="col-md-12">
                    <h4>Comment num {{ comment.comment_id }} <button type="button" class=" btn-info" @click="goToComment(comment.comment_id)">Voir le Commentaire</button></h4>
                    <p>{{ comment.texte }}</p>
                  </div>
              </div>
                <div class="row">
                  <div class="col-md-6">
                    <button type="button"
                            :class="{ 'btn-primary': !JSON.parse(comment.comments_users_like).includes(comment.comment_id), 'btn-secondary': JSON.parse(comment.comments_users_like).includes(comment.comment_id)}"
                            class="btn" @click="liker(comment.comment_id)" :disabled="JSON.parse(comment.comments_users_like).includes(comment.comment_id)">{{ comment.comments_nb_like }}Like</button>
                  </div>
                  <div class="col-md-6">
                      <button type="button" :disabled="JSON.parse(comment.comments_users_dislike).includes(comment.comment_id)" class="btn btn-warning" @click="disliker(comment.comment_id)">{{ comment.comments_nb_dislike }}Dislike</button>
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
       postID: window.location.href.split('/')[5],
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
      localStorage.removeItem("postId")
    },
    getAllComments() {
      let options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
      fetch('http://localhost:3000/api/posts/' + this.postID + '/comments', options)
      .then(response => response.json() )
      .then(data => {
        this.comments = data
      })
    },
    goToComment(id) {
      this.$router.push('/listposts/' + this.postID + '/listcomments/' + id )
    },
    createComment() {
      this.$router.push('/listposts/' + this.postID + '/listcomments/createcomment')
    },
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
      fetch('http://localhost:3000/api/posts/' + this.postID + '/comments/'+ id + '/like', options)
      .then(response => response.json() )
      .then(data => {
        console.log(data)});
      this.getAllComments()

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
      fetch('http://localhost:3000/api/posts/' + this.postID + '/comments/'+ id + '/dislike', options)
      .then(response => response.json() ) 
      .then(data => {
        console.log(data)});
      this.getAllComments()
    }
  },
  mounted() {
    this.getAllComments();
  }
  }   
</script>

<style>

</style>
