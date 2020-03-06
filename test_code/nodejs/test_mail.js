//npm install nodemailer
var _mailer = require("nodemailer");

var smtpTransport = _mailer.createTransport("SMTP", {
	service: "GMail",
	auth: {
		user: "roman.v.laptev@gmail.com",
		pass: ""
	}
});

smtpTransport.sendMail({
	from: "Roman Laptev <roman.v.laptev@gmail.com>",
	to: "roman-laptev@yandex.ru",
	subject: "test1",
	body: "send from Node js"
}), function( err, response){
	if( err){
		throw err;
	} else {
console.log("Message sent...");
	}
	smtpTransport.close(0);
};


