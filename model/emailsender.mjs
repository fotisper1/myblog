import nodemailer from 'nodemailer'
//δεχεται ως ορισμα το email του user και τον τιτλο του post και στελνει το εμαιλ.
async function sendEmail(usermail,title){
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lassdim0@gmail.com',
    pass: 'jocphzmeedvnbxyf'
  },
  host:'smtp@gmail.com'
});

var mailOptions = {
  from: 'lassdim0@gmail.com',
  to: usermail,
  subject: 'Σχόλιο στην αναρτηση σου με τιτλο'+title,
  text: 'Κάποιος σχολίασε την ανάρτηση σου'
};

await transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
}
export {sendEmail}