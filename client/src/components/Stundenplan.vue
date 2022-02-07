<template>
    <div>
        <h1>Template </h1>
    </div>
</template>



<script>
//import {ref} from "vue"

export default {
    name: "Foo",
   
    

     setup() {

     
        return {
           
           
        }
    } 
    
}
</script>



<style scoped>

#header,#option {
    display: flex;
    flex-wrap: wrap;
    align-items:baseline;
    justify-content: center;
    
}
#header h3 {
    margin-left: 10px;
}
#block {
    margin-top: 50px;
    margin-left: 100px; 
    text-align: left;
}

ul {
    list-style: none;
}

table {
    width: 100%;
}

#option .item {
    margin-left:10px;
}
</style>