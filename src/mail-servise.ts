import "dotenv/config";
import nodemailer from "nodemailer";

export class MailService {
  public async sendActivationMail(to: string, link: string){
    
    const transporter =  nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      logger: true,
    });

     
    const result = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Account activation for " + process.env.API_URL,
      text: "",
      html: `
                  <div>
                      <h1>To activate follow the link</h1>
                      <a href="${link}">${link}</a>
                  </div>
              `,
    });
  }
}

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD
//   },
//   logger: true
// })

// const info = transporter.sendMail({
//   from: '"Sender Name" <from@example.net>',
//   to: "to@example.com",
//   subject: "Hello from node",
//   text: "Hello world?",
//   html: "<strong>Hello world?</strong>",
//   headers: { 'x-myheader': 'test header' }
// });