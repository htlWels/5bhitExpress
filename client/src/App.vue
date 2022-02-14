<template>
<div>
    <Header 
    :errorMessage="errorMess"
    v-if="loginState==false"
    />
    
    <!-- <Stundenplan 
        v-if="loginState"
      
    /> -->

    <NavigationBar
      v-if="loginState"
      @showStammdatenVerwaltung="showStammdatenverwaltung"
      @showSessions="showSessions"
      @showHtlWels="showHtlWels"

    />  

    <Login 
      v-else 
         @loginDone="loginEnabled"   
     />

     <Stammdatenverwaltung
      v-if="StammdatenverwaltungState && loginState"

      />
    
</div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import Stammdatenverwaltung from './components/Stammdatenverwaltung.vue'
//import Stundenplan from './components/Stundenplan.vue'
import Header from './components/Header.vue'
import Login from './components/Login.vue'
import {ref} from 'vue'

export default {
  name: "App",
  components: {
    NavigationBar,
    Stammdatenverwaltung,
    //Stundenplan,
    Header,
    Login
  },
  setup() {

    let errorMess=ref('')
    let loginState = ref(false)
    let StammdatenverwaltungState = ref(true)

    function showStammdatenverwaltung() {
      console.log("App: Show Stammdatenverwaltung")
      StammdatenverwaltungState.value=true
    }

    function showSessions() {
      console.log("App: Show Sessions")
      StammdatenverwaltungState.value=false
    }

    function showHtlWels() {
      console.log("App: Show Htl Wels")
      StammdatenverwaltungState.value=false
    }

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
      loginEnabled,
      showStammdatenverwaltung,
      StammdatenverwaltungState,
      showSessions,
      showHtlWels
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
