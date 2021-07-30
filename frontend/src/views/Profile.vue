<template>
  <div>
    <header>
      <Header/>
    </header>
    <main class="container col-12">
        <section class="row py-3 px-4">
            <div class="col-md-8 mx-auto">
                <div class="bg-white shadow rounded overflow-hidden">

                </div>
            </div>
        </section>
    </main>
    <footer>
        <Footer/>
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