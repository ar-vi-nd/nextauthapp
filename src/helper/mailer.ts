import User from "@/models/usermodel";
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"


interface params{
    email:String,
    emailType:String,
    userId: String,
}
export async function sendEmail({email,emailType,userId}:params) {

    try {

        // Todo: Config mailer for usage

        const hashedToken = await bcrypt.hash(userId.toString(),10)

        if(emailType === "VERIFY"){

            await User.findByIdAndUpdate(userId,{
                $set:{

                    verifyEmailToken : hashedToken,
                    verifyEmailTokenExpiry : new Date(Date.now()+36000000)
                }
               
            })
        }else if (emailType === "RESET"){

            await User.findByIdAndUpdate(userId,{
                $set:{

                    forgotPasswordToken : hashedToken,
                    forgotPasswordTokenExpiry : new Date(Date.now()+36000000)
                }
               
            })

        }


        // const transporter = nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     port: 587,
        //     secure: false, // Use `true` for port 465, `false` for all other ports
        //     auth: {
        //       user: "maddison53@ethereal.email",
        //       pass: "jn7jnAPss4f63QBp6D",
        //     },
        //   });

          const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASS
            }
          });


          const mailOptions : any = {
            from: 'arvind@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType==="VERIFY"?"Veriy your email":"Reset Your Password", // Subject line
            html: emailType==="VERIFY"?`<p>Click <a href=${process.env.DOMAIN}/verifyemail?token=${hashedToken}>here</a> to verify your email</p>`:`<p>Click <a href=${process.env.DOMAIN}/resetpassword?token=${hashedToken}>here</a> to reset your password</p>`, // html body
          }
          
          const mailResponse = await transport.sendMail(mailOptions);

          return mailResponse


        
    } catch (error:any) {

        throw new Error(error.message)
        
    }
    
}