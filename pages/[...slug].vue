<template>
    <NuxtLayout :name="theme" :doc="doc" />
</template>
<script setup lang="ts">
const route = useRoute()
const { data: doc } = await useAsyncData(route.path, async () => {
    return await queryContent('').where({ _path: route.path }).findOne()
})

const config = useAppConfig()
let theme = `themes-${config.theme}-default`

if (doc.value?.layout) {
    theme = doc.value.layout
}

if (doc.value?.redirect_to_domain) {
    const redirect = doc.value?.redirect_to_domain + doc.value?._path
    useHead({
        script: [
            {
                innerHTML: `window.location = "${redirect || '/'}"`,
            },
        ],
    })
}
if (doc.value?.redirect_to_full_url) {
    const redirect = doc.value?.redirect_to_full_url
    useHead({
        script: [
            {
                innerHTML: `window.location = "${redirect || '/'}"`,
            },
        ],
    })
}

onMounted(() => {
    useYoutubeTwitterEnhancer('nuxtContent')
})

onMounted(() => {
    const images = document.querySelectorAll('.prose img')

    images.forEach((img) => {
        const captionText = img.alt
        const captionElement = document.createElement('div')
        captionElement.textContent = captionText
        captionElement.classList.add(
            'text-sm',
            'text-center',
            'text-gray-600',
            'mt-1',
        )
        img.parentNode?.insertBefore(captionElement, img.nextSibling)
    })
})

if (doc.value) {
    useContentHead(doc.value)
}

const url = useAppConfig().url.replace(/\/$/, '')
const postLink = url + doc.value?._path

useHead({
    meta: [
        { key: 'og:type', name: 'og:type', content: 'article' },
        {
            key: 'og:url',
            name: 'og:url',
            content: postLink,
        },
        { name: 'twitter:text:title', content: doc.value?.title },
        { name: 'twitter:card', content: 'summary' },
        {
            name: 'article:article:tag',
            content: doc.value?.tags ? doc.value.tags?.toString() : '',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: postLink,
        },
    ],
})

if (doc.value?.alternates) {
    const alternates =
        doc.value?.alternates?.map((alternate: any) => {
            const key = Object.keys(alternate)[0]
            const value = alternate[key]
            return {
                rel: 'alternate',
                href: value,
                hreflang: key,
            }
        }) || []

    alternates.push({
        rel: 'alternate',
        href: postLink,
        hreflang: doc.value?.language || 'en',
    })

    useHead({
        link: alternates,
    })
}

if (doc.value?.cover) {
    useHead({
        meta: [
            {
                key: 'og:image',
                name: 'og:image',
                content: url + '/images/' + doc.value?.cover,
            },
            { name: 'og:image:alt', content: doc.value?.title },
            {
                name: 'twitter:image',
                content: url + '/images/' + doc.value?.cover,
            },
        ],
    })
}

if (doc.value?.date) {
    useHead({
        meta: [
            {
                name: 'article:published_time',
                content: new Date(doc.value?.date).toISOString(),
            },
            {
                name: 'article:modified_time',
                content: new Date(doc.value?.modified ? doc.value?.modified : doc.value?.date).toISOString(),
            },
        ],
    })
}
</script>
