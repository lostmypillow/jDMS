const fetch = require('node-fetch-commonjs');
async function getHTMLFetch(link) {
    const response = await fetch(link);
    // Convert the response into text
    const body = await response.text();
    return body
}


module.exports = getHTMLFetch