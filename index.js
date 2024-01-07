const express = require('express');
const cors = require('cors');
const { createTransport } = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/"
}));

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './media/images (2).jpeg');
    const fileSteam = fs.createReadStream(filePath);
    fileSteam.pipe(res);
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
        html: `<html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <h1 class="text-3xl font-bold underline">
            Hello world!
          </h1>
        </body>
        </html>`
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



app.post('/file-upload', async (req, res) => {
    try {
        const file = await req.files.image
        const uploadDir = path.join(__dirname, './media');
        const filePath = path.join(uploadDir, file.name);
        await file.mv(filePath)
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error' })
    }
});

app.listen(port);

