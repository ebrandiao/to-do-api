require('dotenv').config();
const cors = require('cors');

const express = require('express');
const connectDb = require('./config/db.config');

connectDb();

// conectar a database
const app = express();

// utilizar o json no body das requisições
app.use(express.json());
app.use(cors());

// rotas pasta routes

app.use('/todo', require('./routes/todo.routes'));

app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`));
