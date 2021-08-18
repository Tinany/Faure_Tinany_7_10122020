<template>
    <div class="container col-xl-12 col-md-12">
        <header class="col-xl-12">
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
        name: 'Home',
        components: {
            Header,
            Footer
        }
    }
</script>