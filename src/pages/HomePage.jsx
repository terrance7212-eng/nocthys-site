import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard.jsx';
import FloatingCart from '@/components/FloatingCart.jsx';
import ProductModal from '@/components/ProductModal.jsx';

const EASE = [0.16, 1, 0.3, 1];

const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const products = [
    { id: 1,  name: 'Void Serpent Tee',         price: 47,  image: '/images/product-serpent.png' },
    { id: 2,  name: 'Chrome Skull Oversized',    price: 64,  image: '/images/product-skull-baroque.png' },
    { id: 3,  name: 'Liquid Metal Longsleeve',   price: 52,  image: '/images/product-ram-skull-ornate.png' },
    { id: 4,  name: 'Gothic Mandala Crop',       price: 38,  image: '/images/product-scorpion.png' },
    { id: 5,  name: 'Y2K Occult Hoodie',         price: 78,  image: '/images/product-raven.png' },
    { id: 6,  name: 'Silver Sigil Tank',         price: 34,  image: '/images/product-mask.png' },
    { id: 7,  name: 'Platinum Runes Tee',        price: 49,  image: '/images/product-skull-sword.png' },
    { id: 8,  name: 'Dark Chrome Logo',          price: 44,  image: '/images/product-dual-skulls.png' },
  ];

  return (
    <>
      <Helmet>
        <title>NOCTHYS — ChromeVoid Collection</title>
        <meta name="description" content="Gothic darkness meets Y2K chrome futurism. Pure black void broken only by liquid metal shine." />
      </Helmet>

      <div className="bg-black text-gray-100 overflow-x-hidden">

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

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">

          {/* Radial glow */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(140,140,170,0.07) 0%, transparent 68%)' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <motion.img
              src="/images/logo.webp"
              alt="NOCTHYS"
              className="w-[92vw] md:w-[41rem] lg:w-[60rem] mx-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mt-8 mb-12 text-balance"
            >
              Gothic darkness meets Y2K chrome futurism. Pure black void broken only by liquid metal shine. Dark, cold, futuristic, with an edge of the occult.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <a
                href="#products"
                className="inline-block font-bold tracking-widest uppercase rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '0.85rem',
                  padding: '1rem 2.8rem',
                  background: 'linear-gradient(135deg, hsl(0,0%,72%) 0%, hsl(40,8%,92%) 50%, hsl(0,0%,72%) 100%)',
                  color: '#000',
                }}
              >
                Explore Collection
              </a>
            </motion.div>
          </div>
        </section>

        {/* ══ ABOUT ═════════════════════════════════════════════════════════ */}
        <section id="about" className="py-32 relative">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Chrome figure */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="/images/chrome-woman-crown.png"
                  alt="Chrome figure — the void personified"
                  className="w-full rounded-2xl"
                  style={{
                    mixBlendMode: 'screen',
                    filter: 'drop-shadow(0 12px 56px rgba(140,140,170,0.14)) drop-shadow(0 0 80px rgba(120,120,160,0.07))',
                  }}
                />
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.18 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-gray-500 text-base uppercase tracking-widest mb-2">The aesthetic</p>
                <h2 className="chrome-text text-balance">The ChromeVoid</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed text-xl">
                  <p>
                    NOCTHYS exists at the intersection of gothic mysticism and Y2K digital futurism. Each piece channels the void — pure darkness interrupted only by liquid chrome reflections.
                  </p>
                  <p>
                    Our designs merge occult symbolism with metallic precision, creating garments that feel both ancient and impossibly futuristic. Cold steel meets warm flesh. Digital meets spiritual.
                  </p>
                  <p>
                    This is fashion for those who embrace the darkness and find beauty in the chrome-lit void.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ COLLECTION ════════════════════════════════════════════════════ */}
        <section id="products" className="py-24">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-gray-500 text-sm uppercase tracking-widest mb-3">ChromeVoid Drop</p>
              <h2 className="chrome-text text-balance mb-4">Collection</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">All black. Always.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onOpenModal={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
        <footer id="footer" className="py-14 bg-black"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">

              <div className="text-center md:text-left">
                <span className="text-2xl font-bold chrome-text tracking-wider">NOCTHYS</span>
                <p className="text-gray-500 text-sm mt-2">ChromeVoid Collection</p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors duration-200">
                  Instagram
                </a>
                <p className="text-gray-600 text-sm">Design by Teresa</p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-2">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {['Privacy Policy', 'Terms of Service'].map(l => (
                    <a key={l} href="#" className="hover:text-gray-300 transition-colors duration-200">{l}</a>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">© 2026 NOCTHYS. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <FloatingCart
        forceCheckout={checkoutOpen}
        onCheckoutClose={() => setCheckoutOpen(false)}
      />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onCheckoutNow={() => setCheckoutOpen(true)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePage;
