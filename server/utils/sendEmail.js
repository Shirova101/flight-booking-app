const nodeMailer = require("nodemailer");

const sendEmail = async(options)=>{// options is thewhole object we have as a parameter(email,subject....)
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST, 
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            type: 'OAuth2',
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;