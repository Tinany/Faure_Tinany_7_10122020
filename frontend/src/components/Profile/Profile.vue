<template>
  <div class="container col-xl-12 col-md-12">
    <header class="col-xl-12">
      <Header/>
    </header>
    <main>
      <div class="row py-5 px-4">
        <div class="col-md-5 mx-auto">
          <div class="bg-white shadow rounded overflow-hidden">
            <div class="px-4 pt-0 pb-4 cover">
                <div class="media align-items-end profile-head">
                  <div class="profile mr-3">
                    <img v-bind:src=" userDatas.profile_picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'" alt="photo de profil" width="130" class="rounded mb-2 img-thumbnail">
                    <button href="" class="btn btn-outline-dark btn-sm btn-block" @click="showUpdateProfilePage()">Edition du profil</button>
                  </div>
                  <div class="mb-5 text-white" id="name">
                      <h4>{{ userDatas.first_name }} {{ userDatas.last_name }}</h4>
                      <p class="mb-4">{{ userDatas.city }}</p>
                  </div>
                </div>
            </div>
            <div class="bg-light p-5 d-flex justify-content-end text-center">
            </div>
          </div>
      <div v-if="userDatas.moderator !== 0">
        <button class="btn btn-danger btn-sm btn-block" @click="showUserListPage()">
          Liste des utilisateurs
        </button>
      </div>
        </div>
      </div>
    </main>
    <footer>
        <Footer class="fixed-bottom"/>
    </footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Profile",
  components: {
    Header,
    Footer
  },

  data() {
    return {
      userDatas: {}
    }
  },

  mounted() {

      this.userDatas = JSON.parse(localStorage.getItem("user"))
  },

  methods : {

    showUpdateProfilePage() {
      this.$router.push({
          name: 'UpdateProfile'
          })
    },
    showUserListPage() {
      this.$router.push({
          name: 'UsersList'
          })
    }
  }
};
</script>

<style scoped>
.profile-head {
    transform: translateY(5rem)
}

.cover {
    background-color:rgb(33,52,82);
}

body {
    background: #654ea3;
    background: linear-gradient(to right, #e96443, #904e95);
    min-height: 100vh;
    overflow-x: hidden
}
</style>