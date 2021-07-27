<template>
  <div>
    <div>
      <Header />
    </div>
    <main class="container col-12">
        <section class="row py-3 px-4">
            <div class="col-md-8 mx-auto">
                <div class="bg-white shadow rounded overflow-hidden">
                    <div class="profile mr-3">
                        <img src="https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="..." width="130" class="rounded mb-2 img-thumbnail"/>
                        <div>
                            <h4 class="mt-0 mb-0">User</h4>
                            <p class="small mb-4">City</p>
                        </div>
                        <a href="#" class="btn btn-outline-dark btn-sm btn-block">Edit profile</a>
                    </div>
                    <div class="px-4 py-3">
                        <h5 class="mb-0">About</h5>
                        <div class="p-4 rounded shadow-sm bg-light">
                            <p class="font-italic mb-0">Web Developer</p>
                            <p class="font-italic mb-0">Lives in </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Profile",
  components: {
    Header,
  },
};
</script>

<style scoped>

body {
  background: #654ea3;
  background: linear-gradient(to right, #e96443, #904e95);
  min-height: 100vh;
  overflow-x: hidden;
}
</style>