<script setup>
import Header from "@/views/includes/Header.vue";
import Footer from "@/views/includes/Footer.vue";
import {onMounted, ref} from "vue";
import axios from "axios";

document.title='dashboard'
import {auth} from "@/compossables/auth";
const {authUser,authHeader,base_url,storage} = auth()
const email = ref('')
const name = ref('')
const password = ref('')
const logs = ref([])
const admins = ref([])
const cases = ref([])
const secret_keys = ref([])
const inquiries = ref([])
const edit =ref(true)
const status =ref('')
const user_id =ref('')
const phone =ref('')

const clearFields =async () =>{
  status.value=''
  edit.value = true
  email.value = ''
  name.value = ''
  phone.value = ''
  password.value=''
}

const createAdmin =async () => {

  const formData = new FormData();
  formData.append('email', email.value)
  formData.append('name', name.value)
  formData.append('phone', phone.value)
  formData.append('password', password.value)
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#\$%\^&\*])(?=.{8,})/;
  const isValidPassword = regex.test(password.value);

  if(edit.value === true) {
    if (!isValidPassword) {
      // Handle invalid password here, maybe show an error message
      status.value='Create a strong password eight characters long and combination of symbols, numbers and different cases';
      return;
    }
   else {
      // alert('creating new')
      const res = await axios.post(base_url.value+'admin/create',formData,authHeader)
      if(res.status === 200) {
        if(res.data.status === 'success'){
          status.value='Admin successfully created'
          clearFields()
          getlogs()
          getAdmins()
          getCases()
        }
        else {
          status.value=res.data
        }
      }
    }
  }
  else {

      // alert('editing')
      const res = await axios.post(`${base_url.value}admin/edit/${user_id.value}`, formData, authHeader);
      if(res.status === 200) {
        if(res.data.status === 'success'){
          status.value='Admin edited successfully'
          clearFields()
          getlogs()
          getAdmins()
          getCases()
        }
        else {
          status.value=res.data
        }
      }
    }



}

const getlogs = async () =>{
  const res = await axios.get(base_url.value+'log/show_logs',authHeader)
  logs.value = res.data.data
}

const getAdmins = async () =>{
  const res = await axios.get(base_url.value+'admin/show',authHeader)
  admins.value = res.data.users
}
const getSecretKeys = async () =>{
  const res = await axios.get(base_url.value+'log/show_keys',authHeader)
  secret_keys.value = res.data.secret_keys
}
const getCases = async () =>{
  const res = await axios.get(base_url.value+'admin/show_cases',authHeader)
  cases.value = res.data.cases
}
const getInquiries = async () =>{
  const res = await axios.get(base_url.value+'admin/show_inquiries',authHeader)
  inquiries.value = res.data.inquiries
}

function  secretKeyGen($id){
  case_id.value=$id
}
const isSidebarOpen = ref(false)
function showSidebar(){
  isSidebarOpen.value = isSidebarOpen.value === false ? true : false
  // document.getElementById("sidebar")
}
function resetform(){
  status.value=''
  edit.value = true
  email.value = ''
  name.value = ''
  phone.value = ''
  password.value=''
}
function editAdmin($data){
  user_id.value = $data.id
  edit.value = false
  email.value = $data.email
  phone.value = $data.phone.slice(4)
  name.value = $data.name
}
onMounted(()=>{
  authUser()
  getlogs()
  getAdmins()
  getSecretKeys()
  getCases()
  getInquiries()
})
</script>

