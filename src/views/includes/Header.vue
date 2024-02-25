
<script setup>
import {auth} from '@/compossables/auth.js'
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
const  {authHeader,base_url} = auth()
const router = useRouter()
const details=ref('')
const   userDetails = async () => {

  const res = await axios.get(base_url.value + 'user', authHeader)
  if (res.status === 200) {
    details.value = res.data
  }
}
function logOut(){
  localStorage.removeItem('token')
  router.push('/login')
}
onMounted(()=>{
  userDetails()
})
</script>

<template>
  <div style="background-color: rgb(100,170,255);" class="head-title d-flex justify-content-around align-items-center">
  <div class="d-flex  align-items-center">
    <i style="font-size: 34px; color: blue;" class="bi  bi-building-fill-lock"></i>
    <router-link to="/" class="text-uppercase text-white  text-decoration-none">Evidence management system</router-link>
  </div>

    <div v-if="details" class="links">
      <router-link to="/about_us"  class="mybtn text-white mx-2  text-uppercase text-decoration-none">About Us</router-link>
      <router-link to="/dashboard/super_admin" v-if="details.role=='super_admin'" class="mybtn text-white mx-2   text-uppercase text-decoration-none">Dashboard</router-link>
         <router-link to="/dashboard/admin" v-else-if="details.role=='admin'" class="mybtn text-white mx-2  text-uppercase text-decoration-none">Dashboard</router-link>
          <button @click="logOut()" class="btn text-white mx-2  text-uppercase text-decoration-none">Logout</button>
    </div>
    <div v-else class="">
      <router-link to="/about_us"  class="mybtn text-white mx-2  text-uppercase text-decoration-none">About Us</router-link>

      <router-link to="/login" class="mybtn text-white mx-2  text-uppercase text-decoration-none">Login</router-link>
    </div>
  </div>
</template>


<style scoped>
.mybtn{
  padding: 1rem;
}
.mybtn:hover{
  background-color: blue;
  color: black;
}

</style>