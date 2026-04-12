import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const EASE = [0.16, 1, 0.3, 1];

const ProductCard = ({ product, index, onOpenModal }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addItem({ ...product, size: 'M' });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.04 }}
      viewport={{ once: true }}
      onClick={() => onOpenModal(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-xl cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: hovered ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: hovered
          ? '0 8px 36px rgba(130,130,170,0.13), 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
          : 'inset 0 1px 0 rgba(255,255,255,0.04)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      {/* Image area */}
      <div className="aspect-square relative overflow-hidden bg-black">
        {product.image && (
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.05 : 1, opacity: hovered ? 1 : 0.85 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              mixBlendMode: 'screen',
              filter: hovered
                ? 'drop-shadow(0 4px 24px rgba(160,160,200,0.2))'
                : 'none',
            }}
          />
        )}

        {/* Quick-add */}
        <motion.button
          onClick={handleQuickAdd}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 font-semibold tracking-widest uppercase whitespace-nowrap pointer-events-auto"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '0.65rem',
            padding: '0.45rem 1.2rem',
            border: added ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(0,0,0,0.72)',
            color: added ? '#fff' : 'rgba(255,255,255,0.7)',
            borderRadius: '0.5rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          {added ? (
            <span className="flex items-center gap-1.5">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Added
            </span>
          ) : 'Quick Add — M'}
        </motion.button>
      </div>

      {/* Info row */}
      <div className="px-4 py-3 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="min-w-0">
          <h3 className="truncate font-semibold transition-colors duration-200"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '0.82rem',
              letterSpacing: '0.06em',
              color: hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
            }}>
            {product.name}
          </h3>
          <p className="chrome-text font-bold mt-0.5"
            style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem' }}>
            ${product.price}
          </p>
        </div>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="shrink-0 ml-2 transition-colors duration-200"
          style={{ color: hovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)' }}
        >
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </motion.div>
  );
};

export default ProductCard;
