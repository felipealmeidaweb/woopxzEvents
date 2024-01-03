<template>
    <div class="profile">
        <UseForm :user="user" page="profile" btnText="Edite seu perfil" title="Edite seu perfil" :key="componentKey"/>
    </div>
</template>

<script>
import UseForm from '../components/UseForm.vue';
export default{
    name:"Profile",
    components:{
        UseForm
    },
    data(){
        return{
            user:{},
            componentKey:0
        }
    },
    created(){
        //load user 

        this.getUser()
    },
    methods:{
        async getUser(){
           // id from ytoken
       const id = this.$store.getters.userId;
       const token = this.$store.getters.token
       
       
       await fetch(`http://localhost:3000/api/user/${id}` ,{
        method:"GET",
        headers:{
            "Content-type":"application/json",
            "auth-token":token
        }
       } )
       .then((response)=>response.json())
       .then((data)=>{



          this.user = data.user,
          this.componentKey += 1

          
       })
       .catch((err)=>{
        console.log(err)
       })
    },
    
    }
}
</script>