const http = require('http')
const path = require('path')
const fs = require('fs')

const pIndex = path.join(__dirname, 'index.html')
const pContact = path.join(__dirname, 'contact.html')
const body = []

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'text/html'
    })
    
    if (req.method === 'GET') {
        if (req.url === '/') {
            fs.readFile(pIndex, 'utf-8', (err, data) => {
                if (err) console.log(err);
                else {
                    res.write(data)
                    res.end()
                }
            })
        } else if (req.url === '/contact'){
            fs.readFile(pContact, 'utf-8', (err, data) => {
                if(err) console.log(err);
                else {
                    res.write(data)
                    res.end()
                }
            })
        }
    } else if (req.method === 'POST') {
        if (req.url === '/') {
            req.on('data', (data) => {
                body.push(Buffer.from(data) + '<br>' + '<hr style="color: black">');
            })

            req.on('end', () => {
                res.write(body.toString() + '<a href="http://localhost:3000/">Home</a>')
                res.end()
            })
        }
    }
})

server.listen(3000, () => {
    console.log(`Server working on port: 3000`);
})