<template>
        <nav class="navbar navbar-expand-lg navbar-light row">
            <ul class="navbar-nav col-md-12 col-xl-12 col-sm-12">
                <li class="nav-item mr-md-3">
                    <router-link to="/Home" class="nav-link small-margin mt-md-3 mt-lg-3 mt-xl-3 font-weight-bold h5">Accueil</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Profile" class="nav-link mt-md-3 mt-lg-3 mt-xl-3 font-weight-bold h5">Profile</router-link>
                </li>
                <li class="nav-item mx-auto recenter visibility">
                    <router-link to="/Home" class="font-weight-bold text-danger nav-link h3 mt-md-1 mt-lg-2 mt-xl-2">
                        <img src="../assets/icon.png" width="50" height="50" alt="">
                        Groupomania
                    </router-link>
                </li>
                <li class="nav-item">
                    <button class=" btn nav-link mt-md-3 mt-lg-3 mt-xl-3 font-weight-bold h5 logout" @click="LogOut()">Déconnexion</button>
                </li>
            </ul>
        </nav>
        
</template>

<script>
    export default {
        name: 'Header',

        methods: {
            LogOut() {
                localStorage.clear(),

                this.$router.push({
                    name: 'Login'
                    })
            }
        }
    }
</script>

<style scoped>

    .navbar-nav {
        padding: 0;
    }
    @media only screen and (max-width: 992px) {
        .navbar-nav {
            flex-direction: row;
        }
    }

    @media only screen and (min-width: 1800px) {
        .recenter {
            margin-left: 32%!important;
        }
    }

    @media only screen and (min-width: 460px) and (max-width: 767px) {
        .nav-link {
            font-size: 17px;
        }
        .recenter, .logout {
            margin-top: -3%;
        }
        .small-margin {
            margin-right: 10px;
        }
    }

    @media only screen and (max-width: 459px) {
        .nav-link {
            font-size: 17px;
        }
        .navbar-nav {
            flex-direction: column;
        }
        .visibility {
            display: none;
        }
    }
</style>