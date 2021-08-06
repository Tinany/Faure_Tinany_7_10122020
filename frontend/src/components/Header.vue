<template>
        <nav class="navbar navbar-expand-lg navbar-light row">
            <ul class="navbar-nav col-md-12 col-xl-12">
                <li class="nav-item mr-md-3">
                    <router-link to="/Home" class="nav-link mt-md-3 mt-lg-3 mt-xl-3 font-weight-bold h5">Accueil</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Profile" class="nav-link mt-md-3 mt-lg-3 mt-xl-3 font-weight-bold h5">Profile</router-link>
                </li>
                <li class="nav-item mx-auto recenter">
                    <router-link to="/Home" class="font-weight-bold text-danger nav-link h3 mt-md-1 mt-lg-2 mt-xl-2">
                        <img src="../assets/icon.png" width="50" height="50" alt="">
                        Groupomania
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link mt-md-3 mt-lg-3 mt-xl-3 font-weight-bold h5">Déconnexion</router-link>
                </li>
            </ul>
        </nav>
</template>

<script>
    export default {
        name: 'Header'
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
    .recenter {
        margin-left: 32%!important;
    }
</style>