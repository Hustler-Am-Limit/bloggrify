<template>
    <div class="flex flex-col min-h-screen">
        <NuxtPage />
    </div>
</template>
<script setup lang="ts">
const config = useAppConfig();

useHead({
    link: [
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
    ],
});
</script>

<!-- !! Hier Design Einstellungen von Markdown !! -->

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.prose {
    a {
        //text-decoration: none;
        font-weight: 500;
    }

    img {
        max-width: 80%;
        margin: auto;
    }
}
</style>
