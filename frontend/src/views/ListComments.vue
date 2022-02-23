<template>
<div class="container" >
    <div class="row">
          <div class="col-8">
              <header>
              <router-link  to="/listposts">
              <header>
                <img src="../assets/icon-above-font.png" class="img-fluid" alt="Responsive image" style="width:100px">
              </header>
             </router-link>               
             </header>
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
              
                <button class="btn btn-success" type="button" @click="retour">Retour</button>
              
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
                  <div class="col-2">
                    <button v-if="!JSON.parse(comment.comments_users_like).includes(comment.comment_id)"  type="button" class="btn btn-primary" @click="liker(comment.comment_id)">{{ comment.comments_nb_like }} Like</button>
                    <button v-else  type="button" class="btn btn-primary" @click="unliker(post.id)">{{ post.posts_nb_like }} Unlike</button>
                  </div>
                  <div class="col-2">
                      <button type="button" :disabled="JSON.parse(comment.comments_users_dislike).includes(comment.comment_id)" v-if="!JSON.parse(comment.comments_users_dislike).includes(comment.comment_id)" class="btn btn-warning" @click="disliker(comment.comment_id)"> {{ comment.comments_nb_dislike }} Dislike</button>
                      <button v-else  type="button" class="btn btn-primary" @click="undisliker(post.id)">{{ post.posts_nb_dislike }} Unlike</button>
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
       postID: localStorage.getItem("postId")
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
      fetch('http://localhost:3000/api/posts/:id/' + this.postID + '/comments/')
      .then(response => response.json() )
      .then(data => {
        this.comments = data
      })
    },
    goToComment(id) {
      this.$router.push('/listcomments/'+ id )
    },
    createComment() {
      this.$router.push('/createcomment/')
    },
    liker(id) {
      console.log('like comment ' + id);
      let options = {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
            body: {
              like:1,
              user_id: localStorage.getItem('userId')
            }
        };
      fetch('http://localhost:3000/api/posts/:id/comments/'+ id + '/like', options)
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
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: {
          user_id: localStorage.getItem('userId')
        }
      };
      fetch('http://localhost:3000/api/posts/:id/comments/'+ id + '/like', options)
      .then(response => response.json() )
      .then(data => {
        console.log(data)});
      this.getAllComments()
    }
  },
  mounted() {
    this.getAllPosts();
  }
  }   
</script>

<style>

</style>
