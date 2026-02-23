const http = require('http');

// In-Memory Data
let items = [
    { id: Date.now(), name: "Mouse" },
    { id: Date.now() + 1, name: "Keyboard" }
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests for CORS
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // GET /items -> Return the items list
    if (req.method === 'GET' && req.url === '/items') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(items));
    }
    
    // POST /items -> Add a new item
    else if (req.method === 'POST' && req.url === '/items') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                
                // Input Validation
                if (!parsedBody.name) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Name is required' }));
                    return;
                }

                const newItem = { 
                    id: Date.now(), 
                    name: parsedBody.name 
                };
                items.push(newItem);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newItem));
                
            } catch (error) {
                // Catch malformed JSON
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    }
    
    // 404 Fallback for unknown routes
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

// Server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});