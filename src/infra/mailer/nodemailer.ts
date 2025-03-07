import nodemailer from "nodemailer";

const NodeMailer = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || "0"),
    // secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
});

// console.log(">", {
//     host: process.env.MAIL_HOST,
//     port: parseInt(process.env.MAIL_PORT || "0"),
//     secure: true, // true for port 465, false for other ports
//     auth: {
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD
//     },
// })

export default NodeMailer;