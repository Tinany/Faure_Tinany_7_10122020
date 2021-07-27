<template>
    <div>
        <div>
            <Header/>
        </div>
        <main>
            <section>
                <AddNewPost/>
            </section>
            <section>
                <Post/>
            </section>
        </main>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import AddNewPost from '@/views/AddNewPost.vue'
import Post from '@/views/Post.vue'

    export default {
        name: 'Home',
        components: {
            Header,
            AddNewPost,
            Post
        }
    }
</script>