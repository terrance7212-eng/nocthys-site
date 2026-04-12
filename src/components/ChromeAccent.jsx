
import React from 'react';
import { motion } from 'framer-motion';

const ChromeAccent = ({ className = '', variant = 'horizontal' }) => {
  if (variant === 'horizontal') {
    return (
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className={`h-px chrome-shine ${className}`}
      />
    );
  }

  if (variant === 'vertical') {
    return (
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className={`w-px chrome-shine ${className}`}
      />
    );
  }

  if (variant === 'corner') {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute top-0 left-0 w-12 h-px chrome-shine" />
        <div className="absolute top-0 left-0 w-px h-12 chrome-shine" />
      </div>
    );
  }

  return null;
};

export default ChromeAccent;
