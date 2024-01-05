<template>
    <div class="newparty h-screen flex items-center justify-center">
     
        <PartyForm :party="{}" page="newparty" btnText="Criar Festa"/>
      
    </div>
  </template>
  

  

<script>
import PartyForm from "../components/PartyForm.vue"

export default{
    components:{
        PartyForm
    }
}
</script>