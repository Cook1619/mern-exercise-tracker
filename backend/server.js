const express = require('express');
const cors = require('cors');
const moongoose =  require('mongoose');
const exerciseRouter =  require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
moongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection =  moongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection esatablished successfully');
})

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})