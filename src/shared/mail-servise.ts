import nodemailer from 'nodemailer'
import config from './config'

const createLinkHtml = (link: string): string => `
<div>
    <h1>To activate follow the link</h1>
    <a href="${link}">${link}</a>
</div>
`

export class MailService {
    public async sendActivationMail(to: string, link: string) {
        const transporter = nodemailer.createTransport({
            host: config.get('smtp.host'),
            port: config.get('smtp.port'),
            secure: true,
            auth: {
                user: config.get('smtp.user'),
                pass: config.get('smtp.password'),
            },
            logger: true,
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation for ' + config.get('apiURL'),
            text: '',
            html: createLinkHtml(link),
        })
    }
}
