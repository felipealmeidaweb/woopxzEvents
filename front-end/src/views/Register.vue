<template>
  <div class="register">
    <UseForm :user="{}" page="register" btnText="Cadastrar"/>

  </div>
  
</template>

<script>
import UseForm from '@/components/UseForm.vue';
export default{
  name:"Register",
  components:{
    UseForm
  }
}

</script>