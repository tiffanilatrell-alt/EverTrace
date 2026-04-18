export default function handler(req, res) {
  const filePath = req.query.path || '/';
  
  // Define article metadata
  const articles = {
    '/resources/writing-a-meaningful-tribute': {
      title: 'Writing a Meaningful Tribute',
      description: 'Prompts and examples to help you begin a tribute with confidence and warmth.',
      image: 'https://evertrace.life/greenbranch.png'
    },
    '/resources/inviting-family-to-contribute': {
      title: "Mother's Day feels different when she's gone.",
      description: 'A gentle way to honor her memory — and begin capturing the moments that still live with you.',
      image: 'https://evertrace.life/strandsofgrass.jpg'
    },
    '/resources/planning-ongoing-grounds-care': {
      title: 'A Simple Care Checklist',
      description: 'Keeping a place of remembrance tended, without overwhelm.',
      image: 'https://evertrace.life/greenbranch.png'
    }
  };

  const article = articles[filePath] || {
    title: 'EverTrace',
    description: 'Create a tribute, share memories, and preserve stories together.',
    image: 'https://evertrace.life/greenbranch.png'
  };

  const userAgent = req.headers['user-agent'] || '';
  const isFacebookCrawler = userAgent.includes('facebookexternalhit') || 
                            userAgent.includes('Facebot') ||
                            userAgent.includes('fbtrace');

  if (isFacebookCrawler) {
    // Return HTML with article-specific meta tags for Facebook crawler
    return res.status(200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${article.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="EverTrace" />
    <meta property="og:title" content="${article.title}" />
    <meta property="og:description" content="${article.description}" />
    <meta property="og:url" content="https://evertrace.life${filePath}" />
    <meta property="og:image" content="${article.image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${article.title}" />
    <meta name="twitter:description" content="${article.description}" />
    <meta name="twitter:image" content="${article.image}" />
  </head>
  <body></body>
</html>`);
  }

  // For regular users, serve the SPA with a data attribute for client-side routing
  return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/evertrace-logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EverTrace</title>
    <meta name="description" content="EverTrace helps families create living tribute pages to remember, share, and carry stories forward." />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="EverTrace" />
    <meta property="og:title" content="EverTrace" />
    <meta property="og:description" content="Create a tribute, share memories, and preserve stories together." />
    <meta property="og:url" content="https://evertrace.life/" />
    <meta property="og:image" content="https://evertrace.life/greenbranch.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="EverTrace" />
    <meta name="twitter:description" content="Create a tribute, share memories, and preserve stories together." />
    <meta name="twitter:image" content="https://evertrace.life/greenbranch.png" />
    <script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '1261742262745578'); fbq('track', 'PageView');</script>
  </head>
  <body>
    <noscript><img height="1" width="1" src="https://www.facebook.com/tr?id=1261742262745578&ev=PageView&noscript=1" /></noscript>
    <div id="root"></div>
    <script type="module" src="/assets/index-C80x6cz9.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-CCjqC33L.css">
  </body>
</html>`);
}
