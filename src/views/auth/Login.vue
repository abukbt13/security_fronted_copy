
<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter()
const email = ref('')
const password = ref('')

import {auth} from "@/compossables/auth";
import Header from "@/views/includes/Header.vue";
const {base_url,authHeader} = auth()

const unique_id = ref(null)
const status = ref('')

const login =async () => {
  if(email.value=='' && password.value==''){
    status.value = 'Please fill all fields'
  }
  const formData = new FormData();
  formData.append('email', email.value)
  formData.append('password', password.value)
  const res = await axios.post(base_url.value+'auth/login',formData)
  if(res.status=== 200) {
    if (res.data.status === 'success') {
      localStorage.setItem('token', res.data.token);
      if(res.data.user.role == 'super_admin') {
        await router.push('/dashboard/super_admin')
      }
      else{
        await router.push('/dashboard/admin')
      }
      // const unique_id = ref(res.data.user.id);
      // await router.push('/verify/' + unique_id.value);

    }
    else if(res.data.status === 'failed') {
      status.value = res.data.message;
    }

  }else{
    status.value ="Error in network"
  }


}


</script>

<template>
  <Header />
  <section class="vh-100">
    <div class="row px-3 d-flex justify-content-center align-items-center h-100">

      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="error text-center bg-dark text-primary text-uppercase p-2" v-if="status">{{status + ' !'}}</div>

        <div class="error text-center bg-danger text-white text-uppercase">{{unique_id}}</div>
        <h2 class="text-center text-uppercase">login</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="email" placeholder="Enter your email here">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="password">
          </div>

          <div class="">
            <button type="submit" class="w-100 btn btn-primary btn-block">Login</button>
          </div>
          <p class="fs-2 mt-2">Forget Password? <router-link to="/forget_password">click here</router-link></p>
          <br>
        </form>
      </div>

    </div>

  </section>
</template>

<style scoped>

</style>

