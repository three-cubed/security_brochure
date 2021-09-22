const express = require('express');
const app = express();
app.use(express.static(__dirname)); // To access stylesheet.css
app.set('view engine', 'ejs');

const router = require('./routes/routes');
const toBuyRouter = require('./routes/toBuyRoutes');

app.use('/', router);
app.use('/toBuy', toBuyRouter);

app.listen(process.env.port||3000, () => {
    console.log('listening to 3000');
});
