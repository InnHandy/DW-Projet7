<template>
    <div class="container">
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
              <router-link to="/listposts">
                <button class="btn btn-success" type="button">Retour</button>
              </router-link>
          </div>
      </div>
<br>
        <br>
        <br>
<div class="row">    
          <div class="col-md-12">
              <h2>Gestion du compte de {{id }}</h2>
              <div class="row">
                  <div class="col-md-12">
                    <h4>Etes-vous administrateur ? {{ is_Admin }} </h4>
                  </div>
              </div>
              <br>
          </div>
          </div>
</div>

     
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
       id: localStorage.getItem("userId"), 
       is_Admin: localStorage.getItem("is_Admin")
    }
  },
  components: {

  },
  methods : {
    deconnect(){
     localStorage.clear();
     this.$router.push('/') 
    },
  }
}
</script>

<style>

</style>