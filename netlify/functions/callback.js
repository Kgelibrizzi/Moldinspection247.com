let fetch; // Declare fetch in the outer scope
require('./load-env'); // Injects env values
const crypto = require('crypto'); // This line is fine, 'crypto' is a built-in Node.js module

function renderBody(status, content) {
  const html = `
    <script>
      const receiveMessage = (message) => {
        // IMPORTANT: Ensure message.origin is validated in a production environment
        // For local development or simple demos, '*' might be used, but for security,
        // it should be restricted to your Netlify site's domain.
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          message.origin // This should ideally be a specific origin for security
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;
  return html;
}

exports.handler = async function(event, context) {
  // Lazily import node-fetch if it hasn't been imported yet
  if (!fetch) {
    try {
      // Dynamic import: Await the import and get the default export for node-fetch v3+
      const { default: importedFetch } = await import('node-fetch');
      fetch = importedFetch;
    } catch (importError) {
      console.error("Failed to import node-fetch:", importError);
      return {
        statusCode: 500,
        body: "Server configuration error: Could not load fetch library."
      };
    }
  }

  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  try {
    const requestUrl = new URL(event.rawUrl);
    const code = requestUrl.searchParams.get('code');
    // You should also check for and verify the 'state' parameter here for security!
    // Decap CMS might handle its own state, but for a custom function, it's critical.

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'netlify-functions-github-oauth-login-demo', // Good practice to identify your app
        'accept': 'application/json',
      },
      // Ensure the redirect_uri and state are included if GitHub requires them to be echoed back
      // The previous example from my message included them. GitHub's API often expects them back.
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
        // Add these back if your GitHub app needs them echoed in the token exchange
        // redirect_uri: `https://${event.headers.host}/.netlify/functions/api/callback`,
        // state: requestUrl.searchParams.get('state'), // Get state from incoming request
      }),
    });

    const result = await response.json();

    if (result.error) {
      console.error("GitHub Access Token Error:", result.error, result.error_description);
      return {
        statusCode: 401,
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
        body: renderBody('error', result),
      };
    }

    const token = result.access_token;
    const provider = 'github';
    const responseBody = renderBody('success', {
      token,
      provider,
    });

    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
      body: responseBody,
    };
  } catch (error) {
    console.error('Error in callback function:', error);
    return {
      statusCode: 500,
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
      body: renderBody('error', { error: 'Internal Server Error', message: error.message }), // Return error in a structured way for Decap CMS
    };
  }
};
