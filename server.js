const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

//connect to mongoDB
connectDB();

//Middleware
app.use(bodyParser.json());

//Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/discussions', require('./routes/discussion'));


const PORT = process.env.PORT || 5000;

//Swagger Docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});