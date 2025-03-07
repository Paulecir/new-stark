import SendgridMailer from '@sendgrid/mail'
SendgridMailer.setApiKey(process.env.SENDGRID_API_KEY)

export default SendgridMailer
