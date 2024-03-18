
<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {auth} from "@/compossables/auth";
import Header from "@/views/includes/Header.vue";
const {base_url,authHeader} = auth()
const router = useRouter()
const route = useRoute()



const email = ref('')
const otp = ref('')
const password = ref('')
const c_password = ref('')
const status = ref('')
email.value = route.params.email
otp.value = route.params.otp

const ResetPassword =async () => {
  if(password.value==''){
    status.value = 'password is Required'
  }
  if(password.value !== c_password.value){
    status.value = 'Password must be the same'
  }
  const formData = new FormData();
  formData.append('email', email.value)
  formData.append('otp', otp.value)
  formData.append('password', password.value)
  const res = await axios.post(base_url.value+'auth/finish_reset',formData)
  if(res.status=== 200) {
    if (res.data.status === 'success') {
      await router.push('/login')
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
  <h2 v-if="status" class="p-3 m-4 bg-danger text-white text-center">{{ status }}</h2>

  <section class="vh-100">
    <div class="row px-3 d-flex justify-content-center align-items-center h-100">

      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="error text-center bg-danger text-white text-uppercase p-2" v-if="regerror">{{regerror + ' !'}}</div>

        <div class="error text-center bg-danger text-white text-uppercase">{{unique_id}}</div>
        <h2 class="text-center text-uppercase">Reset Password Here</h2>
        <form @submit.prevent="ResetPassword">

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">New Password</label>
            <input type="password" class="form-control" v-model="password">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" v-model="c_password">
          </div>
          <div class="">
            <button type="submit" class="w-100 btn btn-primary btn-block">Reset Password</button>
          </div>

        </form>
      </div>

    </div>

  </section>
</template>

<style scoped>

</style>

