import React from 'react';
import './Footer.css'; // Optional: for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Contact us at:</p>
                <p>Phone: +1 (123) 456-7890</p>
                <p>Phone: +1 (987) 654-3210</p>
                {/* Add more phone numbers or other contact information as needed */}
            </div>
        </footer>
    );
};

export default Footer;