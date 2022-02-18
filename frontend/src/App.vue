<template>
  <div class="container" @click="true">
         <div class="row">
          <div class="col-8">
              <header>
                <img src="./assets/icon-above-font.png" class="img-fluid" alt="Responsive image" style="width:100px">
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
        <div class="col-1">
              <router-link to="/account">
                <button class="btn btn-success" type="button">account</button>
              </router-link>
          </div>
          <div class="col-1">
              <router-link to="/login">
                <button class="btn btn-success" type="button">signup</button>
              </router-link>
          </div>
          <div class="col-1">
              <router-link to="/listposts">
                <button class="btn btn-success" type="button">listposts</button>
              </router-link>
          </div>
          <div class="col-1">
              <router-link to="/listposts/:id">
                <button class="btn btn-success" type="button">post</button>
              </router-link>
          </div>
          <div class="col-1">
              <router-link to="/createpost">
                <button class="btn btn-success" type="button">createpost</button>
              </router-link>
          </div>
          <div class="col-1">
              <router-link to="/listposts/:id/listcomments">
                <button class="btn btn-success" type="button">listcomments</button>
              </router-link>
          </div>
          <div class="col-1">
              <router-link to="/listposts/:id/:comment_id">
                <button class="btn btn-success" type="button">comment</button>
              </router-link>
          </div>
          <div class="col-1">
              <router-link to="/listposts/:id/createcomment">
                <button class="btn btn-success" type="button">createcomment</button>
              </router-link>
          </div>
      </div>
      <router-view></router-view>
  </div>
</template>
 

<script>
export default {
  name: 'App',
}
</script>

<style>
</style>