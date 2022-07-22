const fs = require('fs');
const axios = require('axios');
const {
    parse
} = require('node-html-parser');
const path = require('path');

const urls = require('./src/App/data/projects.json');
const namify = s => s.toLowerCase()
    .replace(/\s/g, '_')
    .replace(/(\\:\\!\\?\\.)+/g, '')
    .replace(/å/g, 'aa')
    .replace(/ø/g, 'o')
    .replace(/æ/g, 'ae');

const downloadImage = async (url, name) => {
    console.log('Downloading...', url);

    try {
        const e = await axios.get(url, {
            method: 'GET',
            responseType: 'stream'
        });

        const data = e.data;
        const headers = e.headers;
        const type = headers['content-type'];
        let ext = 'jpg';
        if (type) ext = type.split('/').pop();

        const basename = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + '.' + ext;
        const filename = path.join('src', 'assets', 'images', basename);
        const writer = fs.createWriteStream(filename)

        await e.data.pipe(writer);
        return basename;
    } catch (err) {
        console.log('failed', url);
        return false;
    }
}

const init = async () => {
    let i = 0;
    for await (const item of urls) {
        const name = item.title;
        const url = item.url;

        let e = null;
        try {
            e = await axios.get(url, {
                timeout: 2000
            });
        } catch {
            continue;
        }
        const DOM = parse(e.data);

        const meta = DOM.querySelectorAll('meta').map(item => {
            return {
                content: item.getAttribute('content'),
                name: item.getAttribute('name'),
                property: item.getAttribute('property')
            }
        });

        let images = meta.filter(item => {
            if (!item.content) return false;
            if (item.property == 'og:image') return true;
        }).map(({
            content
        }) => content);

        if (images.length == 0) {
            images = DOM.querySelectorAll('img').map(img => img.getAttribute('src'));
        }


        if (images.length < 1) return;
        const d = async (images, i = 0) => {
            if (i > images.length - 1) return false;
            const done = await downloadImage(images[i], name);
            return done || d(images, ++i);
        }
        const bn = await d(images, 0);
        item.image = bn;
    };

    fs.writeFile(path.join('src', 'App', 'data', 'publication_img.json'), JSON.stringify(urls), 'utf-8', e => {
        if (e) console.error(e);
        console.log('done');
    })
}
init();