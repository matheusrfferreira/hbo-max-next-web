module.exports = {
    images: {
        domains: ['m.media-amazon.com'],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/movies',
                permanent: true,
            },
        ]
    },
}