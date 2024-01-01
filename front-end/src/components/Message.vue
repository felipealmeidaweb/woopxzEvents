<template>
    <p class="msg" :class="msgClass" v-if="msg">{{ msg }}</p>
</template>

<script>
  export default{
    name:"Message",
    props:[
        "msg",
        "msgClass"
    ]
  }
</script>

<style scoped>
 .msg{
   
    color: white;
    max-width: 300px;
    margin: 20px auto;
    padding: 20px;
    text-align: center;
    border: 1px solid white;
    border-radius: 8px;
 }
 .success{
    border: 1px solid rgb(61, 209, 61);
    color: rgb(61, 209, 61);;
 }
 .error{
    border: 1px solid red;
    color: #F23535;
 }
</style>