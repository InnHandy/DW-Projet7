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
                <router-link  to="/"><button class="btn btn-success" type="button">retour</button></router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-6">         
                <h2>Pour rejoindre la communauté, merci de remplir ce formulaire</h2>
                <form v-on:submit.prevent="createcomment" id="form-signup" >
                    <div class="form-group">
                <label for="title">Titre du comment :</label>
                <input type="text" id="title" name="title" class="form-control" required v-model="inputComment.title"/>
              </div>
              <div class="form-group">
                <label for="texte">Comment :</label>
                <textarea type="text" id="texte" name="texte" rows="10" class="form-control" required v-model="inputComment.texte"></textarea>
              </div>
                    <br>
                    <button>Connect</button>                                       
                </form> 
            </div>   
            <div class="col-1"><p>Vous avez déjà un compte ? <router-link to="/">Connectez-vous</router-link></p></div> 
        </div>
    </div> 
</template>


<script>

export default {
    name: 'CreateComment',
    data() {
        return {
            inputComment: {
        post_id: "",
        user_id: "",
        title: "",
        texte: ""
        }
        }
    },
    methods: {
        deconnect(){
     localStorage.clear();
     this.$router.push('/') 
    },
        createcomment() {
            let inputDatas = {
                "title": this.inputComment.title,
                "post_id": location.pathname.href.split('/'),
                "user_id": localStorage.getItem("userId"),
                "texte": this.inputComment.texte
            }
            console.log(inputDatas)
            let url = 'http://localhost:3000/api/posts/'+this.post_id +'/comments/+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666695555555555555555699999999999999999999999999999999999999999999999999999999999999-'
            let options = {
                method: "POST",
                body: JSON.stringify(inputDatas),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(options)
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    console.log(res);
                    this.$router.push("/");
                })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style>
</style>