const Product = require("../models/product");
const _ = require("lodash");
var nodemailer = require("nodemailer");

exports.newProduct = (req, res) => {
  const { nameTR, nameFR, nameDE, nameSP, nameNL, imageStr, gen } = req.body;

  let newProduct = new Product({
    nameTR,
    nameFR,
    nameDE,
    nameSP,
    nameNL,
    imageStr,
    gen,
  });

  newProduct.save((err, success) => {
    if (err) {
      console.log("Activation Error: ", err);
      return res
        .status(400)
        .json({ error: "Product didn t added to database" });
    }
    console.log(nameTR + " urunu Eklendi");
    res.status(200).json({
      message: "Success!",
    });
  });
};

exports.getProduct = (req, res) => {
  Product.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

exports.newMessage = (req, res) => {
  const { from_name, user_email, contact_number, message } = req.body;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info.goezgmbh@gmail.com",
      pass: "1071zafer",
    },
  });

  var mailOptions = {
    from: "info.goezgmbh@gmail.com",
    to: "serus2003@gmail.com",
    subject: "Goez.com'dan Mesaj",
    html: `
      <p>Gonderen Kisi => ${from_name}</p><br></br>
      <p>Gonderen Telefon Numarası => ${contact_number}</p><br></br>
      <p>Gonderen Telefon Email Adresi => ${user_email}</p><br></br>
      <p>Mesajı => ${message}</p>
           
            
            `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(200).json({ error: info });
    } else {
      return res.status(200).json({ success: info });
    }
  });
};

exports.deleteProduct = (req, res) => {
 if(req.params.id){
  const id = req.params.id;
  Product.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data.find((item) => item._id == id).delete());
    }
  });
 }
};
