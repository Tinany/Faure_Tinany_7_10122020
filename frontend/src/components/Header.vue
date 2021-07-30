<template>
        <nav class="navbar navbar-expand-lg navbar-light">
            <ul class="navbar-nav align-middle col-12">
                <li class="nav-item active">
                    <router-link to="/Home" class="nav-link mt-1 font-weight-bold">Accueil</router-link>
                </li>
                <li class="nav-item col-4 mr-5">
                    <router-link to="/Profile" class="nav-link mt-1 font-weight-bold">Profile</router-link>
                </li>
                <li class="nav-item col-6 ml-5">
                    <router-link to="/Home" class="font-weight-bold text-danger nav-link h3">
                        <img src="../assets/icon.png" width="50" height="50" alt="">
                        Groupomania
                    </router-link>
                </li>
                <li class="nav-item ml-5">
                    <router-link to="/" class="nav-link mt-1 font-weight-bold">Déconnexion</router-link>
                </li>
            </ul>
        </nav>
</template>

<script>
    export default {
        name: 'Header'
    }
</script>