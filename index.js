const express = require('express');
const app = express();
app.use(express.static(__dirname));
app.set('view engine', 'ejs');

app.use(express.json());

const favicon = require('serve-favicon');
app.use(favicon('./public/favicon.png'));

const router = require('./routes/routes');
const toBuyRouter = require('./routes/toBuyRoutes');
const prettypayRouter = require('./prettypay/routes/routes');

app.use('/', router);
app.use('/toBuy', toBuyRouter);
app.use('/prettypay', prettypayRouter);

app.listen(process.env.PORT || 3200, () => {
    console.log('listening to 3200');
});
