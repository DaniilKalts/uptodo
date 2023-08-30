/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

const CONTACT_MESSAGE_FIELDS = {
  userName: 'User Name:',
  email: 'Email From:',
  message: 'User Feedback:',
};

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASS;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    const htmlData = Object.entries(data).reduce(
      // eslint-disable-next-line no-return-assign
      (str, [key, val]) =>
        // eslint-disable-next-line no-param-reassign
        (str += `<h3 class="form-heading" align="left">${
          CONTACT_MESSAGE_FIELDS[key as 'userName' | 'email' | 'message']
        }</h3><p class="form-answer" align="left">${(val as string)
          .split('\n')
          .map((line) => line.trim())
          .join('<br>')}</p>`),
      '',
    );

    const mailOption = {
      from: email,
      to: email,
      subject: 'Feedback from the User',
      name: 'Feedback Message',
      html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; color: #8875FF !important;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #fff; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 700; text-align: left; line-height: 20px; font-size: 20px; margin: 0 0 8px; padding: 0;}.form-answer{color: #fff; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#272727" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2 style="color: #8875FF">User's Message! &#128640; &#128293;</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: 'Email Sent Successfully' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to Send Email' },
      { status: 500 },
    );
  }
}
