const fetch = require('node-fetch-commonjs');
async function getHTML(link) {
    return await (await fetch(link)).text()
}

module.exports = getHTML