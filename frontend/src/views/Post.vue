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
              <router-link to="/login">
                <button class="btn btn-success" type="button">Retour</button>
              </router-link>
      </div>
    </div>
 <div>          
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
             <button v-on:click="sendPost" >Envoyer</button> 
          </div>  
          <div>
                <button v-if="post.userId == userId || isAdmin == true" 
                type="button" @click="deleteMessage(message.id)" class="accountbutton">Supprimez </button>
          </div>  
  </div>
</template>

<script>

export default {
    name: "Post",
    data() {
        return {
            link: "",
            title: "",
            userId: "",
            isAdmin: "",
            posts: []
        }
    },
    methods : {
    getOnePost() {
      fetch('http://localhost:3000/api/posts/:id')
      .then(response => response.json() )
      .then(data => {
        this.posts = data
      })
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
    this.getOnePosts();
  },

        deletePost() {
            let url = `http://localhost:3000/api/post/:id`;
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
    
}
</script>

<style>

</style>

