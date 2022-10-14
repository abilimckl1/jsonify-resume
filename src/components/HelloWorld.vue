<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>To start, simply go to Jsonify your resume and upload.</h3>
    <h3>To view your uploaded JSON, at the end of URL, add '/resume/Your unique id here'</h3>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-size: 16px;
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
