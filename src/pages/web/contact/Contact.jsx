import { useState } from "react";
import "./Contact.css";
import { sendContactMessage } from "../../../api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill in all fields.");
      setSuccess(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email.");
      setSuccess(false);
      return;
    }

    setError("");

    try {
      const response = await sendContactMessage(formData);
      if(response.success) {
        setSuccess(true)
        setFormData({name: "", email: "", subject: "", message: ""})
      } else {
        setError("Failed to send message. Please try againg later.")
        setSuccess(false);
      }
    } catch (error) {
      console.error(error)
      setError("An error occured while sending the message.")
      setSuccess(false)
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Heppto Blogs</h1>

      <p>
        Have any questions, suggestions, or feedback? We’d love to hear from you! 
        Fill out the form below and our team will get back to you within 24–48 hours.
      </p>

      

      {error && <p className="error-msg">{error}</p>}
      {success && (
  <p className="success-msg" style={{ color: "#16a34a" }}>
    Your message has been sent successfully!
  </p>
)}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Subject
          <input
            type="text"
            name="subject"
            placeholder="Subject of your message"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            placeholder="Write your message..."
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <button type="submit">Send Message</button>
      </form>

      <p className="note">
        Note: We respect your privacy. Your information will never be shared.
      </p>
    </div>
  );
}
