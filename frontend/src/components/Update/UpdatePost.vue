<template>
    <div>
        <header>
            <Header/>
        </header>
        <main>
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: { Header, Footer },
    name: "UpdatePost"
}
</script>