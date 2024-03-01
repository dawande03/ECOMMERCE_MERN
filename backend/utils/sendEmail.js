const nodeMailer = require("nodemailer");

const sendEmail = async (options)=>{
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
        service:process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_MAIL,
            pass : process.env.SMPT_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message        
    }

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

// const nodeMailer = require("nodemailer");
// const dotenv = require("dotenv")
// dotenv.config()
// const sendEmail = async (options) => {

//   const transporter = nodeMailer.createTransport({
//     service:'gmail',
//     auth :{
//         user: process.env.SMPT_MAIL,
//         pass:process.env.SMPT_PASSWORD  
//     }
//   });

//   var mailOptions = {
//     from: "sdawande367@gmail.com",
//     to: options.email,
//     subject: "options.subject",
//     text: options.Message,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = {sendEmail};
