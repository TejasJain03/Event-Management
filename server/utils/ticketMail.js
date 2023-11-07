const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tejaskjain2003@gmail.com',
    pass: 'tjwf zmvv ogco dqrt',
  },
})

const sendEmail = (to, attendeeId,event) => {
  const mailOptions = {
    from: 'tejaskjain2003@gmail.com',
    to,
    subject: 'Ticket Details',
    html: `<h1>Registration Confirmation!!!</h1>
    <p>Dear Attendee,</p>
    <p>Thank you for registering for our event. Your registration has been confirmed!</p>
    <p>Your Attendee ID is: <strong>${attendeeId}</strong></p>
    <p>Event Details:</p>
    <ul>
        <li><strong>Event Name:</strong> ${event.name}</li>
        <li><strong>Date:</strong> ${event.date}</li>
        <li><strong>Location:</strong> ${event.location}</li>
    </ul>
    <p>We look forward to seeing you at the event. If you have any questions or need further assistance, please don't hesitate to contact us.</p>
    <p>Best regards,</p>
    <p>Your Event Management Team</p>`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error)
    } else {
      console.log('Email sent:', info.response)
    }
  })
}

module.exports = sendEmail
