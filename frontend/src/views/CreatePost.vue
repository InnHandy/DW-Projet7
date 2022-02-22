<template>
        <div class="container">
         <div class="row">
          <div class="col-8">
              <header>
                <img src="../assets/icon-above-font.png" class="img-fluid" alt="Responsive image" style="width:100px">
              </header>
          </div>
          <div class="col-1">
              <router-link to="/signup">
                <button class="btn btn-warning mb-2" type="button">logout</button>
              </router-link>
          </div>
          <div class="col-1">
              <router-link to="/login">
                <button class="btn btn-success" type="button">Retour</button>
              </router-link>
          </div>
      </div>
        <div class= "row">    
            
            <div class="col-6">
                <textarea type="text" id="content" name="content" rows="2" class="form-control" v-model="content" 
                placeholder="Insérer votre nom puis votre commentaire svp..."></textarea>
                <a v-on:click="createPost"><i class="far fa-paper-plane" title="Envoyer"></i></a>          
            </div>
        </div>
        <div class="row">  
        <div class="col-6">          
            <h2>Exprimez-vous ! Partagez !</h2>
            <form id="form-signup" >
              <div class="form-group">
                <label for="title">Titre du post :</label>
                <input type="text" id="title" name="title" class="form-control" required v-model="inputPost.title"/>
              </div>
              <div class="form-group">
                <label for="content">Contenu :</label>
                <textarea type="text" id="link" name="link" rows="10" class="form-control" required v-model="inputPost.link"></textarea>
              </div>
              <div class="form-group">
                <label for="content">Contenu :</label>
                <textarea type="text" id="user_id" name="user_id" rows="10" class="form-control" required v-model="inputPost.user_id"></textarea>
              </div>
            </form>              
             <button v-on:click="createPost" >Envoyer</button> 
          </div> 
        </div>
        </div>
</template>


<script >

export default {

    data() {
        return{
        inputPost: {
        link: "",
        user_id: "",
        title: ""
        }
        }
    },
    methods: {
        createPost() {
            let inputPost = {
                "title": this.inputPost.title,
                "link": this.inputPostlink,
                "user_id": localStorage.getItem("userId")
            };

            let url = 'http://localhost:3000/api/post/' + this.user_id;
            let options = {
                method: "POST",
                body: JSON.stringify(inputPost),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    if (res.ok) {
                        this.title = {}
                    } else {
                        alert("Post envoyé");
                    }
                })
                .then(window.location.reload())
                .catch(error => console.log(error))
        }
    },
}
</script>

<style >

</style>

