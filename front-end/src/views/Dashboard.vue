<template>
    <div class="dashboard min-h-screen flex flex-col items-center justify-center ">
      <div class="content ">
        <h1 class="title text-white text-4xl font-bold mb-8">Gerencie seus eventos</h1>
        <router-link to="/newparty" class="btn bg-Trippant-3-hex text-white px-4 py-2 rounded-md">Cadastrar festa</router-link>
  
        <div v-if="parties.length > 0" class="mt-8">
         <DataTable :parties="parties"/>
          <!-- Aqui viria a tabela de festas, se existirem -->
        </div>
  
        <div v-else class="mt-8">
          <h2 class="text-white text-2xl font-semibold mb-4">Sem festas cadastradas</h2>
          <p class="text-Trippant-1-hex mb-4">Clique no botão abaixo para cadastrar uma festa:</p>
          <router-link to="/newparty" class="btn bg-Trippant-3-hex text-white px-4 py-2 rounded-md">Cadastrar festa</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  import DataTable from '@/components/DataTable.vue';
  export default {
    data() {
      return {
        parties: [
            
        ],
      };
      
    },
    created(){
      this.getParties()
    },
    methods:{
      async getParties(){
        // get token from store


        const token = this.$store.getters.token

        await fetch("http://localhost:3000/api/party/userparties",{
          method:"GET",
          headers:{
            "Content-type":"application/json",
            "auth-token":token,

          }

        })
        .then((response)=>response.json())
        .then((data)=>{
          this.parties = data.parties
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    },
    components:{
      DataTable
    }
  };
  </script>
  
  <style>
  
  .dashboard .content {
    padding: 20px; 

  
  }
  </style>
  