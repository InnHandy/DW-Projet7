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
          <div class="col-6">
              <h2>Connectez-vous et profitez des derniers messages !</h2>
              <form v-on:submit.prevent="login" id="form-login" >
                <div class="form-group">
                    <label for="email">E-mail :</label>
                    <input type="email" id="email" name="email" class="form-control" required v-model="inputLogin.email"/>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" class="form-control" required v-model="inputLogin.password"/>
                </div>   
                <button type="submit" class="btn btn-primary">Connect</button>                                     
              </form>      
              <div class="col-6"><p>Pas encore inscrit ? <router-link to="/signup">Rejoignez-nous !</router-link></p></div>
            </div>
    </div>
</div>
</template>


<script>
export default {
    name: 'Login',
    data() {
        return {
            inputLogin: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            let loginDatas = {
                "email": this.inputLogin.email,
                "password": this.inputLogin.password
            }
            console.log(loginDatas)
            let url = "http://localhost:3000/api/users/login"
            let options = {
                method: "POST",
                body: JSON.stringify(loginDatas),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    console.log(res);
                    if (res.userId && res.token) {
                        localStorage.setItem("userId", res.userId)
                        localStorage.setItem("token", res.token)
                        localStorage.setItem("is_Admin", res.is_Admin)
                       // localStorage.setItem("isAdmin", res.isAdmin);
                        console.log(localStorage)
                        this.$emit('userHasSignin')
                        this.$router.push("listposts");
                        alert("Bienvenue sur Groupomania Connect ! Connectez-vous dès à présent !");
                    } else {
                        alert(" Mot de passe incorrect ! ");
                    }
                })
                .catch(error => console.log(error))
        }
    }
}
</script>

<style>
</style>