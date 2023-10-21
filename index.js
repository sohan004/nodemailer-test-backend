const express = require('express');
const cors = require('cors');
const { createTransport } = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/send', (req, res) => {


    const otpCode4digit = Math.floor(1000 + Math.random() * 9000);



    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: 'md802827@gmail.com',
            pass: 'rccs nznh soyh xyrn'
        }
    });

    const mailOptions = {
        from: 'md802827@gmail.com',
        to: 'aryansohan02@gmail.com',
        subject: 'Sending Email using Node.js',
        html: `<h1>OTP Code: ${otpCode4digit}</h1>                  `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('message not sent');
        }
        else {
            console.log('Email sent: ' + info?.response);
            res.send({ node: 'Email sent' });
        }
    });

});

app.listen(port);

