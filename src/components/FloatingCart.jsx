import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import CheckoutModal from './CheckoutModal';

const FloatingCart = ({ forceCheckout = false, onCheckoutClose }) => {
  const { items, removeItem, updateQty, total, count } = useCart();
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);

  // Buy Now from product modal triggers checkout directly
  React.useEffect(() => {
    if (forceCheckout && count > 0) {
      setCheckout(true);
      onCheckoutClose?.();
    }
  }, [forceCheckout]);

  // Don't render anything until there's at least one item
  if (count === 0 && !open && !checkout) return null;

  return (
    <>
      {/* ── Floating bag button ── */}
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            key="cart-btn"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/[0.13] hover:border-white/35 transition-colors duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            aria-label="Open cart"
          >
            {/* Bag icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-gray-200">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {/* Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center leading-none">
              {count}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Drawer overlay ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="fixed top-0 right-0 h-full z-50 w-full max-w-sm bg-[#0a0a0a] border-l border-white/[0.08] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
                <div>
                  <h2 className="text-gray-100 font-semibold tracking-widest uppercase text-sm">Your Cart</h2>
                  <p className="text-gray-600 text-xs mt-0.5">{count} {count === 1 ? 'item' : 'items'}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-200 hover:bg-white/[0.06] transition-colors"
                  aria-label="Close cart"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                <AnimatePresence initial={false}>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-4 py-4 border-b border-white/[0.05]"
                    >
                      {/* Thumbnail placeholder */}
                      <div className="w-14 h-14 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0">
                        <span className="chrome-text text-xl font-bold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                          {item.name.charAt(0)}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-gray-200 text-sm font-medium truncate">{item.name}</p>
                        <p className="chrome-text text-sm font-bold mt-0.5">${item.price}</p>

                        {/* Qty controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-6 h-6 rounded border border-white/[0.12] text-gray-400 hover:text-gray-100 hover:border-white/30 text-xs flex items-center justify-center transition-colors"
                          >−</button>
                          <span className="text-gray-300 text-sm w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-6 h-6 rounded border border-white/[0.12] text-gray-400 hover:text-gray-100 hover:border-white/30 text-xs flex items-center justify-center transition-colors"
                          >+</button>
                        </div>
                      </div>

                      {/* Line total + remove */}
                      <div className="flex flex-col items-end justify-between shrink-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-700 hover:text-gray-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                        <p className="text-gray-400 text-sm">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-white/[0.07] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm tracking-wide uppercase">Subtotal</span>
                  <span className="text-gray-100 font-semibold text-lg">${total.toFixed(2)}</span>
                </div>
                <p className="text-gray-700 text-xs">Shipping & taxes calculated at checkout</p>
                <button
                  onClick={() => { setOpen(false); setCheckout(true); }}
                  className="w-full py-3.5 bg-white text-black font-semibold text-sm tracking-widest uppercase rounded-lg hover:bg-gray-100 active:scale-[0.98] transition-all duration-150"
                >
                  Checkout — ${total.toFixed(2)}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Checkout modal ── */}
      <AnimatePresence>
        {checkout && (
          <CheckoutModal
            total={total}
            items={items}
            onClose={() => setCheckout(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCart;
