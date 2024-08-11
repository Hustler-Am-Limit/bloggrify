<template>
    <div class="flex flex-col min-h-screen">
        <NuxtPage />
    </div>
</template>
<script setup lang="ts">
import {useAnalytics} from '~/composables/useAnalytics'

const config = useAppConfig()

useAnalytics()

useHead({
    htmlAttrs: {
        lang: config.language,
    },
    link: [
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
    ],
});
</script>

<!-- !! Hier Design Einstellungen von Markdown !! -->

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Apply styles to all <a> tags within .prose */
.prose a {
    /* text-decoration: none; */
    /* font-weight: 500; */
}

/* Override styles for <a> tags under any heading within .prose */
.prose h1 a,
.prose h2 a,
.prose h3 a,
.prose h4 a,
.prose h5 a,
.prose h6 a {
    text-decoration: none;
}

/* Styles for images within .prose */
.prose img {
    max-width: 80%;
    margin: auto;
}

.prose video {
    max-width: 80%;
    margin: auto;
}

/*.prose {
    a {
        //text-decoration: none;
        font-weight: 500;
    }

    img {
        max-width: 80%;
        margin: auto;
    }
}*/

.katex-html {
    display: none;
}

.dark .pieTitleText,
.dark .titleText,
.dark .sectionTitle,
.dark  .legend text,
.dark  .legend tspan,
.dark  .tick text,
.dark .messageText,
.dark .loopText tspan  {
    fill: white !important;
}
.dark .messageLine0, .dark .messageLine1 {
    stroke: #d9d9d9 !important;
}
</style>
