import nodemailer from "nodemailer"


interface params{
    email:String,
    emailType:String,
    userId: String,
}
async function sendEmail({email,emailType,userId}:params) {

    try {

        // Todo: Config mailer for usage

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });


          const mailOptions = {
            from: 'arvind@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType==="Verify"?"Veriy your email":"Reset Your Password", // Subject line
            html: "<b>Hello world?</b>", // html body
          }
          
          const mailResponse = await transporter.sendMail(mailOptions);

          return mailResponse


        
    } catch (error:any) {

        throw new Error(error.message)
        
    }
    
}