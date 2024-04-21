import Handlebars from "handlebars";
import nodemailer from "nodemailer"
import { EmailTemplate } from "./EmailTemplate/EmailTemplate";

type MailType = {
    to: string,
    subject:string,
    body: string,
}

export async function SendMail({to, subject, body}:MailType) {
  const { SMTP_EMAIL, SMTP_GMAIL_PASSWORD} = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: SMTP_EMAIL,
        pass: SMTP_GMAIL_PASSWORD
    }
  })

  try {
    const result = await transport.sendMail({
        from:SMTP_EMAIL,
        to,
        subject,
        html: body
    })
    console.log("Mail result: ", result)
  } catch (error) {
    console.log(error)
  }
}

export function compileEmailTemplate(name:string, url:string, button:string, title:string){
  const template = Handlebars.compile(EmailTemplate);
  const htmlBody = template({
    name:name,
    url:url,
    button: button,
    title:title
  })
  return htmlBody;
}