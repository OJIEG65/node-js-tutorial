const fs = require('fs');

const requestHandler = (req, res) => {
    const {url, method} = req;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title> enter message </title></head>');
        res.write('<body>' +
            '<form action="/message" method="POST"> ' +
            '<input type="text" name="message">' +
            '<button type="submit"> send</button><' +
            '/form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        });

        return req.on('end', () => {
            const parserBody = Buffer.concat(body).toString();
            const message = parserBody.split('=')[1];
            fs.writeFile('message.txt', message, (error) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end()
            });
        });

    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title> Me fisrt page </title></head>');
    res.write('<body><h1>hello from the other side!</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler();