<template>
<div>
    <ul>
        <li><a href="#" @click="showStammdatenVerwaltung">Stammdatenverwaltung</a></li>
        <li><a href="#" @click="showSessions">Session</a></li>
        <li><a href="#" @click="showHtlWels">HTL Wels</a></li>
    </ul>

  {{text}}

</div>
</template>

<script>
import axios from 'axios'
import {ref} from 'vue'
export default {

    setup(props, context) {
        let text = ref('')

        function showSessions() {
            console.log("Show Sessions")
            context.emit("ShowSessions")
            axios.get('/sessions').then(response => (text.value = response.data))
        }

        function showHtlWels() {
          console.log("Show Htl Wels")
          context.emit("ShowHtlWels")
          axios.get('/htlwels').then(response => (text.value = response.data))
        }

        function showStammdatenVerwaltung() {
          console.log("Show Stammdatenverwaltung")
          text.value=''
          context.emit('showStammdatenVerwaltung')
        }

        return {
            showSessions,
            showHtlWels,
            showStammdatenVerwaltung,
            text
        }
    }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}
</style>