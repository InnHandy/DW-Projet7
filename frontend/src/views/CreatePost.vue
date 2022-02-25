<template>
    <div class="container" >
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
                <router-link  to="/"><button class="btn btn-success" type="button">Retour</button></router-link>
            </div>
        </div>
        <br>
        <br>
        <br>
        <div class="row">
            <div class="col-md-12">        
                <h2>Veuillez remplir votre post</h2>
                <form v-on:submit.prevent="createpost" id="form-signup" >
                    <div class="form-group">
                <label for="title">Titre du post :</label>
                <input type="text" id="title" name="title" class="form-control" required v-model="inputPost.title"/>
              </div>
              <div class="form-group">
                <label for="content">Contenu :</label>
                <textarea type="text" id="content" name="content" rows="10" class="form-control" required v-model="inputPost.content"></textarea>
              </div>
              <div class="form-group">
                <label for="content">Link :</label>
                <textarea type="text" id="link" name="link" rows="5" class="form-control" required v-model="inputPost.link"></textarea>
              </div>
                    <br>
                    <button class=" btn-success">Poster</button>                                       
                </form> 
            </div>   
            <div class="col-md-12"><p>Vous avez déjà un compte ? <router-link to="/">Connectez-vous</router-link></p></div> 
        </div>
    </div> 
</template>


<script>

export default {
    name: 'CreatePost',
    data() {
        return {
            inputPost: {
        link: "",
        user_id: "",
        title: "",
        content: ""
        }
        }
    },
    methods: {
        deconnect(){
     localStorage.clear();
     this.$router.push('/') 
    },
        createpost() {
            let inputDatas = {
                "title": this.inputPost.title,
                "link": this.inputPost.link,
                "user_id": localStorage.getItem("userId"),
                "content": this.inputPost.content
            }
            console.log(inputDatas)
            let url = 'http://localhost:3000/api/posts'
            let options = {
                method: "POST",
                body: JSON.stringify(inputDatas),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            }
            console.log(options)
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    console.log(res);
                    this.$router.push("/listposts");
                })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style>
</style>