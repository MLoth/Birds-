<template>
    <div class="flex justify-between h-24 items-center">
        <div class="w-16 h-16 mt-4 ml-4 hover:animate-spin">
            <router-link to="/">
                <Logo class="w-max h-max"/>
            </router-link>
        </div>
        <div class="flex justify-end w-full gap-12 mr-8 font-bold">
            <p class="hover:text-neutral-600">
                <router-link to="/">
                    Home
                </router-link>
            </p>
            <p class="hover:text-neutral-600">
                <router-link to="/birds">
                    Vogels
                </router-link>
            </p>
            <p class="hover:text-neutral-600">
                <router-link to="/log">
                    Logboek
                </router-link>
            </p>
            <p class="hover:text-neutral-600">
                <router-link to="/observations">
                    Observaties
                </router-link>
            </p>
            <p class="hover:text-neutral-600">
                <router-link to="/account">
                    {{ user?.displayName }}
                </router-link>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import useAuthentication from '../../composables/useAuthentication';
    import Logo from './logo.vue';

    export default {
    setup() {
        const { user } = useAuthentication();
        return { user, Logo };
    },
    components: {
        Logo
    }
}
</script>