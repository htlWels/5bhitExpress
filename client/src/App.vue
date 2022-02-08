<template>
<div>
    <Header 
    name="Refr"
    :errorMessage="errorMess"/>
    
    <Stundenplan 
        v-if="loginState"
      
    />
    <Login 
      v-else 
         @loginDone="loginEnabled" 
        
     />
    
</div>
</template>

<script>
import Stundenplan from './components/Stundenplan.vue'
import Header from './components/Header.vue'
import Login from './components/Login.vue'
import {ref} from 'vue'



export default {
  name: "App",
  components: {
    Stundenplan,
    Header,
    Login
  },
  setup() {

    let errorMess=ref('')
    let loginState = ref(false)
   

    function loginEnabled(loginDone) {
      if (loginDone === 'Login done')
        loginState.value=true
      else if (loginDone === 'Password not valid') 
        errorMess.value="Password not valid"
      else if (loginDone === 'User not known')
        errorMess.value="User not known"
      else
        errorMess.value=loginDone
    }


    return {
      errorMess,
      loginState,
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px; */
}
</style>
