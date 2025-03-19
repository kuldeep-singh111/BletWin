const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    message: {
      type: String,
      required: [true, "Message cannot be empty"],
      minlength: [10, "Message must be at least 10 characters long"],
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema)

module.exports = Contact;