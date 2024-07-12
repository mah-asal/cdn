require('dotenv/config');

const https = require('https');
const express = require('express');

const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
    secure: false,
    hostRewrite: true,
    autoRewrite: true,
});

const PORT = process.env.PORT ?? 9100;

const app = express();

app.use(require('cors')());
app.use(express.json());


app.all('*', (req, res) => {
    const item = 'https://s3.tv-92.com';

    if (item) {
        proxy.web(req, res, {
            target: item
        });
    } else {
        res.status(404).send('Page not found.')
    }
});

app.listen(PORT, () => {
    console.log(`Angor started on port ${PORT}`);
});