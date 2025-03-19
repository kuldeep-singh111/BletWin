const Contact = require('../models/Contact.model.js')

const contact = async (req, res) => {
  try {
    const { email, message } = await req.body;

    if (!email || !message) {
      return res.status(400).json({ message: "Email and Message are required." });
    }

    const newContact = await Contact.create({ email, message });

    return res.status(201).json(
      { message: "Message sent successfully!", contact: newContact }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { contact };