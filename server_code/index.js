const http = require("http");
const path = require("path");
const fs = require("fs");


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST",
}


const server = http.createServer((req, res) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000,
        'Content-Type': 'application/json'  // 30 days
        /** add other headers too */
    };


    if (req.url === '/') {
        // read public.html file from public folder
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
            (err, content) => {

                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
    }

    else if (req.url === '/about') {

        // read the about.html file public folder
        fs.readFile(
            path.join(__dirname, 'public', 'about.html'),
            (err, content) => {

                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
    }
    else if (req.url === '/css'){
        fs.readFile(
            path.join(__dirname, 'public', 'css', 'styles.css'),
            (err, content) => {
                if(err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(content);
            }
        )
    }
    else if (req.url === '/image'){
        fs.readFile(
            path.join(__dirname, 'public', 'images', 'img.jpeg'),
            (err, content) => {
                if(err) throw err;
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(content);
            }
        )
    }
    else if (req.url==='/api')
    {
        fs.readFile(
            path.join(__dirname, 'public', 'db.json'),'utf-8',
            (err, content) => {

                if (err) throw err;
                // Please note the content-type here is application/json
                res.writeHead(200,headers);
                res.end(content);
            }
        );
    }
    else{
        res.end("<h1> 404 nothing is here</h1>");
    }
});



const PORT = process.env.PORT || 5959;

server.listen(PORT, () => console.log(`Great our server is running on port ${PORT} `));
