import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-about">
          <h3>Heppto Blogs</h3>
          <p>Your go-to blog for tips, guides, and lifestyle hacks. Stay informed, stay productive!</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 Heppto Blogs. All rights reserved.</p>
      </div>
    </footer>
  );
}
