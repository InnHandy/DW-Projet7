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
            <div class="row">
                <div class="col-6">
                <textarea type="text" id="content" name="content" rows="2" class="form-control" v-model="content" 
                placeholder="Insérer votre nom puis votre commentaire svp..."></textarea>
                <a v-on:click="createAnswer()"><i class="far fa-paper-plane" title="Envoyer"></i></a>          
            </div>
            </div>
        
        <div class="row"> 
        <div class="col-8">          
            <h2>Exprimez-vous ! Partagez !</h2>
            <form id="form-signup" >
              <div class="form-group">
                <label for="title">Titre du message :</label>
                <input type="text" id="title" name="title" class="form-control" required v-model="inputMessage.title"/>
              </div>
              <div class="form-group">
                <label for="content">Contenu :</label>
                <textarea type="text" id="content" name="content" rows="10" class="form-control" required v-model="inputMessage.content"></textarea>
              </div>
            </form>              
             <button v-on:click="sendMessage" >Envoyer</button> 
          </div> 
        </div>
        </div>
</template>


<script >
export default {
    data() {
        return {
            answer: "",
            answers: [],
        }
    },
    methods: {
        createAnswer() {
            let inputContent = {
                "content": this.content,
                "messageId": this.messageId
            }
            let url = "http://localhost:3000/api/answers/new"
            let options = {
                method: "POST",
                body: JSON.stringify(inputContent),
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
                        this.content = {}
                    } else {
                        alert("Commentaire envoyé 🖅");
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
