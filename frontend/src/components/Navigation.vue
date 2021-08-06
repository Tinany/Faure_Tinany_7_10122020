<template>
    <div v-if="Login" class="row">
      <Login v-if="Login" />
    </div>
    <div v-if="SignUp" class="row">
      <SignUp v-if="SignUp" />
    </div>
    <router-view/>
</template>

<script>
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'

    export default {
        name: 'Navigation',
        components: {
            Login,
            SignUp
        },

        data() {
            return {
                Login: false,
                SignUp: false
            }
        }
    }
</script>
