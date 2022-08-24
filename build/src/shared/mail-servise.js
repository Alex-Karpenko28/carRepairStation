"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("./config"));
const createLinkHtml = (link) => `
<div>
    <h1>To activate follow the link</h1>
    <a href="${link}">${link}</a>
</div>
`;
class MailService {
    async sendActivationMail(to, link) {
        const transporter = nodemailer_1.default.createTransport({
            host: config_1.default.get("smtp.host"),
            port: config_1.default.get("smtp.port"),
            secure: true,
            auth: {
                user: config_1.default.get("smtp.user"),
                pass: config_1.default.get("smtp.password"),
            },
            logger: true,
        });
        const result = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Account activation for " + config_1.default.get("apiURL"),
            text: "",
            html: createLinkHtml(link),
        });
    }
}
exports.MailService = MailService;
//# sourceMappingURL=mail-servise.js.map