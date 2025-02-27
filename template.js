export default ({ markup }) => {
  return `<!doctype html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <title>MERN Skeleton</title>
  <link rel="stylesheet"
  <href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
  </head>
  <body>
  <div id="root">${markup}</div>
  <script type="text/javascript" src="/dist/bundle.js"></script>
  </body>
  </html>`;
};
