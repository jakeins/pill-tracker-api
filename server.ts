import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs'; 
import { Server } from 'typescript-rest';
import cors from 'cors';

const app: express.Application = express();

// Configure Express
let staticPath = path.join(__dirname, './client');

if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
}
app.use(cors());
app.use(express.json());

// Configure typescript-rest
require('./controllers');
Server.buildServices(app);
Server.swagger(app, {
  filePath: './dist/swagger/swagger.json',
  endpoint: '/help'
});

// Start server
http.createServer(app).listen(3000);
console.log("Listening at http://localhost:3000");
console.log("Swagger url http://localhost:3000/help");
