import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

// ─── LAUNCH DATE ─────────────────────────────────────────────────────────────
// Set this when you have a date. Format freely, e.g. "JULY 2026" or "07.15.2026"
const LAUNCH_DATE = null; // null shows "DATE TBD"
// ─────────────────────────────────────────────────────────────────────────────

const ComingSoon = () => {
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
            src="/images/logo.webp"
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
              src="/images/apple.webp"
              alt="Chrome apple — the forbidden fruit"
              className="w-52 sm:w-64 md:w-72 lg:w-80 aspect-square object-contain relative z-10"
              style={{ filter: 'drop-shadow(0 8px 48px rgba(180,180,210,0.18)) drop-shadow(0 0 80px rgba(140,140,170,0.10))' }}
            />
          </motion.div>

          {/* Coming Soon heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-center mt-6 mb-3"
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

        </main>

        {/* ── Footer ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="relative z-10 text-center pb-8 pt-4"
        >
          <p className="text-gray-800 text-xs tracking-widest uppercase">
            © 2026 NOCTHYS. All rights reserved.
          </p>
        </motion.footer>

      </div>
    </>
  );
};

export default ComingSoon;
