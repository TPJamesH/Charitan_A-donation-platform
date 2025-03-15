const transporter = require("./emailConfig");
const {
    verifyMail,
    welcomeMail,
    donorProjectHaltedMail,
    charityProjectHaltedMail,
} = require("./emailTemplates");

class EmailService {
    // Send a verification email
    async sendVerifyEmail(receiver, name, OTP) {
        const mailOptions = verifyMail(receiver, name, OTP);
        await EmailService.sendEmail(mailOptions);
    }

    // Send a welcome email
    async sendWelcomeEmail(receiver, name, role) {
        const mailOptions = welcomeMail(receiver, name, role);
        await EmailService.sendEmail(mailOptions);
    }


    // Send donors an email for halted project
    async sendDonorProjectHaltedEmail(
        receiver,
        name,
        projectTitle,
        projectUrl,
        haltReason
    ) {
        const mailOptions = donorProjectHaltedMail(
            receiver,
            name,
            projectTitle,
            projectUrl,
            haltReason
        );
        await EmailService.sendEmail(mailOptions);
    }

    // Send charity an email on project halt
    async sendCharityProjectHaltedEmail(
        receiver,
        name,
        projectTitle,
        projectUrl,
        haltReason
    ) {
        const mailOptions = charityProjectHaltedMail(
            receiver,
            name,
            projectTitle,
            projectUrl,
            haltReason
        );
        await EmailService.sendEmail(mailOptions);
    }

    // Generic function to send emails
    static async sendEmail(mailOptions) {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    }
}

module.exports = new EmailService();
