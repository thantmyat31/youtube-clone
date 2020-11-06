const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const mongodbUrl = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 2020;

// Database connection
mongoose
	.connect(mongodbUrl, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('[MongoDB Connected]'))
	.catch((error) => console.error("[Database Connection Badly Failed]"));


// Middlewares
app.use(express.json());
app.use(cors());
app.use('/users', require('./routes/userRouter'));
app.use('/video', require('./routes/videoRouter'));
app.use('/subscribe', require('./routes/subscribeRouter'));

app.use(express.static('./uploads/'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


app.use((err, req, res, next) => {
    if(err.message) {
        res.json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production'? '@-@': err.stack
        });
    } else {
        res.json({
            message: err
        })
    }
});

// Listener
app.listen(PORT, () => console.log(`Listen on PORT ${PORT}`));
