import nodemailer from "nodemailer"

type MailType = {
    to: string,
    subject:string,
    body: string
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
        html:body
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
