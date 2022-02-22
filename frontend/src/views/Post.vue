<template>
 <div class="container" >
    <div class="row">
          <div class="col-8">
              <header>
                <img src="../assets/icon-above-font.png" class="img-fluid" alt="Responsive image" style="width:100px">
              </header>
          </div>
          <div class="col-2 pt-4">
              <router-link  to="/">
                <button class="btn btn-warning mb-2" type="button">LogOut</button>
              </router-link>
          </div>
          <div class="col-2 pt-4">
              <router-link  to="/listposts">
                <button class="btn btn-success" type="button">Retour</button>
              </router-link>
          </div>
    </div>
 <div class="row">
                  <div class="col-12">
                    <h4>Post num {{ Post.id }} <button type="button" class="btn btn-info" @click="createPost">Créer un post</button></h4>
                    <p><a href="{{ post.link }}">{{ post.link }}</a> </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
                    <button v-if="!JSON.parse(post.posts_users_like).includes(post.id)"  type="button" class="btn btn-primary" @click="liker(post.id)">{{ post.posts_nb_like }} Like</button>
                    <button v-else  type="button" class="btn btn-primary" @click="unliker(post.id)">{{ posts_nb_like }} Unlike</button>
                  </div>
                  <div class="col-2">
                      <button type="button" :disabled="post.posts_users_dislike.includes(post.id)" v-if="!post.posts_users_dislike.includes(post.id)" class="btn btn-warning" @click="disliker(post.id)"> {{ post.posts_nb_dislike }} Dislike</button>
                      <button v-else  type="button" class="btn btn-primary" @click="undisliker(post.id)">{{ post.posts_nb_dislike }} Unlike</button>
                  </div>
                </div>
        <div>
              <button v-if="post.is_Admin == true" 
              type="button" @click="deletePost(post.id)" >Supprimez </button>
        </div> 
   </div>
  
 
</template>

<script>

export default {
    name: "Post",
    data() {
        return {
        Post: {    
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
      fetch('http://localhost:3000/api/posts/'+ this.Post.id, options)
      .then(response => response.json() )
      .then(data => {
        this.post = data;
        console.log(this.post)
      })
    },
    createPost() {
      this.$router.push('/createpost/')
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
    this.createPost();
  },
}
</script>

<style>
</style>

