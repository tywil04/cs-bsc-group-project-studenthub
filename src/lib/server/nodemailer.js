import { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USERNAME, SMTP_PASSWORD } from "$env/static/private"
import { createTransport } from "nodemailer"

const nodemailer = createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE.toLowerCase() === "true",
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
    },
    tls: {
        ciphers: "SSLv3"
    }
});
  
export default nodemailer