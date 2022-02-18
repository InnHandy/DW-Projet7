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
            <button class="btn btn-warning mb-2" type="button">login</button>
          </router-link>
      </div>
      <div class="col-1">
          <router-link to="/login">
            <button class="btn btn-success" type="button">signup</button>
          </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-6">         
        <h2>Pour rejoindre la communauté, merci de remplir ce formulaire</h2>
        <form v-on:submit.prevent="signup" id="form-signup" >
          <div class="form-group">
            <label for="username">Nom :</label>
            <input type="text" id="username" name="username" class="form-control" required 
            pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$" v-model="inputSignup.username"/>
          </div> 
          <div class="form-group">
            <label for="email">E-mail :</label>
            <input type="email" id="email" name="email" class="form-control" required 
            pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" v-model="inputSignup.email"/>
          </div>
          <div class="form-group">
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" name="password" class="form-control" required
            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" v-model="inputSignup.password"/>
          </div>  
          <p>Minimum 8 caractères dont 1 Majuscule, 1 minuscule et un chiffre</p>
          <button>Connec</button>                                       
        </form> 
    </div>   
        <div class="col-1"><p>Vous avez déjà un compte ? <router-link to="/login">Connectez-vous</router-link></p></div> 
    </div>
  </div> 
</template>


<script>

export default {
    name: 'Signup',
    data() {
        return {
            inputSignup: {
                username: "",
                email: "",
                password: ""
            }
        }
    },
    methods: {
        signup() {
            let inputDatas = {
                "username": this.inputSignup.username,
                "email": this.inputSignup.email,
                "password": this.inputSignup.password
            }
            console.log(inputDatas)
            let url = "http://localhost:3000/api/users/signup"
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
                    localStorage.setItem("userId", res.id);
                 
                    console.log(localStorage)
                    this.$router.push("/login");
                })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style>
</style>