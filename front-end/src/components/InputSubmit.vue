<template>
    <input class="bg-Trippant-2-hex text-Trippant-4-hex hover:cursor-pointer rounded-lg py-2 px-4 hover:bg-opacity-80 transition duration-300 hover:bg-Trippant-4-hex hover:text-white" type="submit" :value ="text">
</template>

<script>
export default{
    name:"InputSubmit",
    props:{
        text:""
    }
}
</script>