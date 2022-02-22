<template>
    <div class="container">
      <div class="row">
          <div class="col-8">
              <header>
                <img src="../assets/icon-above-font.png" class="img-fluid" alt="Responsive image" style="width:100px">
              </header>
          </div>
          <div class="col-1">
              <router-link to="/">
                <button class="btn btn-success" type="button">logout</button>
              </router-link>
          </div>
          <div class="col-1">
              <router-link to="/listposts">
                <button class="btn btn-success" type="button">Retour</button>
              </router-link>
          </div>
      </div>

<div class="row">    
          <div class="col-6">
              <h2>Gestion du compte de {{id }}</h2>
              <div class="row">
                  <div class="col-12">
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
  }
}
</script>

<style>

</style>