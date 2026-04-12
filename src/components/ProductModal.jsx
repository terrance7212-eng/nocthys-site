import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

// Placeholder gallery — swap per-product once real photos exist
const PLACEHOLDER_GALLERY = [
  '/images/mandala.png',
  '/images/chrome-figure.png',
  '/images/apple.png',
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductModal = ({ product, onClose, onCheckoutNow }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  const images = product.images?.length ? product.images : PLACEHOLDER_GALLERY;

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const pickSize = (s) => { setSelectedSize(s); setSizeError(false); };

  const handleAdd = () => {
    if (!selectedSize) { setSizeError(true); return; }
    addItem({ ...product, size: selectedSize });
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); return; }
    addItem({ ...product, size: selectedSize });
    onClose();
    onCheckoutNow();
  };

  return (
    <motion.div
      key="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 24 }}
        transition={{ type: 'spring', stiffness: 270, damping: 26 }}
        className="relative w-full max-w-4xl flex flex-col md:flex-row max-h-[92vh] overflow-hidden rounded-2xl"
        style={{
          background: 'linear-gradient(145deg, #0e0e0e 0%, #080808 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* ── Corner close ── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
          aria-label="Close"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* ══ LEFT — image gallery ══════════════════════════════════════════ */}
        <div className="md:w-[52%] flex flex-col" style={{ background: 'rgba(0,0,0,0.5)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Main image */}
          <div className="relative flex-1 min-h-[260px] overflow-hidden flex items-center justify-center">
            {/* Subtle radial glow behind image */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(160,160,180,0.06) 0%, transparent 70%)' }}
            />
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={images[activeImg]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.28 }}
                className="relative z-10 w-full h-full object-contain p-10"
                style={{ filter: 'drop-shadow(0 8px 32px rgba(180,180,210,0.12))' }}
              />
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 px-5 pb-5 pt-2 justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="w-14 h-14 rounded-lg overflow-hidden transition-all duration-150 shrink-0"
                  style={{
                    border: activeImg === i
                      ? '1px solid rgba(255,255,255,0.45)'
                      : '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(0,0,0,0.6)',
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover opacity-80" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ══ RIGHT — product info ══════════════════════════════════════════ */}
        <div className="md:w-[48%] flex flex-col overflow-y-auto">

          {/* Scrollable content */}
          <div className="flex-1 px-8 pt-8 pb-4 space-y-7">

            {/* Label + name + price */}
            <div>
              <p
                className="mb-2 tracking-[0.3em] uppercase"
                style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem', fontFamily: 'Rajdhani, sans-serif' }}
              >
                ChromeVoid Collection
              </p>
              <h2
                className="leading-tight tracking-wide mb-4"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                  color: '#e8e8e8',
                }}
              >
                {product.name}
              </h2>
              {/* Chrome price */}
              <p
                className="chrome-text font-bold"
                style={{ fontSize: '1.6rem', fontFamily: 'Rajdhani, sans-serif' }}
              >
                ${product.price}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

            {/* Description */}
            <div className="space-y-3" style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.82rem', lineHeight: '1.7' }}>
              <p>
                Part of the ChromeVoid drop — where gothic mysticism meets Y2K chrome futurism.
                Printed on heavyweight 100% cotton. Preshrunk. True to size.
              </p>
              <ul className="space-y-1.5" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
                {['320gsm heavyweight cotton', 'Oversized / relaxed fit', 'All black. Always.', 'Screen-printed chrome ink'].map(d => (
                  <li key={d} className="flex items-center gap-2">
                    <span className="chrome-text" style={{ fontSize: '0.65rem' }}>—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

            {/* Size picker */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="tracking-[0.25em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem', fontFamily: 'Rajdhani, sans-serif' }}
                >
                  Select Size
                </span>
                {sizeError && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-400"
                    style={{ fontSize: '0.72rem' }}
                  >
                    Choose a size first
                  </motion.span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => pickSize(s)}
                    className="w-12 h-10 rounded-lg font-semibold transition-all duration-150"
                    style={{
                      fontFamily: 'Rajdhani, sans-serif',
                      fontSize: '0.8rem',
                      letterSpacing: '0.05em',
                      border: selectedSize === s
                        ? '1px solid rgba(255,255,255,0.55)'
                        : '1px solid rgba(255,255,255,0.1)',
                      background: selectedSize === s
                        ? 'rgba(255,255,255,0.1)'
                        : 'transparent',
                      color: selectedSize === s
                        ? '#fff'
                        : 'rgba(255,255,255,0.35)',
                    }}
                    onMouseEnter={e => {
                      if (selectedSize !== s) {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (selectedSize !== s) {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                      }
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', marginTop: '0.5rem' }}>
                True to size — when in doubt, size up.
              </p>
            </div>
          </div>

          {/* ── CTA buttons (sticky bottom) ── */}
          <div className="px-8 pb-8 pt-5 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {/* Buy Now — primary */}
            <button
              onClick={handleBuyNow}
              className="w-full py-4 font-bold tracking-widest uppercase rounded-xl transition-all duration-150 active:scale-[0.99]"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '0.8rem',
                background: 'linear-gradient(135deg, hsl(0,0%,88%) 0%, hsl(40,8%,95%) 50%, hsl(0,0%,88%) 100%)',
                color: '#000',
              }}
            >
              Buy Now
            </button>

            {/* Add to Cart — secondary */}
            <button
              onClick={handleAdd}
              className="w-full py-4 font-bold tracking-widest uppercase rounded-xl transition-all duration-150 active:scale-[0.99]"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '0.8rem',
                border: addedFlash ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.13)',
                background: addedFlash ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: addedFlash ? '#fff' : 'rgba(255,255,255,0.55)',
              }}
            >
              {addedFlash ? (
                <span className="flex items-center justify-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Added to Cart
                </span>
              ) : 'Add to Cart'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;
