import React from 'react';
import { motion } from 'framer-motion';
import './contactus.css';

function ContactUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="contact-us-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="contact-us-heading"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Contact Us
      </motion.h2>

      <motion.div className="contact-info" variants={itemVariants}>
        <p>📧 Email: support@foodzone.com</p>
        <p>📞 Phone: +91-9876543210</p>
        <p>🌐 Website: www.foodzone.com</p>
      </motion.div>

      <motion.form
        className="contact-form"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'tween' }}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default ContactUs;
