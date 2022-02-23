<template>
<div class="container" >
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
          <div class="col-2 pt-4">
              <router-link  to="/listposts">
                <button class="btn btn-success" type="button">Retour</button>
              </router-link>
          </div>
    </div>
    <div class="row">    
          <div class="col-6">
              <h1>Post</h1>
              <div v-for="post in posts" v-bind:key="post">
                <div class="row">
                  <div class="col-12">
                    <h4>Post num {{ post.id }} <button type="button" class="btn btn-info" @click="goToComments(post.id)">Voir Commentaires</button></h4>
                    <p><a href="{{ post.link }}">{{ post.link }}</a> </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
                    <button v-if="!JSON.parse(post.posts_users_like).includes(post.id)"  type="button" class="btn btn-primary" @click="liker(post.id)">{{ post.posts_nb_like }} Like</button>
                    <button v-else  type="button" class="btn btn-primary" @click="unliker(post.id)">{{ post.posts_nb_like }} Unlike</button>
                  </div>
                  <div class="col-2">
                      <button type="button" :disabled="post.posts_users_dislike.includes(post.id)" v-if="!post.posts_users_dislike.includes(post.id)" class="btn btn-warning" @click="disliker(post.id)"> {{ post.posts_nb_dislike }} Dislike</button>
                      <button v-else  type="button" class="btn btn-primary" @click="undisliker(post.id)">{{ post.posts_nb_dislike }} Unlike</button>
                  </div>
                  <div class="col-2">
                  <button v-if="post.is_Admin == true" 
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
       posts_users_like: [],
       posts_users_dislike: [],
       link: "",
       title: "",
       content:"",
       user_id: localStorage.getItem("userId"),
       posts_nb_like: 0,
       posts_nb_dislike: 0,
       like:0,
       is_Admin: localStorage.getItem("is_Admin"),
       id : window.location.href.split('/')[5],


    }
  },
  components: {

  },
  methods : {
    deconnect(){
     localStorage.clear();
     this.$router.push('/') 
    },
    getOnePost() {
      let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
      fetch('http://localhost:3000/api/posts/'+ this.id, options)
      .then(response => response.json() )
      .then(data => {
        this.posts = data;
        console.log(this.posts)
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
      goToComments(id) {
      this.$router.push('/listposts/'+ id );
      localStorage.setItem('postID', id)
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
    liker(id) {

      console.log('like post ' + id);
      //this.posts_users_like.push(id);
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
      fetch('http://localhost:3000/api/posts/'+ id + '/like', options)

      this.getAllPosts()

    },
    disliker(id) {
      console.log('like post ' + id);
      //this.posts_users_like.push(id);
      let options = {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: {
          like:-1,
          user_id: localStorage.getItem('userId')
        }
      };
      fetch('http://localhost:3000/api/posts/'+ id + '/like', options)

      this.getAllPosts()
    },
    unliker(id) {

      console.log('like post ' + id);
      //this.posts_users_like.push(id);
      let options = {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: {
          like:0,
          user_id: localStorage.getItem('userId')
        }
      };
      fetch('http://localhost:3000/api/posts/'+ id + '/like', options)

      this.getAllPosts()
    },
    undisliker(id) {

      console.log('unlike post ' + id)
      this.posts_users_dislike.splice(this.posts_users_dislike.indexOf(id, 1))
      //rafraichir la liste des posts en relançant la requete ou mettre à jour le tableau de post local
    }
  },
  mounted() {
    this.getOnePost();
    this.createPost();
  },
}
</script>

<style>
</style>

