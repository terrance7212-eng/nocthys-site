import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

// ─── LAUNCH DATE ─────────────────────────────────────────────────────────────
// Set this when you have a date. Format freely, e.g. "JULY 2026" or "07.15.2026"
const LAUNCH_DATE = null; // null shows "DATE TBD"
// ─────────────────────────────────────────────────────────────────────────────

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <>
      <Helmet>
        <title>NOCTHYS — Coming Soon</title>
        <meta name="description" content="The ChromeVoid collection is coming. Gothic darkness meets Y2K chrome futurism." />
      </Helmet>

      <div className="relative min-h-screen bg-black text-gray-100 overflow-hidden flex flex-col">

        {/* ── Film grain overlay ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />

        {/* ── Radial glow behind apple ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 55% at 50% 52%, rgba(160,160,180,0.07) 0%, transparent 70%)',
          }}
        />

        {/* ── Top bar ── */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-8 pb-4"
        >
          <img
            src="/images/logo.png"
            alt="NOCTHYS"
            className="h-8 md:h-10 object-contain"
            style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.06))' }}
          />
          <span className="text-gray-600 text-sm tracking-[0.25em] uppercase font-medium">
            ChromeVoid Collection
          </span>
        </motion.header>

        {/* ── Main content ── */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 gap-0">

          {/* Apple */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow ring under apple */}
            <div
              aria-hidden="true"
              className="absolute bottom-[-8%] left-1/2 -translate-x-1/2 w-[70%] h-12 rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(200,200,220,0.12) 0%, transparent 70%)', filter: 'blur(8px)' }}
            />
            <img
              src="/images/apple.png"
              alt="Chrome apple — the forbidden fruit"
              className="w-64 sm:w-80 md:w-96 lg:w-[26rem] relative z-10"
              style={{ filter: 'drop-shadow(0 8px 48px rgba(180,180,210,0.18)) drop-shadow(0 0 80px rgba(140,140,170,0.10))' }}
            />
          </motion.div>

          {/* Coming Soon heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-center mt-10 mb-2"
          >
            <p className="text-gray-600 tracking-[0.4em] uppercase text-xs md:text-sm font-medium mb-3">
              The void awakens
            </p>
            <h1
              className="chrome-text font-bold leading-none tracking-[0.12em] uppercase"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontFamily: 'Rajdhani, sans-serif' }}
            >
              Coming Soon
            </h1>
          </motion.div>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-10"
          >
            {LAUNCH_DATE ? (
              <span
                className="chrome-text tracking-[0.35em] uppercase font-semibold"
                style={{ fontSize: 'clamp(0.9rem, 2vw, 1.25rem)', fontFamily: 'Rajdhani, sans-serif' }}
              >
                {LAUNCH_DATE}
              </span>
            ) : (
              <span className="text-gray-700 tracking-[0.35em] uppercase text-sm font-medium">
                — &nbsp; Date TBD &nbsp; —
              </span>
            )}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent mb-10"
          />

          {/* Tag line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="text-gray-500 text-center text-sm md:text-base leading-relaxed max-w-xs md:max-w-md mb-10 tracking-wide"
          >
            Gothic darkness meets Y2K chrome futurism.<br />
            Pure black void broken only by liquid metal shine.
          </motion.p>

          {/* Email form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="w-full max-w-sm md:max-w-md"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <p className="chrome-text font-semibold tracking-widest uppercase text-sm md:text-base">
                  The void remembers you.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 min-w-0 bg-white/[0.04] border border-white/[0.12] rounded-lg px-4 py-3 text-gray-200 placeholder-gray-700 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="submit"
                  className="shrink-0 px-5 py-3 bg-white/[0.08] border border-white/[0.15] text-gray-200 text-sm font-semibold rounded-lg hover:bg-white/[0.13] hover:border-white/30 transition-all duration-200 tracking-widest uppercase"
                >
                  Notify
                </button>
              </form>
            )}
          </motion.div>

        </main>

        {/* ── Footer ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="relative z-10 text-center pb-8 pt-4"
        >
          <p className="text-gray-800 text-xs tracking-widest uppercase">
            © 2026 NOCTHYS — All rights reserved
          </p>
        </motion.footer>

      </div>
    </>
  );
};

export default ComingSoon;
