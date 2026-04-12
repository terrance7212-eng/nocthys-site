import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

// ── Helpers ──────────────────────────────────────────────────────────────────

const fmtCard = (v) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

const fmtExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
};

const cardBrand = (num) => {
  const n = num.replace(/\s/g, '');
  if (/^4/.test(n)) return 'VISA';
  if (/^5[1-5]/.test(n)) return 'MC';
  if (/^3[47]/.test(n)) return 'AMEX';
  return null;
};

// ── Field component ───────────────────────────────────────────────────────────

const Field = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs text-gray-500 tracking-widest uppercase">{label}</label>
    {children}
    {error && <p className="text-red-400 text-xs">{error}</p>}
  </div>
);

const Input = ({ className = '', ...props }) => (
  <input
    {...props}
    className={`w-full bg-white/[0.04] border border-white/[0.10] rounded-lg px-4 py-3 text-gray-100 text-sm placeholder-gray-700 focus:outline-none focus:border-white/30 transition-colors ${className}`}
  />
);

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS = { FORM: 'form', PROCESSING: 'processing', SUCCESS: 'success' };

// ── Main modal ────────────────────────────────────────────────────────────────

const CheckoutModal = ({ total, items, onClose }) => {
  const { clear } = useCart();
  const [step, setStep] = useState(STEPS.FORM);

  const [form, setForm] = useState({
    email: '', name: '', card: '', expiry: '', cvc: '', zip: '',
  });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    let val = e.target.value;
    if (field === 'card') val = fmtCard(val);
    if (field === 'expiry') val = fmtExpiry(val);
    if (field === 'cvc') val = val.replace(/\D/g, '').slice(0, 4);
    if (field === 'zip') val = val.replace(/\D/g, '').slice(0, 5);
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (!form.name.trim()) e.name = 'Name is required';
    const rawCard = form.card.replace(/\s/g, '');
    if (rawCard.length < 16) e.card = 'Card number is incomplete';
    const expParts = form.expiry.replace(/\s/g, '').split('/');
    if (!form.expiry || expParts.length < 2 || expParts[1]?.length < 2) e.expiry = 'Invalid expiry';
    if (form.cvc.length < 3) e.cvc = 'CVC is incomplete';
    if (form.zip.length < 5) e.zip = 'ZIP is required';
    return e;
  };

  const handlePay = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep(STEPS.PROCESSING);
    // Simulate network delay (2.4s)
    setTimeout(() => {
      setStep(STEPS.SUCCESS);
      clear();
    }, 2400);
  };

  const brand = cardBrand(form.card);

  return (
    <motion.div
      key="checkout-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      style={{ zIndex: 60 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/[0.09] rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
      >
        {/* Close button */}
        {step !== STEPS.PROCESSING && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:text-gray-300 hover:bg-white/[0.06] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}

        <AnimatePresence mode="wait">

          {/* ── FORM ── */}
          {step === STEPS.FORM && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Header */}
              <div className="px-7 pt-7 pb-5 border-b border-white/[0.07]">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/images/logo.png" alt="NOCTHYS" className="h-6 object-contain" />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-gray-500 text-sm">Order total</span>
                  <span className="text-gray-100 text-2xl font-semibold">${total.toFixed(2)}</span>
                </div>
                {/* Order summary (collapsed items) */}
                <div className="mt-3 space-y-1">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-xs text-gray-600">
                      <span>{item.name} × {item.qty}</span>
                      <span>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form body */}
              <form onSubmit={handlePay} noValidate className="px-7 py-6 space-y-5">

                <Field label="Email" error={errors.email}>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set('email')}
                    autoComplete="email"
                  />
                </Field>

                <Field label="Name on card" error={errors.name}>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={set('name')}
                    autoComplete="cc-name"
                  />
                </Field>

                <Field label="Card number" error={errors.card}>
                  <div className="relative">
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={form.card}
                      onChange={set('card')}
                      autoComplete="cc-number"
                      className="pr-16"
                    />
                    {brand && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-wider text-gray-500 bg-white/[0.06] px-2 py-0.5 rounded">
                        {brand}
                      </span>
                    )}
                  </div>
                </Field>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <Field label="Expiry" error={errors.expiry}>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="MM / YY"
                        value={form.expiry}
                        onChange={set('expiry')}
                        autoComplete="cc-exp"
                      />
                    </Field>
                  </div>
                  <div className="col-span-1">
                    <Field label="CVC" error={errors.cvc}>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="123"
                        value={form.cvc}
                        onChange={set('cvc')}
                        autoComplete="cc-csc"
                      />
                    </Field>
                  </div>
                  <div className="col-span-1">
                    <Field label="ZIP" error={errors.zip}>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="10001"
                        value={form.zip}
                        onChange={set('zip')}
                        autoComplete="postal-code"
                      />
                    </Field>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-4 bg-white text-black font-semibold text-sm tracking-widest uppercase rounded-xl hover:bg-gray-100 active:scale-[0.99] transition-all duration-150"
                >
                  Pay ${total.toFixed(2)}
                </button>

                {/* Security line */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gray-700">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span className="text-gray-700 text-xs">Secured by Stripe</span>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── PROCESSING ── */}
          {step === STEPS.PROCESSING && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 px-7 gap-6"
            >
              {/* Spinner */}
              <div className="relative w-14 h-14">
                <svg className="animate-spin w-14 h-14 text-white/20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <svg className="animate-spin w-14 h-14 text-white absolute inset-0" style={{ animationDuration: '0.75s' }} viewBox="0 0 24 24" fill="none">
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-center space-y-1">
                <p className="text-gray-200 text-sm font-medium tracking-widest uppercase">Processing</p>
                <p className="text-gray-600 text-xs">Do not close this window</p>
              </div>
            </motion.div>
          )}

          {/* ── SUCCESS ── */}
          {step === STEPS.SUCCESS && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-14 px-7 gap-5 text-center"
            >
              {/* Check circle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-100">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </motion.div>

              <div className="space-y-2">
                <h2 className="chrome-text text-2xl font-bold tracking-widest uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Order Placed
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  Thank you for your order. A confirmation will be sent to your email shortly.
                </p>
              </div>

              <div className="w-full pt-2 border-t border-white/[0.07] mt-2">
                <p className="text-gray-700 text-xs mb-4">
                  Order #{Math.random().toString(36).slice(2, 9).toUpperCase()}
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-white/[0.07] border border-white/[0.12] text-gray-300 font-semibold text-sm tracking-widest uppercase rounded-xl hover:bg-white/[0.11] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutModal;
