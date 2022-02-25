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
                    <h4>Comment num {{ comment.comment_id }} </h4>
                    <p>{{ comment.texte }}</p>
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
    createComment() {
      this.$router.push('/listposts/' + this.postID + '/listcomments/createcomment')
    },
  },
  mounted() {
    this.getAllComments();
  }
  }   
</script>

<style>

</style>
