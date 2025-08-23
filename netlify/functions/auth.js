// netlify/functions/api/auth.js
const crypto = require('crypto'); // Node.js 'crypto' module for random values
require('./load-env'); // Injects env values

exports.handler = async function(event, context) {
    const client_id = process.env.GITHUB_CLIENT_ID;

    try {
        const url = new URL(event.rawUrl); // event.rawUrl contains the full request URL
        const redirectUrl = new URL('https://github.com/login/oauth/authorize');
        redirectUrl.searchParams.set('client_id', client_id);
        redirectUrl.searchParams.set('redirect_uri', url.origin + '/.netlify/functions/callback');
        redirectUrl.searchParams.set('scope', 'repo user');
        
        // Generate a random state using Node.js crypto
        const state = crypto.randomBytes(12).toString('hex');
        redirectUrl.searchParams.set('state', state);

        return {
            statusCode: 301,
            headers: {
                'Location': redirectUrl.href,
            },
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: error.message,
        };
    }
};
