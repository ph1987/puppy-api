import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
/*
app.use(cors({
    origin: 
}));
*/
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(3333);

// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente

// Corpo (Request Body): Dados para criação ou atualização de um registro   
//      ex: { name: 'João', age: 28 }   | request.body

// Route Params: Identificar qual recurso eu quero atualizar ou deletar     
//      ex: /users/:id                  | request.params

// Query Params: Paginação                                                  
//      ex: users?page=2&sort=name      | request.query