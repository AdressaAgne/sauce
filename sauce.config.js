module.exports = {
    precompile: true,
    title: 'Agne Ødegaard - Curriculum Vitae',
    sizes: [480, 680, 1080, 1280, 1680, 1920],
    meta: [
        {
            name: 'description',
            content: 'Agne Ødegaard - Curriculum Vitae'
        }, {
            name: 'theme-color',
            content: '#356cc5'
        }
    ],
    links: [
        {
            'rel': 'stylesheet',
            'href': '/css/main.css'
        }, {
            'rel': 'apple-touch-icon',
            'href': '/assets/apple-touch-icon.png'
        }, {
            'rel' : 'icon',
            'type' : 'image/png',
            'href' : '/assets/apple-touch-icon.png'
        }
    ],
    server: {
        port: 1337
    },
    env: {

    }
}