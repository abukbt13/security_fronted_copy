

<script setup>

import {auth} from "@/compossables/auth";
const {base_url} = auth()
import axios from "axios";
import {ref} from "vue";

const email = ref('')
const phone = ref('')
const name = ref('')
const status = ref('')
const message = ref('')
const inquire =async () => {
  const formData = new FormData();
  formData.append('email', email.value)
  formData.append('name', name.value)
  formData.append('phone', phone.value)
  formData.append('message', message.value)
  const res = await axios.post(base_url.value+'user/inquire',formData)
  alert(res)
  if(res.status === 200) {
    if (res.data.status === 'success') {
      status.value = 'Feedback successfully sent will respond to you sooner'
    } else {
      status.value = res.data.message
    }
  }
}
</script>

<template>
  <div style="background-color: rgb(100,170,255)" class="row p-3">
    <h2 v-if="status" class="p-3 m-4 bg-danger text-white">{{ status }}</h2>

    <div class="col col-6">
      <h3 class="shadow text-white">TOPGUARD CLOUD</h3>
      <p>
        Your secure forensic cloud for your data.
      </p>
    </div>

    <div class="col">
        <p style="font-size: 21px;color: black;">Quick links</p>



      <router-link to="login"  class="mybtn text-decoration-none text-light">
      <li class="list-unstyled ">
         Login
      </li>
        <br>
      </router-link>
      <router-link to="login"  class="mybtn text-decoration-none text-light">
      <li class="list-unstyled ">
         Register
      </li>
        <br>
      </router-link>
      <router-link to="login"  class="mybtn text-decoration-none text-light">
      <li class="list-unstyled ">
         Dashboard
      </li>
      </router-link>
      <br>
      <router-link to="login"  class="mybtn text-decoration-none text-light">
      <li class="list-unstyled ">
         About us
      </li>
      </router-link>
      <br>
      <router-link to="login"  class="mybtn text-decoration-none text-light">
      <li class="list-unstyled ">
         Contacts
      </li>
      </router-link>
      <br>


    </div>
    <div class="col">
      <h2>Contact Us</h2>

      <form @submit.prevent="inquire">

        <label for="email">Name:</label>
        <input type="email" v-model="name" class="form-control" required>
        <label for="email">Email:</label>
        <input type="email" v-model="email" class="form-control" required>

        <label for="email">Phone:</label>
        <input type="number" v-model="phone" class="form-control"  required>


        <label for="message">Message:</label>
        <textarea id="message" v-model="message" class="form-control"  rows="4" required></textarea>

        <button type="submit" name="inquire" class="float-end">Send</button>
      </form>

    </div>

  </div>
</template>

<script>

</script>

<style scoped>
li{
  padding: 0.5rem 1rem;

}
li:hover{
  background-color: blue;
  color: white;
}
input{
  display: block;
  width: 100%;
}
textarea {
  border-top-left-radius:20%;
  border-bottom-right-radius:24%;
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

</style>