<template>
  <div class="head-section">
    <Header />
  </div>
  <div  class="">


    <!-- Button trigger modal -->


    <!-- Modal -->
    <div class="modal fade" id="add_admin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add Forensic Analyst</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createAdmin">

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Full Name</label>
                <input type="text"  class="form-control" v-model="name">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email</label>
                <input type="email"  class="form-control" v-model="email">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Phone Number</label>
                <input type="number"  class="form-control" v-model="phone">
              </div>
              <div class="mb-3" v-show="edit">
                <label for="exampleFormControlInput1" class="form-label">Password</label>
                <input type="password" class="form-control" v-model="password" >
              </div>
              <div class="">
                <button type="submit" v-if="edit" data-bs-dismiss="modal" class="float-end  btn btn-primary btn-block">Admin</button>
                <button type="submit"  data-bs-dismiss="modal"  v-else class="float-end   btn btn-primary btn-block">Update Admin</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="view_logs" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-primary" id="staticBackdropLabel">All Logs</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div class="ms-4 table-responsive">
              <table class="table table-responsive border table-hover table-bordered">
                <!-- Table Header -->

                <tr>
                  <td class="border">#</td>
                  <td class="border">Title</td>
                  <td class="border">Details</td>
                </tr>

                <!-- Table Rows (Generated dynamically using Vue.js) -->
                <tr v-for="log in logs" :key="log">
                  <td class="border">{{ log.id }}</td>
                  <td class="border">{{ log.title }}</td>
                  <!-- <td class="border">{{ log.details }}</td> -->
                  <td class="border">{{ log.details }}</td>

                </tr>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div>
    <div class="modal fade" id="case_file" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-primary" id="staticBackdropLabel">All Cases</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div class="ms-4 table-responsive">
              <table class="table table-responsive border table-hover table-bordered">
                <!-- Table Header -->

                <tr>
                  <td class="border">#</td>
                  <td class="border">Defendant id</td>
                  <td class="border">defendant_name</td>
                  <td class="border">Plaintiff_name</td>
                  <td class="border">case_name</td>
                  <td class="border">Operation</td>
                </tr>
                <tr v-for="cases in cases" :key="case">
                  <td class="border">{{ cases.id }}</td>
                  <td class="border">{{ cases.defendant_id }}</td>
                  <td class="border">{{ cases.defendant_name }}</td>
                  <td class="border">{{ cases.plaintiff_name }}</td>
                  <td class="border">{{ cases.case_name }}</td>
                  <td class="border"><button class="btn btn-sm bg-primary">More info</button></td>

                </tr>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div>
    <div class="modal fade" id="secret_keys" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-primary" id="staticBackdropLabel">All Cases</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div class="ms-4 table-responsive">
              <table class="table table-responsive border table-hover table-bordered">
                <!-- Table Header -->

                <tr>
                  <td class="border">User Email</td>
                  <td class="border">Secret Key</td>
                  <td class="border">Case Name</td>
                  <td class="border">Description</td>
                </tr>
                <tr v-for="secret_key in secret_keys" :key="secret_key">
                  <td class="border">{{ secret_key.email }}</td>
                  <td class="border">{{ secret_key.u_key }}</td>
                  <td class="border">{{ secret_key.case_name }}</td>
                  <td class="border">{{ secret_key.description }}</td>

                </tr>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div>
    <div class="modal fade" id="inquiries" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-primary" id="staticBackdropLabel">Inquiries</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div class="ms-4 table-responsive">
              <table class="table table-responsive border table-hover table-bordered">
                <!-- Table Header -->

                <tr>
                  <td class="border">Full Name</td>
                  <td class="border">User Email</td>
                  <td class="border">Phone</td>
                  <td class="border">Message</td>
                </tr>
                <tr v-for="inquirie in inquiries" :key="inquirie">
                  <td class="border">{{ inquirie.name }}</td>
                  <td class="border">{{ inquirie.email }}</td>
                  <td class="border">{{ inquirie.phone }}</td>
                  <td class="border"><textarea name="" class="" id="" cols="30" >{{ inquirie.message }}</textarea></td>

                </tr>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div>

    <div @click="isSidebarOpen = isSidebarOpen === false ? true : false" class="d-block d-md-none d-lg-none">
      <i style="font-size: 40px; color: blue;" class="bi bi-list-task"></i>
    </div>

    <div class="bg-success" v-if="status">{{status}}</div>

    <div class="d-flex ps-3 pt-4">
      <div id="sidebar" class="sidebar d-md-block d-lg-block" :class="isSidebarOpen ? '':'d-none'">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="" id="offcanvasScrollingLabel">Dashboard</h5>
          <div @click="isSidebarOpen = isSidebarOpen === false ? true : false" class="d-block d-md-none d-lg-none">
            <i style="font-size: 40px; color: white;" class="bi bi-x-lg"></i>
          </div>
        </div>
        <div class="offcanvas-body">
          <li style="padding: 1rem;cursor: progress;font-size: 18px;" data-bs-toggle="modal" @click="clearFields()" data-bs-target="#add_admin" class="mt-3 bg-primary list-unstyled "><i class="bi  bi-plus"></i>Add Forensic Analyst</li>
          <li style="padding: 1rem;cursor: progress;font-size: 18px;" data-bs-toggle="modal" data-bs-target="#view_logs" class="mt-3 bg-primary list-unstyled "><i class="bi  bi-eye-fill"></i>View Logs</li>
          <li style="padding: 1rem;cursor: progress;font-size: 18px;" data-bs-toggle="modal" data-bs-target="#case_file" class=" mt-3 bg-primary  text-decoration-none" to="super_admin/show_admin"><i class="bi  bi-eye-fill"></i> Show Cases files</li>
          <li style="padding: 1rem;cursor: progress;font-size: 18px;" data-bs-toggle="modal" data-bs-target="#secret_keys" class=" mt-3 bg-primary  text-decoration-none" to="super_admin/show_admin"><i class="bi  bi-eye-fill"></i>show Secret Key</li>
          <li style="padding: 1rem;cursor: progress;font-size: 18px;" data-bs-toggle="modal" data-bs-target="#inquiries" class=" mt-3 bg-primary  text-decoration-none"><i class="bi  bi-eye-fill"></i>Inquiries</li>
          <hr>
        </div>
      </div>
      <div class="ms-4 table-responsive">
        <table class="table table-responsive border table-hover table-bordered">
          <!-- Table Header -->
          <tr>
            <th colspan="4" class="text-uppercase text-center">All Forensic Analysts</th>
          </tr>
          <tr>
            <td class="border">#</td>
            <td class="border">Email</td>
            <td class="border">Full Name</td>
            <td class="border">Operation</td>
          </tr>

          <!-- Table Rows (Generated dynamically using Vue.js) -->
          <tr v-for="admin in admins" :key="admin">
            <td class="border">{{ admin.id }}</td>
            <td class="border">{{ admin.email }}</td>
            <td class="border">{{ admin.name }}</td>
            <td class="border">
              <button data-bs-toggle="modal" data-bs-target="#add_admin"  @click="editAdmin(admin)" class="btn bg-primary">Edit</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <!-- Button trigger modal -->


  <!-- Modal -->
  <div class="modal fade" id="secret" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-body">
          <form @submit.prevent="getSingleCases">

            <div class="mb-3">
              <div class="d-flex justify-content-between">
                <label for="exampleFormControlInput1" class="form-label">ENTER SECRET KEY</label>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

              </div>
              <input type="text" class="form-control" v-model="secret">
            </div>
            <div class="">
              <button type="submit"  class="float-end me-5 btn btn-primary btn-block">CONTINUE</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>

</template>



<style scoped>
table{
  width: 100%;
}
.sidebar{
  height: 100Vh;
  width: 18vw;
}
@media (min-width: 300px) and (max-width: 600px) {
  .sidebar{
    position: absolute;
    top: 3.3rem;
    left: 0rem;
    z-index: 1;
    background-color: rgb(100,170,255);;
    height: 100Vh;
    width: 50vw;
    border-right: 1px solid black;
  }
}
</style>