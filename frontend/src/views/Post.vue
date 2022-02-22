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
   <div class="col-8"> 
     <h1 >{{inputPost.post}}</h1>       
      <h2>Exprimez-vous ! Partagez !</h2>
          <form id="form-signup" >
            <div class="form-group">
              <label for="title">Titre du post :</label>
              <input type="text" id="title" name="title" class="form-control" required v-model="inputPost.title"/>
            </div>
            <div class="form-group">
              <label for="link">lien :</label>
              <textarea type="text" id="link" name="link" rows="10" class="form-control" required v-model="inputPost.link"></textarea>
            </div>
          </form>              
            <button v-on:click="getOnePost" >Envoyer</button>  
        <div>
              <button v-if="inputPost.userId == userId || is_Admin == true" 
              type="button" @click="deletePost(inputPost.id)" >Supprimez </button>
        </div> 
   </div>
  </div>
  
</template>

<script>

export default {
    name: "Post",
    data() {
        return {
        inputPost: {    
            id : window.location.href.split('/')[5],
            link: "",
            title: "",
            userId: localStorage.getItem("userId"),
            content: "",
            is_Admin: localStorage.getItem("is_Admin"),
            post: []
        }
        }
    },
    methods : {
    getOnePost() {
      let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
      fetch('http://localhost:3000/api/posts/'+ this.inputPost.id, options)
      .then(response => response.json() )
      .then(data => {
        this.post = data;
        console.log(this.post)
      })
    },
    deletePost(id) {
            let url = `http://localhost:3000/api/post/` + id;
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
                    window.location.reload();
                })
                .catch(error => console.log(error))
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
    this.getOnePost();
  },
}
</script>

<style>
</style>

