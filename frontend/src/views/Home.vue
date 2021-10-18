<template>
    <div class="container col-xl-12 col-md-12">
        <header class="col-xl-12">
            <Header/>
        </header>
        <main>
            <section>
                <AddNewPost/>
            </section>
            <section>
                <Posts/>
            </section>
        </main>
        <footer>
            <Footer/>
        </footer> 
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AddNewPost from '@/components/Posts/AddNewPost.vue'
import Posts from '@/components/Posts/Posts.vue'

    export default {
        name: 'Home',
        components: {
            Header,
            AddNewPost,
            Posts,
            Footer
        }
    }
</script>
