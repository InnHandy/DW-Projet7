<template>
  <div class="menu">
    <nav>
        <h1>logo groupomania</h1>
        <ul>
        <li><a href=#>Accueil</a></li>
        <li><a href=#>A propos</a></li>
        <li><a href=#>Cpntact</a></li>
        <li><a href=#>idée 1</a></li>
        <li><a href=#>idée 2</a></li>
        </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'menu',
  props: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
