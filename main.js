const express = require('express');
const app = express();
const router = require('./router/template');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const settings = require('settings.json');

// Setting ejs files to compile on code.
app.set('view engine', 'ejs');
// Using router template for "/router"
app.use("/router", router)
// Using BodyParser for JSON encoding.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Using GET method for "/"
app.get("/", function (req, res) {
    // Rendering index.ejs file from public folder
    res.render("index", {
        Username: "Reviath"
    });
});

// Using GET method for "/mail"
app.get("/mail", function (req, res) {
    res.render("mail", {})
})

// Using POST method for "/send-email"
app.post('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: settings.host,
        port: 465,
        secure: true,
        auth: {
            user: settings.mail,
            pass: settings.pass
        }
    });
    let mailOptions = {
        from: '"'+ settings.name +'" <'+ settings.mail +'>',
        to: req.body.to,
        subject: req.body.subject, 
        text: req.body.body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
            res.redirect('/mail');
    });
});

// Running website on port: 8080
app.listen(8080, function () {
    console.log('Server is listening on port 8080');
});