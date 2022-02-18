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
                <h2>Gestion du compte de {{ userAccount.firstname }} {{ userAccount.lastname }}</h2>
                <button @click="deleteAccount" class="accountbutton">Supprimez votre compte</button>  
            </div> 
            </div> 
    </div>
</template>

<script >

export default {
    name: 'Account',
    
    data() {
        return {
            userAccount: {
                userId: localStorage.getItem("userId"),
                firstname: "",
                lastname: "",
                createdAt: "",
                jobtitle: ""
            },
            inputAccount: {
                lastname: "",
                firstname: "",
                jobtitle: ""
            }
        }
    },
    mounted() {
        let url = `http://localhost:3000/api/auth/${ this.userAccount.userId }`;
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.userAccount.firstname = data.firstname;
                this.userAccount.lastname = data.lastname;
                this.userAccount.createdAt = data.createdAt;
                this.userAccount.jobtitle = data.jobtitle;
            })

            .catch(error => console.log(error))
    },

    methods: {
        getOneAccount() {
            let url = `http://localhost:3000/api/auth/${ this.userAccount.userId }`;
            let options = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.userAccount.firstname = data.firstname;
                    this.userAccount.lastname = data.lastname;
                    this.userAccount.jobtitle = data.jobtitle;
                })
                .catch(error => console.log(error))
        },

        deleteAccount() {
            let url = `http://localhost:3000/api/auth/${ this.userAccount.userId }`;
            let options = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    localStorage.clear();
                    alert("Suppression du compte confirmée ! 😢");
                })
                .then(this.$router.push("/signup"))
                .catch(error => console.log(error))
        },
    },
} 
</script>

<style lang="css">

</style>