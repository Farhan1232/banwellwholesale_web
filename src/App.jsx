import { useState, useEffect, useRef } from "react";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #e41e26;
    --red-dark: #b81219;
    --dark: #1a1a2e;
    --darker: #0d0d1a;
    --mid: #16213e;
    --white: #ffffff;
    --light: #f5f5f5;
    --gray: #888;
    --border: #e0e0e0;
    --text: #222;
    --shadow: 0 4px 24px rgba(0,0,0,0.10);
    --shadow-lg: 0 8px 40px rgba(0,0,0,0.16);
    --radius: 10px;
    --font: 'Barlow', sans-serif;
    --font-cond: 'Barlow Condensed', sans-serif;
  }

html, body { width: 100%; max-width: 100%; overflow-x: hidden; margin: 0; padding: 0; }
body { font-family: var(--font); color: var(--text); background: #fff; margin: 0; padding: 0; }
#root, [data-reactroot] { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }

  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; border: none; font-family: var(--font); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes countdown {
    from { transform: scale(1.1); }
    to   { transform: scale(1); }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-10px); }
  }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  .animate-fadeUp  { animation: fadeUp 0.6s ease both; }
  .animate-fadeIn  { animation: fadeIn 0.5s ease both; }
  .animate-slideR  { animation: slideRight 0.6s ease both; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #f1f1f1; }
  ::-webkit-scrollbar-thumb { background: var(--red); border-radius: 3px; }

  /* ── TOPBAR ── */
  .topbar {
    background: var(--darker);
    color: #aaa;
    font-size: 13px;
    padding: 8px 0;
    border-bottom: 1px solid #2a2a3e;
    width: 100%;
  }
  .topbar-inner {
    width: 100%;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .topbar-left { display: flex; gap: 20px; }
  .topbar-left span { display: flex; align-items: center; gap: 6px; }
  .topbar-right { display: flex; gap: 20px; align-items: center; }
  .topbar a:hover { color: var(--red); transition: color 0.2s; }

  /* ── HEADER ── */
  .header {
    background: var(--dark);
    padding: 16px 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 20px rgba(0,0,0,0.4);
    width: 100%;
  }
  .header-inner {
    width: 100%;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  /* ── LOGO ── */
  .logo-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    text-decoration: none;
  }
  .logo-img {
    height: 42px;
    width: auto;
    object-fit: contain;
    display: block;
    mix-blend-mode: screen;
    filter: brightness(1.1) contrast(1.05);
    background: transparent;
  }
  .logo-img-fallback {
    height: 42px;
    width: 42px;
    background: var(--red);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-cond);
    font-size: 22px;
    font-weight: 900;
    color: #fff;
    letter-spacing: -1px;
    flex-shrink: 0;
  }
  .logo {
    font-family: var(--font-cond);
    font-size: 28px;
    font-weight: 800;
    color: #fff;
    letter-spacing: 1px;
    white-space: nowrap;
  }
  .logo span { color: var(--red); }

  .search-bar {
    flex: 1;
    display: flex;
    min-width: 200px;
    max-width: 560px;
  }
  .search-bar select {
    background: #2a2a3e;
    color: #ccc;
    border: none;
    padding: 0 14px;
    border-radius: 6px 0 0 6px;
    font-size: 13px;
    font-family: var(--font);
    outline: none;
    cursor: pointer;
    border-right: 1px solid #3a3a5e;
  }
  .search-bar input {
    flex: 1;
    border: none;
    padding: 12px 16px;
    background: #fff;
    font-family: var(--font);
    font-size: 14px;
    outline: none;
  }
  .search-bar button {
    background: var(--red);
    color: #fff;
    padding: 0 24px;
    border-radius: 0 6px 6px 0;
    font-weight: 700;
    font-size: 14px;
    transition: background 0.2s;
  }
  .search-bar button:hover { background: var(--red-dark); }

  .header-actions {
    display: flex;
    gap: 20px;
    margin-left: auto;
  }
  .header-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ccc;
    font-size: 12px;
    gap: 4px;
    position: relative;
    cursor: pointer;
    transition: color 0.2s;
  }
  .header-action:hover { color: var(--red); }
  .header-action svg { width: 22px; height: 22px; }

  /* ── NAV ── */
  .nav {
    background: #fff;
    border-bottom: 2px solid var(--border);
    position: sticky;
    top: 74px;
    z-index: 999;
    width: 100%;
  }
  .nav-inner {
    width: 100%;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 0;
  }
  .nav-link {
    display: inline-block;
    padding: 14px 20px;
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 3px solid transparent;
    transition: color 0.2s, border-color 0.2s;
    white-space: nowrap;
    cursor: pointer;
  }
  .nav-link:hover, .nav-link.active { color: var(--red); border-bottom-color: var(--red); }

  /* ── TICKER ── */
  .ticker {
    background: var(--red);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    padding: 8px 0;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
  .ticker-track { display: flex; width: max-content; animation: ticker 35s linear infinite; }
  .ticker-segment { display: inline-block; padding-right: 0; }

  /* ── HERO ── */
  .hero {
    position: relative;
    overflow: hidden;
    height: 520px;
    width: 100%;
  }
  .hero-slide {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .hero-slide.active { opacity: 1; z-index: 2; }
  .hero-slide.inactive { opacity: 0; z-index: 1; }
  .hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transform: scale(1.05);
    transition: transform 8s ease;
  }
  .hero-slide.active .hero-bg { transform: scale(1); }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(10,10,30,0.85) 0%, rgba(10,10,30,0.4) 60%, transparent 100%); }
  .hero-content {
    position: relative;
    z-index: 3;
    width: 100%;
    padding: 0 48px;
  }
  .hero-tag {
    display: inline-block;
    background: var(--red);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 6px 14px;
    border-radius: 4px;
    margin-bottom: 16px;
    animation: fadeUp 0.5s 0.1s both;
  }
  .hero-title {
    font-family: var(--font-cond);
    font-size: 58px;
    font-weight: 900;
    color: #fff;
    line-height: 1.05;
    margin-bottom: 16px;
    max-width: 520px;
    animation: fadeUp 0.5s 0.2s both;
    text-shadow: 0 2px 12px rgba(0,0,0,0.3);
  }
  .hero-sub {
    font-size: 17px;
    color: rgba(255,255,255,0.85);
    margin-bottom: 32px;
    max-width: 400px;
    animation: fadeUp 0.5s 0.3s both;
  }
  .hero-btns { display: flex; gap: 14px; animation: fadeUp 0.5s 0.4s both; flex-wrap: wrap; }
  .btn-primary {
    background: var(--red);
    color: #fff;
    padding: 14px 32px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    cursor: pointer;
    border: none;
    font-family: var(--font);
  }
  .btn-primary:hover { background: var(--red-dark); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(228,30,38,0.35); }
  .btn-outline {
    background: transparent;
    color: #fff;
    padding: 14px 32px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 2px solid rgba(255,255,255,0.6);
    transition: border-color 0.2s, background 0.2s;
    cursor: pointer;
    font-family: var(--font);
  }
  .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.1); }

  .hero-dots {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: 8px;
  }
  .hero-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    transition: background 0.3s, width 0.3s;
    cursor: pointer;
    border: none;
  }
  .hero-dot.active { background: var(--red); width: 28px; border-radius: 5px; }

  .hero-arrows {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    z-index: 10;
    transform: translateY(-50%);
    pointer-events: none;
  }
  .hero-arrow {
    pointer-events: all;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.25);
    color: #fff;
    width: 46px; height: 46px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    transition: background 0.2s;
    cursor: pointer;
  }
  .hero-arrow:hover { background: var(--red); }

  /* ── CATEGORY BANNERS ── */
  .cat-banners {
    width: 100%;
    padding: 0 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 60px;
  }
  .cat-banner {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    height: 180px;
    cursor: pointer;
    background: var(--dark);
  }
  .cat-banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(228,30,38,0.92) 0%, rgba(10,10,30,0.85) 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 28px 32px;
    transition: background 0.3s;
  }
  .cat-banner:hover .cat-banner-overlay { background: linear-gradient(135deg, rgba(228,30,38,1) 0%, rgba(10,10,30,0.9) 100%); }
  .cat-banner-icon { font-size: 28px; margin-bottom: 10px; }
  .cat-banner-title {
    font-family: var(--font-cond);
    font-size: 22px;
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .cat-banner-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: rgba(255,255,255,0.8);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: gap 0.2s;
  }
  .cat-banner:hover .cat-banner-link { gap: 10px; color: #fff; }

  /* ── SECTIONS ── */
  .section {
    width: 100%;
    padding: 0 24px;
    margin-top: 60px;
  }
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .section-title {
    font-family: var(--font-cond);
    font-size: 28px;
    font-weight: 800;
    color: var(--dark);
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    padding-bottom: 10px;
  }
  .section-title::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 48px; height: 3px;
    background: var(--red);
    border-radius: 2px;
  }
  .section-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
  .tab-btn {
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    background: var(--light);
    color: var(--gray);
    transition: background 0.2s, color 0.2s;
    border: none;
    cursor: pointer;
    font-family: var(--font);
  }
  .tab-btn:hover, .tab-btn.active { background: var(--red); color: #fff; }
  .view-all {
    color: var(--red);
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: gap 0.2s;
    cursor: pointer;
  }
  .view-all:hover { gap: 8px; }

  /* ── PRODUCT CARD — B2B / Trade Distribution style ── */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
  }
  .product-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: box-shadow 0.25s, transform 0.25s;
    position: relative;
    animation: fadeUp 0.5s ease both;
  }
  .product-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
  .product-img-wrap {
    position: relative;
    height: 200px;
    overflow: hidden;
    background: var(--light);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .product-img-wrap img { 
    width: 100%; 
    height: 100%; 
    object-fit: contain; 
    transition: transform 0.4s ease; 
  }
  .product-card:hover .product-img-wrap img { transform: scale(1.06); }
  .product-badge {
    position: absolute;
    top: 12px; left: 12px;
    background: var(--red);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 4px;
    text-transform: uppercase;
  }
  .product-badge.new { background: #16a34a; }
  .product-badge.available { background: #0369a1; }

  .product-info { padding: 18px; }
  .product-brand {
    font-size: 11px;
    color: var(--red);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  .product-name {
    font-size: 15px;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 8px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .product-ean {
    font-size: 11px;
    color: var(--gray);
    margin-bottom: 14px;
    font-family: monospace;
    letter-spacing: 0.5px;
  }
  .product-availability {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #16a34a;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    padding: 4px 10px;
    border-radius: 4px;
    margin-bottom: 14px;
  }
  .product-availability.limited { color: #b45309; background: #fffbeb; border-color: #fde68a; }

  /* Contact to order button — B2B style */
  .contact-btn {
    width: 100%;
    background: var(--dark);
    color: #fff;
    padding: 11px;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-radius: 6px;
    transition: background 0.2s;
    border: none;
    cursor: pointer;
    font-family: var(--font);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
  }
  .contact-btn:hover { background: var(--red); }

  /* ── DISTRIBUTION BADGE STRIP ── */
  .dist-strip {
    width: 100%;
    background: var(--dark);
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    margin-top: 0;
  }
  .dist-strip-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255,255,255,0.85);
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .dist-strip-item span { color: var(--red); font-size: 18px; }

  /* ── DEAL BANNER ── */
  .deal-banner {
    background: linear-gradient(120deg, var(--dark) 0%, var(--mid) 50%, var(--dark) 100%);
    margin-top: 60px;
    padding: 60px 0;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .deal-banner::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 320px; height: 320px;
    background: rgba(228,30,38,0.08);
    border-radius: 50%;
  }
  .deal-inner {
    width: 100%;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 40px;
  }
  .deal-text { color: #fff; }
  .deal-label {
    display: inline-block;
    background: var(--red);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 4px;
    margin-bottom: 12px;
  }
  .deal-title {
    font-family: var(--font-cond);
    font-size: 42px;
    font-weight: 900;
    margin-bottom: 8px;
    line-height: 1.1;
  }
  .deal-title span { color: var(--red); }
  .deal-sub { color: rgba(255,255,255,0.7); font-size: 16px; margin-bottom: 28px; }
  .countdown {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  .countdown-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--red);
    border-radius: 10px;
    padding: 14px 18px;
    min-width: 72px;
    animation: countdown 0.3s ease;
  }
  .countdown-num {
    font-family: var(--font-cond);
    font-size: 32px;
    font-weight: 900;
    color: #fff;
    line-height: 1;
  }
  .countdown-label { font-size: 11px; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

  /* ── TOP GRID ── */
  .top-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .top-col { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
  .top-col-title {
    font-family: var(--font-cond);
    font-size: 17px;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--dark);
    border-bottom: 2px solid var(--border);
    padding-bottom: 12px;
    margin-bottom: 16px;
  }
  .top-item {
    display: flex;
    gap: 14px;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    transition: background 0.2s;
    cursor: pointer;
  }
  .top-item:last-child { border-bottom: none; }
  .top-item:hover { background: var(--light); margin: 0 -8px; padding: 12px 8px; border-radius: 6px; }
  .top-item img { width: 64px; height: 64px; object-fit: contain; border-radius: 6px; background: var(--light); padding: 4px; }
  .top-item-info { flex: 1; min-width: 0; }
  .top-item-brand { font-size: 10px; color: var(--red); font-weight: 700; text-transform: uppercase; }
  .top-item-name { font-size: 13px; font-weight: 600; color: var(--dark); margin: 2px 0 4px; line-height: 1.3; }

  /* ── BRAND LOGOS ── */
  .brands-section {
    background: var(--light);
    padding: 48px 0;
    margin-top: 60px;
    overflow: hidden;
    width: 100%;
  }
  .brands-title {
    text-align: center;
    font-family: var(--font-cond);
    font-size: 24px;
    font-weight: 800;
    color: var(--dark);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 32px;
  }
  .brands-scroll-wrap { overflow: hidden; width: 100%; }
  .brands-scroll { display: flex; width: max-content; animation: ticker 24s linear infinite; }
  .brand-logo-item {
    flex-shrink: 0;
    width: 160px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    transition: transform 0.2s;
  }
  .brand-logo-item:hover { transform: scale(1.08); }
  .brand-logo-item svg { width: 100%; height: 100%; }

  /* ── FEATURES ── */
  .features {
    width: 100%;
    padding: 0 24px;
    margin-top: 60px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .feature-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px 20px;
    text-align: center;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .feature-card:hover { box-shadow: var(--shadow); transform: translateY(-3px); }
  .feature-icon {
    width: 56px; height: 56px;
    background: rgba(228,30,38,0.08);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
    color: var(--red);
  }
  .feature-title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
  .feature-text { font-size: 13px; color: var(--gray); line-height: 1.5; }

  /* ── TESTIMONIALS ── */
  .testimonials {
    background: linear-gradient(135deg, var(--dark) 0%, var(--mid) 100%);
    padding: 72px 0;
    margin-top: 60px;
    overflow: hidden;
    width: 100%;
  }
  .testimonials-inner { width: 100%; padding: 0 24px; }
  .testimonials-title {
    text-align: center;
    font-family: var(--font-cond);
    font-size: 32px;
    font-weight: 800;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 48px;
    position: relative;
  }
  .testimonials-title span { color: var(--red); }
  .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .review-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius);
    padding: 28px;
    backdrop-filter: blur(8px);
    transition: background 0.25s, transform 0.25s;
  }
  .review-card:hover { background: rgba(255,255,255,0.10); transform: translateY(-4px); }
  .review-stars { display: flex; gap: 3px; margin-bottom: 14px; color: #f59e0b; }
  .review-text { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.7; margin-bottom: 20px; font-style: italic; }
  .review-author { display: flex; align-items: center; gap: 12px; }
  .review-avatar {
    width: 44px; height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--red);
  }
  .review-name { font-weight: 700; color: #fff; font-size: 14px; }
  .review-loc { font-size: 12px; color: rgba(255,255,255,0.5); }

  /* ── ABOUT ── */
  .about {
    width: 100%;
    padding: 0 24px;
    margin-top: 72px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  .about-img-wrap { position: relative; }
  .about-img-wrap img { width: 100%; height: 420px; object-fit: cover; border-radius: var(--radius); }
  .about-badge-float {
    position: absolute;
    bottom: -20px; right: -20px;
    background: var(--red);
    color: #fff;
    padding: 20px 24px;
    border-radius: var(--radius);
    text-align: center;
    box-shadow: var(--shadow-lg);
  }
  .about-badge-num { font-family: var(--font-cond); font-size: 40px; font-weight: 900; }
  .about-badge-label { font-size: 12px; font-weight: 600; opacity: 0.9; }
  .about-tag {
    display: inline-block;
    background: rgba(228,30,38,0.1);
    color: var(--red);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 6px 14px;
    border-radius: 4px;
    margin-bottom: 16px;
  }
  .about-title {
    font-family: var(--font-cond);
    font-size: 38px;
    font-weight: 900;
    color: var(--dark);
    line-height: 1.1;
    margin-bottom: 20px;
  }
  .about-title span { color: var(--red); }
  .about-text { font-size: 15px; color: #555; line-height: 1.8; margin-bottom: 16px; }
  .about-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 28px; }
  .about-stat { text-align: center; padding: 16px; border: 1px solid var(--border); border-radius: 8px; }
  .about-stat-num { font-family: var(--font-cond); font-size: 28px; font-weight: 900; color: var(--red); }
  .about-stat-label { font-size: 12px; color: var(--gray); margin-top: 4px; }

  /* ── NEWSLETTER ── */
  .newsletter {
    background: var(--red);
    padding: 56px 0;
    margin-top: 60px;
    width: 100%;
  }
  .newsletter-inner {
    width: 100%;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    flex-wrap: wrap;
  }
  .newsletter-text h3 { font-family: var(--font-cond); font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 6px; }
  .newsletter-text p { color: rgba(255,255,255,0.85); font-size: 15px; }
  .newsletter-form { display: flex; gap: 0; flex: 1; max-width: 460px; min-width: 260px; }
  .newsletter-form input {
    flex: 1;
    padding: 14px 20px;
    border: none;
    border-radius: 6px 0 0 6px;
    font-family: var(--font);
    font-size: 14px;
    outline: none;
  }
  .newsletter-form button {
    background: var(--dark);
    color: #fff;
    padding: 14px 24px;
    border-radius: 0 6px 6px 0;
    font-weight: 700;
    font-size: 14px;
    transition: background 0.2s;
    border: none;
    cursor: pointer;
    font-family: var(--font);
  }
  .newsletter-form button:hover { background: #000; }

  /* ── CONTACT ── */
  .contact {
    width: 100%;
    padding: 0 24px;
    margin-top: 72px;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 56px;
    align-items: start;
  }
  .contact-info-title { font-family: var(--font-cond); font-size: 32px; font-weight: 900; color: var(--dark); margin-bottom: 12px; }
  .contact-info-sub { color: #555; font-size: 15px; line-height: 1.7; margin-bottom: 32px; }
  .contact-detail { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 20px; }
  .contact-detail-icon {
    width: 44px; height: 44px;
    background: rgba(228,30,38,0.1);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--red);
    flex-shrink: 0;
  }
  .contact-detail-text h4 { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 2px; }
  .contact-detail-text p { font-size: 13px; color: var(--gray); line-height: 1.5; }
  .contact-form { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 36px; box-shadow: var(--shadow); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
  .form-group label { font-size: 13px; font-weight: 600; color: var(--dark); }
  .form-group input, .form-group textarea, .form-group select {
    padding: 12px 16px;
    border: 1.5px solid var(--border);
    border-radius: 6px;
    font-family: var(--font);
    font-size: 14px;
    color: var(--text);
    transition: border-color 0.2s;
    outline: none;
    background: #fff;
  }
  .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: var(--red); }
  .form-group textarea { resize: vertical; min-height: 110px; }

  /* ── FOOTER ── */
  .footer {
    background: var(--darker);
    color: rgba(255,255,255,0.7);
    margin-top: 72px;
    padding: 60px 0 0;
    width: 100%;
  }
  .footer-inner { width: 100%; padding: 0 24px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
  .footer-brand-name { font-family: var(--font-cond); font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 14px; }
  .footer-brand-name span { color: var(--red); }
  .footer-about { font-size: 13px; line-height: 1.7; margin-bottom: 20px; }
  .footer-col h4 { font-size: 14px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }
  .footer-link {
    display: block;
    font-size: 13px;
    color: rgba(255,255,255,0.6);
    padding: 4px 0;
    transition: color 0.2s, padding-left 0.2s;
    cursor: pointer;
  }
  .footer-link:hover { color: var(--red); padding-left: 6px; }
  .footer-bottom {
    margin-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 20px 24px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .footer-bottom-bar {
    background: var(--darker);
    border-top: 1px solid rgba(255,255,255,0.06);
    width: 100%;
  }
  .footer-reg {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
  }

  /* ── TOAST ── */
  .toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: var(--dark);
    color: #fff;
    padding: 14px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    z-index: 9999;
    box-shadow: var(--shadow-lg);
    animation: fadeUp 0.4s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 320px;
  }
  .toast-icon { color: #22c55e; font-size: 18px; }

  /* ── MOBILE NAV ── */
  .mobile-nav-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1200; animation: fadeIn 0.3s; }
  .mobile-nav {
    position: fixed;
    top: 0; left: 0;
    width: 280px;
    height: 100%;
    background: var(--dark);
    z-index: 1201;
    padding: 20px;
    overflow-y: auto;
    animation: slideRight 0.35s ease;
  }
  .mobile-nav-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .mobile-nav-close { background: rgba(255,255,255,0.1); color: #fff; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
  .mobile-nav-link { display: block; padding: 12px 0; color: rgba(255,255,255,0.8); font-size: 15px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.07); cursor: pointer; }
  .mobile-nav-link:hover { color: var(--red); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1100px) {
    .top-grid { grid-template-columns: 1fr 1fr; }
    .features { grid-template-columns: repeat(2, 1fr); }
    .footer-inner { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 900px) {
    .hero { height: 400px; }
    .hero-title { font-size: 38px; }
    .cat-banners { grid-template-columns: 1fr 1fr; }
    .about { grid-template-columns: 1fr; }
    .about-img-wrap { display: none; }
    .contact { grid-template-columns: 1fr; }
    .reviews-grid { grid-template-columns: 1fr 1fr; }
    .top-grid { grid-template-columns: 1fr; }
    .dist-strip { gap: 20px; }
  }
  @media (max-width: 720px) {
    .header-inner { gap: 12px; }
    .nav-inner { overflow-x: auto; gap: 0; }
    .cat-banners { grid-template-columns: 1fr; }
    .products-grid { grid-template-columns: repeat(2, 1fr); }
    .features { grid-template-columns: 1fr 1fr; }
    .footer-inner { grid-template-columns: 1fr; }
    .reviews-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .deal-title { font-size: 28px; }
    .about-stats { grid-template-columns: repeat(3, 1fr); }
    .hero-title { font-size: 30px; }
    .hero { height: 340px; }
    .newsletter-inner { flex-direction: column; }
    .topbar-left { flex-direction: column; gap: 4px; }
    .search-bar select { display: none; }
    .header-actions { gap: 14px; }
  }
  @media (max-width: 480px) {
    .products-grid { grid-template-columns: 1fr; }
    .features { grid-template-columns: 1fr; }
    .about-stats { grid-template-columns: 1fr; }
  }
`;

// ─── BRAND SVG LOGOS ──────────────────────────────────────────────────────────
const BrandLogos = {
  Apple: () => (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.2 6.4c1.5-1.8 2.5-4.3 2.2-6.8-2.2.1-4.8 1.5-6.4 3.2-1.4 1.6-2.6 4.2-2.3 6.6 2.5.2 5-1.2 6.5-3zm2.2 3.4c-3.6-.2-6.6 2-8.3 2-.3-.1-1.6-1.8-4.4-1.8-2.2 0-5.7 1.8-7 5.6-1.7 4.8 1.2 12.7 4.2 15.9 1.3 1.5 2.9 3.1 5 3 1-.1 2.7-1.2 4.6-1.2 1.9 0 3.4 1.2 4.7 1.2 2 .1 3.4-1.7 4.7-3.1 1-1.2 1.6-2.5 2.1-3.5-3.6-1.3-5.3-5.4-5.2-8.9 0-3.2 1.6-6 4.2-7.6-1.4-2-3.8-3.4-4.6-3.6z" fill="#333"/>
      <text x="38" y="22" fontFamily="'SF Pro Display', -apple-system, sans-serif" fontWeight="700" fontSize="14" fill="#333" letterSpacing="-0.5">Apple</text>
    </svg>
  ),
  Samsung: () => (
    <svg viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="21" fontFamily="'SamsungOne', Arial, sans-serif" fontWeight="700" fontSize="18" fill="#1428A0" letterSpacing="-0.3">SAMSUNG</text>
    </svg>
  ),
  Sony: () => (
    <svg viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="22" fontFamily="'SST', Arial, sans-serif" fontWeight="700" fontSize="22" fill="#000" letterSpacing="2">SONY</text>
    </svg>
  ),
  Dyson: () => (
    <svg viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20" fill="#C00" letterSpacing="1">DYSON</text>
    </svg>
  ),
  Nintendo: () => (
    <svg viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="21" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#E4000F" letterSpacing="0.5">NINTENDO</text>
    </svg>
  ),
  Microsoft: () => (
    <svg viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="4" width="9" height="9" fill="#F25022"/>
      <rect x="10" y="4" width="9" height="9" fill="#7FBA00"/>
      <rect x="0" y="14" width="9" height="9" fill="#00A4EF"/>
      <rect x="10" y="14" width="9" height="9" fill="#FFB900"/>
      <text x="24" y="20" fontFamily="'Segoe UI', Arial, sans-serif" fontWeight="600" fontSize="14" fill="#333" letterSpacing="0">Microsoft</text>
    </svg>
  ),
  Gigabyte: () => (
    <svg viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#E31E24" letterSpacing="0.5">GIGABYTE</text>
    </svg>
  ),
  PNY: () => (
    <svg viewBox="0 0 70 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" fill="#003087" letterSpacing="2">PNY</text>
    </svg>
  ),
  Xbox: () => (
    <svg viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20" fill="#107C10" letterSpacing="1">XBOX</text>
    </svg>
  ),
  Braun: () => (
    <svg viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="2" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20" fill="#00478C" letterSpacing="1">BRAUN</text>
    </svg>
  ),
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", section: "home" },
  { label: "Stock Lines", section: "hot-deals" },
  { label: "Products", section: "products" },
  { label: "Apple", section: "products" },
  { label: "Gaming", section: "products" },
  { label: "Audio", section: "products" },
  { label: "Components", section: "products" },
  { label: "About", section: "about" },
  { label: "Contact", section: "contact" },
];

const HERO_SLIDES = [
  {
    tag: "Available Now — Trade Pricing",
    title: "Apple MacBook Pro M4",
    sub: "Next-generation performance for professionals. Wholesale trade pricing for authorised buyers.",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80",
    cta: "Request Trade Pricing",
  },
  {
    tag: "Bulk Distribution",
    title: "Nintendo Switch 2",
    sub: "The next generation of Nintendo gaming. Bulk distribution pricing for trade accounts.",
    img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=1200&q=80",
    cta: "Contact Our Team",
  },
  {
    tag: "Premium Audio — Wholesale",
    title: "Sony WH-1000XM5",
    sub: "Industry-leading noise cancellation. Competitive wholesale pricing for trade partners.",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
    cta: "Get Trade Pricing",
  },
];

const CAT_BANNERS = [
  {
    title: "Apple Products",
    icon: "🍎",
    sub: "MacBooks · iPhones · iPads · AirPods",
    cat: "Apple",
    section: "products",
  },
  {
    title: "Gaming & Consoles",
    icon: "🎮",
    sub: "PlayStation · Nintendo · Xbox",
    cat: "Gaming",
    section: "products",
  },
  {
    title: "PC Components",
    icon: "🖥️",
    sub: "GPUs · Storage · Peripherals",
    cat: "Components",
    section: "products",
  },
];

const PRODUCTS = {
  Apple: [
    { id: 1,  brand: "Apple",   name: "MacBook Air M3 13\"",                      ean: "",                  img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", badge: "In Stock" },
    { id: 2,  brand: "Apple",   name: "MacBook Pro M4 14\"",                      ean: "",                  img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80", badge: "New" },
    { id: 3,  brand: "Apple",   name: "AirPods 4 with Active Noise Cancellation", ean: "MXP93ZM/A",         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSn4HrB5N3P29xaidxzzX--0AeON14f0c0g&s", badge: "In Stock" },
    { id: 4,  brand: "Apple",   name: "Apple Pencil Pro",                         ean: "MX2D3ZM/A",         img: "https://images.unsplash.com/photo-1638038857726-966d68eeb616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEFwcGxlJTIwUGVuY2lsJTIwUHJvfGVufDB8fDB8fHww", badge: "In Stock" },
  ],
  Gaming: [
    { id: 5,  brand: "Sony",    name: "PS5 Console Digital Edition Slim 825GB",   ean: "",                  img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80", badge: "Limited" },
    { id: 6,  brand: "Nintendo",name: "Nintendo Switch 2",                        ean: "",                  img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80", badge: "New" },
    { id: 7,  brand: "Microsoft",name: "Xbox Series X",                           ean: "",                  img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80", badge: "In Stock" },
    { id: 8,  brand: "Sony",    name: "DS5 Controllers",                          ean: "",                  img: "https://images.unsplash.com/photo-1774105416451-14ca0ff4e953?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RFM1JTIwQ29udHJvbGxlcnN8ZW58MHx8MHx8fDA%3D", badge: "In Stock" },
  ],
  Audio: [
    { id: 9,  brand: "Sony",    name: "WH-1000XM5 Wireless Headphones + Softcase",ean: "",                  img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", badge: "In Stock" },
    { id: 10, brand: "Dyson",   name: "Dyson HS08 Airwrap Complete",              ean: "",                  img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&q=80", badge: "New" },
    { id: 11, brand: "Braun",   name: "ThermoScan IRT3030 Ear Thermometer",       ean: "4022167330307",     img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&q=80", badge: "In Stock" },
  ],
  Components: [
    { id: 12, brand: "Gigabyte",name: "GeForce RTX 5090 Graphics Card",           ean: "",                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-sn3HDft7eoMtcmN_tPkg4L_O9UQ-z12d1A&s", badge: "Limited" },
    { id: 13, brand: "PNY",     name: "GeForce RTX 5090 Triple Fan",              ean: "",                  img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80", badge: "New" },
  ],
};

const ALL_PRODUCTS = Object.values(PRODUCTS).flat();

const TOP_COLS = [
  {
    label: "Apple",
    items: [
      { brand: "Apple",  name: "MacBook Pro M4 14\"",           img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=70" },
      { brand: "Apple",  name: "AirPods 4 ANC (MXP93ZM/A)",     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRk7RtYLyNwu2kyz7uW5H_ZyA6CaQzv8iCAg&s" },
      { brand: "Apple",  name: "Apple Pencil Pro (MX2D3ZM/A)",  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy3nFOPhviwjvAocSN-ykoZVs32sOq3to4oA&s" },
    ],
  },
  {
    label: "Gaming",
    items: [
      { brand: "Sony",      name: "PS5 Digital Edition Slim 825GB", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&q=70" },
      { brand: "Nintendo",  name: "Nintendo Switch 2",              img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=200&q=70" },
      { brand: "Microsoft", name: "Xbox Series X",                  img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=200&q=70" },
    ],
  },
  {
    label: "Components",
    items: [
      { brand: "Gigabyte", name: "GeForce RTX 5090",           img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200&q=70" },
      { brand: "PNY",      name: "GeForce RTX 5090 Triple Fan",img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&q=70" },
      { brand: "Sony",     name: "DS5 Controllers",            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-LYeuR_kxdkLkXktya6u6rfRQWTi7NanahA&s" },
    ],
  },
];

const REVIEWS = [
  { name: "James Thornton", loc: "London, UK", text: "Absolutely brilliant service. Got my stock of MacBook Pros next day and the pricing was the best I could find anywhere. Will definitely be ordering again for the office fleet.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=70" },
  { name: "Sarah Mitchell", loc: "Manchester, UK", text: "Ordered bulk AirPods 4 for our retail chain. Delivery was fast and the packaging was immaculate. Banwell Wholesale really impressed me with their professionalism.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=70" },
  { name: "David Okafor", loc: "Birmingham, UK", text: "Great wholesale prices on the RTX 5090 cards. Bought 10 units for my retail shop and the margin is excellent. Professional and reliable distributor.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=70" },
  { name: "Emma Clarke", loc: "Bristol, UK", text: "The Nintendo Switch 2 units I ordered arrived perfectly sealed. As a reseller I rely on consistent pricing and stock — Banwell has never let me down.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=70" },
  { name: "Amir Patel", loc: "Leeds, UK", text: "As a trade buyer I rely on fast fulfilment and authentic stock. Their PS5 Digital Edition Slim units have been a top seller. Highly recommended distributor.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=70" },
  { name: "Charlotte Hughes", loc: "Edinburgh, UK", text: "Bought the Sony WH-1000XM5 headphones in bulk. Arrived in two days with great packaging. Reliable and professional throughout.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=70" },
];

const FEATURES = [
  { icon: "🚚", title: "Free UK Delivery", text: "Free next-day delivery on all trade orders over £500. Express same-day available in London." },
  { icon: "🔒", title: "Secure Trade Terms", text: "Bank-level encryption on all transactions. We accept BACS, bank transfer & trade credit accounts." },
  { icon: "↩️", title: "30-Day Returns", text: "Not satisfied? Return any item within 30 days for a full refund. Simple, no-hassle process." },
  { icon: "🏆", title: "Authorised Distributor", text: "Official UK distributor for all major brands. Every product is genuine and UK warranty-backed." },
];

const BRAND_LIST = ["Apple", "Sony", "Nintendo", "Microsoft", "Gigabyte", "PNY", "Dyson", "Braun", "Xbox"];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// ─── LOGO COMPONENT ───────────────────────────────────────────────────────────
const SiteLogo = ({ onClick }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="logo-wrap" onClick={onClick}>
      {!imgError ? (
        <img
          src="/logo.jpeg"
          alt="Banwell Wholesale"
          className="logo-img"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="logo-img-fallback">B</div>
      )}
      <div className="logo">Banwell<span>.</span></div>
    </div>
  );
};

// ─── PRODUCT CARD — B2B Style ─────────────────────────────────────────────────
const ProductCard = ({ p, onContact, delay = 0 }) => {
  const isLimited = p.badge === "Limited";
  const isNew = p.badge === "New";

  return (
    <div className="product-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="product-img-wrap">
        <img src={p.img} alt={p.name} loading="lazy" />
        {isNew && <div className="product-badge new">New Stock</div>}
        {isLimited && <div className="product-badge" style={{ background: "#b45309" }}>Limited Stock</div>}
        {!isNew && !isLimited && <div className="product-badge available">In Stock</div>}
      </div>
      <div className="product-info">
        <div className="product-brand">{p.brand}</div>
        <div className="product-name">{p.name}</div>
        {p.ean && <div className="product-ean">EAN: {p.ean}</div>}
        <div className={`product-availability${isLimited ? " limited" : ""}`}>
          {isLimited ? "⚠ Limited Availability" : "✓ Available for Trade Orders"}
        </div>
        <button className="contact-btn" onClick={() => onContact(p)}>
          Contact for Pricing →
        </button>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function BanwellWholesale() {
  const [activeNav, setActiveNav] = useState("Home");
  const [heroIdx, setHeroIdx] = useState(0);
  const [productTab, setProductTab] = useState("Apple");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [countdown, setCountdown] = useState({ d: 2, h: 9, m: 47, s: 33 });
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", subject: "Trade Account Enquiry", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const heroTimer = useRef(null);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = globalStyles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    heroTimer.current = setInterval(() => setHeroIdx(i => (i + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(heroTimer.current);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(c => {
        let { d, h, m, s } = c;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) d = 0;
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleContactProduct = (p) => {
    setForm(f => ({
      ...f,
      subject: "Product Pricing Enquiry",
      message: `Hi, I'm interested in trade pricing for:\n\n${p.brand} ${p.name}${p.ean ? ` (EAN: ${p.ean})` : ""}\n\nPlease could you provide wholesale pricing and availability for [quantity] units?\n\nThank you.`
    }));
    scrollToSection("contact");
    showToast("Scroll down to complete your enquiry");
  };

  const handleFormChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleFormSubmit = () => {
    if (!form.name || !form.email || !form.message) { showToast("Please fill in all required fields"); return; }
    const mailto = `mailto:info@banwellwholesale.co.uk?subject=${encodeURIComponent(`[${form.subject}] from ${form.name}${form.company ? ` — ${form.company}` : ""}`)}&body=${encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`)}`;
    window.location.href = mailto;
    setFormSent(true);
    showToast("Opening your email client…");
  };

  const handleNavClick = (link) => {
    setActiveNav(link.label);
    setMobileNavOpen(false);
    if (["Apple","Gaming","Audio","Components"].includes(link.label)) {
      setProductTab(link.label);
    }
    scrollToSection(link.section);
  };

  const tickerText = "🏭 AUTHORISED UK DISTRIBUTOR — Apple MacBook Pro M4 · PS5 Digital Edition Slim · Nintendo Switch 2 · RTX 5090 · AirPods 4 ANC · Sony WH-1000XM5 · Xbox Series X · Dyson HS08 · Free Delivery Over £500 · Trade Accounts Available · Call02034885029· Bulk Orders Welcome · ";

  return (
    <div id="home" style={{ width: "100vw", maxWidth: "100vw", overflowX: "hidden", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* ── TOP BAR ── */}
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <span>📞 <a href="tel:02034885029">02034885029</a></span>
            <span>✉️ <a href="mailto:info@banwellwholesale.co.uk">info@banwellwholesale.co.uk</a></span>
            <span>📍 Unit 5 Vale Industrial Centre, Southern Road, Aylesbury, HP19 9EW</span>
          </div>
          <div className="topbar-right">
            <span>Free Delivery Over £500</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <span>Trade Accounts Welcome</span>
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-inner">
          <button
            style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.08)", color: "#fff", borderRadius: "6px", fontSize: "20px", width: "40px", height: "40px", border: "none", cursor: "pointer", flexShrink: 0 }}
            onClick={() => setMobileNavOpen(true)}
          >☰</button>

          <SiteLogo onClick={() => scrollToSection("home")} />

          <div className="search-bar">
            <select>
              <option>All Categories</option>
              <option>Apple</option>
              <option>Gaming</option>
              <option>Audio</option>
              <option>Components</option>
            </select>
            <input type="text" placeholder="Search products, brands, EAN codes…" />
            <button>Search</button>
          </div>

          <div className="header-actions">
            <button
              className="btn-primary"
              style={{ padding: "10px 20px", fontSize: "13px", whiteSpace: "nowrap" }}
              onClick={() => scrollToSection("contact")}
            >
              Open a Trade Account
            </button>
          </div>
        </div>
      </header>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          {NAV_LINKS.map(l => (
            <a key={l.label} className={`nav-link${activeNav===l.label?" active":""}`} onClick={() => handleNavClick(l)}>
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── DISTRIBUTION TRUST STRIP ── */}
      <div className="dist-strip">
        <div className="dist-strip-item"><span>✅</span> 100% Genuine Stock</div>
        <div className="dist-strip-item"><span>🏭</span> Authorised UK Distributor</div>
        <div className="dist-strip-item"><span>📦</span> Bulk & Trade Orders</div>
        <div className="dist-strip-item"><span>🔐</span> Full UK Warranty</div>
        <div className="dist-strip-item"><span>📋</span> Trade Accounts Available</div>
      </div>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-track">
          <span className="ticker-segment">{tickerText}</span>
          <span className="ticker-segment">{tickerText}</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="hero">
        {HERO_SLIDES.map((s, i) => (
          <div key={i} className={`hero-slide${i===heroIdx?" active":" inactive"}`}>
            <div className="hero-bg" style={{ backgroundImage: `url(${s.img})` }} />
            <div className="hero-overlay" />
            {i === heroIdx && (
              <div className="hero-content">
                <div className="hero-tag">{s.tag}</div>
                <h1 className="hero-title">{s.title}</h1>
                <p className="hero-sub">{s.sub}</p>
                <div className="hero-btns">
                  <button className="btn-primary" onClick={() => scrollToSection("contact")}>{s.cta} →</button>
                  <button className="btn-outline" onClick={() => scrollToSection("products")}>View Stock Lines</button>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="hero-arrows">
          <button className="hero-arrow" onClick={() => setHeroIdx(i => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}>‹</button>
          <button className="hero-arrow" onClick={() => setHeroIdx(i => (i + 1) % HERO_SLIDES.length)}>›</button>
        </div>
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`hero-dot${i===heroIdx?" active":""}`} onClick={() => setHeroIdx(i)} />
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div className="section" id="products">
        <div className="section-header">
          <div className="section-title">Trade Stock Lines</div>
          <div className="section-tabs">
            {Object.keys(PRODUCTS).map(k => (
              <button key={k} className={`tab-btn${productTab===k?" active":""}`} onClick={() => setProductTab(k)}>{k}</button>
            ))}
          </div>
          <div className="view-all" onClick={() => scrollToSection("contact")}>Request Full Catalogue →</div>
        </div>
        <div className="products-grid">
          {PRODUCTS[productTab].map((p, i) => (
            <ProductCard key={p.id} p={p} onContact={handleContactProduct} delay={i * 80} />
          ))}
        </div>
      </div>

      {/* ── CATEGORY BANNERS ── */}
      <div className="cat-banners">
        {CAT_BANNERS.map((c, i) => (
          <div key={i} className="cat-banner" onClick={() => { setProductTab(c.cat); scrollToSection("products"); }}>
            <div className="cat-banner-overlay">
              <div className="cat-banner-icon">{c.icon}</div>
              <div className="cat-banner-title">{c.title}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginBottom: 10 }}>{c.sub}</div>
              <div className="cat-banner-link">View Stock Lines →</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── STOCK AVAILABILITY BANNER ── */}
      <div className="deal-banner" id="hot-deals">
        <div className="deal-inner">
          <div className="deal-text">
            <div className="deal-label">📦 New Stock Available</div>
            <h2 className="deal-title">Weekly <span>Stock Update</span></h2>
            <p className="deal-sub">Fresh trade lines arriving weekly — competitive wholesale pricing for authorised partners</p>
            <div className="countdown">
              {[
                { num: String(countdown.d).padStart(2,"0"), label: "Days" },
                { num: String(countdown.h).padStart(2,"0"), label: "Hours" },
                { num: String(countdown.m).padStart(2,"0"), label: "Mins" },
                { num: String(countdown.s).padStart(2,"0"), label: "Secs" },
              ].map((c, i) => (
                <div key={i} className="countdown-item">
                  <div className="countdown-num">{c.num}</div>
                  <div className="countdown-label">{c.label}</div>
                </div>
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 12 }}>Until next stock update</p>
            <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => scrollToSection("contact")}>Request Trade Pricing →</button>
          </div>

          {/* Stock summary panel instead of retail product image */}
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "28px 32px", minWidth: 260 }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Currently In Stock</div>
            {[
              { brand: "Apple", name: "MacBook Pro M4 14\"", status: "Available" },
              { brand: "Nintendo", name: "Switch 2", status: "Limited" },
              { brand: "Sony", name: "PS5 Slim Digital", status: "Available" },
              { brand: "Gigabyte", name: "RTX 5090", status: "Limited" },
              { brand: "Sony", name: "WH-1000XM5", status: "Available" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.brand}</div>
                  <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, marginTop: 2 }}>{item.name}</div>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4,
                  background: item.status === "Available" ? "rgba(22,163,74,0.2)" : "rgba(180,83,9,0.2)",
                  color: item.status === "Available" ? "#4ade80" : "#fbbf24",
                  border: `1px solid ${item.status === "Available" ? "rgba(22,163,74,0.3)" : "rgba(180,83,9,0.3)"}`,
                }}>{item.status}</span>
              </div>
            ))}
            <button className="btn-primary" style={{ width: "100%", marginTop: 20, fontSize: 13, padding: "10px" }} onClick={() => scrollToSection("contact")}>
              Contact for Full List →
            </button>
          </div>
        </div>
      </div>

      {/* ── POPULAR LINES ── */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Popular Trade Lines</div>
          <div className="view-all" onClick={() => scrollToSection("products")}>View All Stock →</div>
        </div>
        <div className="top-grid">
          {TOP_COLS.map((col, ci) => (
            <div key={ci} className="top-col">
              <div className="top-col-title">{col.label}</div>
              {col.items.map((item, ii) => (
                <div key={ii} className="top-item" onClick={() => { setProductTab(col.label); scrollToSection("products"); }}>
                  <img src={item.img} alt={item.name} />
                  <div className="top-item-info">
                    <div className="top-item-brand">{item.brand}</div>
                    <div className="top-item-name">{item.name}</div>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--red)", fontWeight: 700, whiteSpace: "nowrap" }}>Trade Price →</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="features">
        {FEATURES.map((f, i) => (
          <div key={i} className="feature-card" style={{ animationDelay: `${i*100}ms` }}>
            <div className="feature-icon" style={{ fontSize: "24px" }}>{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-text">{f.text}</div>
          </div>
        ))}
      </div>

      {/* ── ALL STOCK LINES ── */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">All Stock Lines</div>
          <div className="view-all" onClick={() => scrollToSection("contact")}>Request Catalogue →</div>
        </div>
        <div className="products-grid">
          {ALL_PRODUCTS.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} p={p} onContact={handleContactProduct} delay={i * 60} />
          ))}
        </div>
      </div>

      {/* ── BRAND LOGOS ── */}
      <div className="brands-section">
        <div className="brands-title">Our Authorised Brand Portfolio</div>
        <div className="brands-scroll-wrap">
          <div className="brands-scroll">
            {[...BRAND_LIST, ...BRAND_LIST].map((b, i) => {
              const LogoComp = BrandLogos[b];
              return (
                <div key={i} className="brand-logo-item">
                  {LogoComp ? <LogoComp /> : (
                    <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 900, fontSize: 16, color: "#555", letterSpacing: 1 }}>{b.toUpperCase()}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="testimonials">
        <div className="testimonials-inner">
          <div className="testimonials-title">What Our Trade Partners <span>Say</span></div>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card" style={{ animationDelay: `${i*100}ms` }}>
                <div className="review-stars">{[1,2,3,4,5].map(s => <span key={s}>★</span>)}</div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <img src={r.img} alt={r.name} className="review-avatar" />
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-loc">📍 {r.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <div className="about" id="about">
        <div className="about-img-wrap">
          <img src="https://media.istockphoto.com/id/2214019952/photo/asian-senior-couple-using-and-selecting-digital-tablet-in-modern-electronics-store.webp?a=1&b=1&s=612x612&w=0&k=20&c=UKeT4U5zzlW0yTBH3VfABoszk8yBy4HKxfuUcdzCR9k=" alt="Banwell Wholesale warehouse" />
          {/* <div className="about-badge-float">
            <div className="about-badge-num">15+</div>
            <div className="about-badge-label">Years in Business</div>
          </div> */}
        </div>
        <div className="about-content">
          <div className="about-tag">About Banwell Ltd</div>
          <h2 className="about-title">UK's Trusted <span>Electronics</span> Distribution Partner</h2>
          <p className="about-text">Banwell Wholesale is a leading UK electronics distributor based in Aylesbury, England. We supply premium consumer electronics from the world's top brands — Apple, Sony, Nintendo, Microsoft, Gigabyte, PNY, Dyson and more — to retailers, resellers, and trade buyers across the United Kingdom.</p>
          <p className="about-text">As an authorised distributor with direct manufacturer relationships, we guarantee 100% genuine products backed by full UK warranty. Our competitive wholesale pricing enables our trade partners to maximise their margins while offering customers exceptional value.</p>
          <div className="about-stats">
            <div className="about-stat">
              <div className="about-stat-num">50K+</div>
              <div className="about-stat-label">Units Distributed</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">200+</div>
              <div className="about-stat-label">Trade Partners</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">12+</div>
              <div className="about-stat-label">Premium Brands</div>
            </div>
          </div>
          <button className="btn-primary" style={{ marginTop: 28 }} onClick={() => scrollToSection("contact")}>Become a Trade Partner →</button>
        </div>
      </div>

      {/* ── NEWSLETTER ── */}
      <div className="newsletter">
        <div className="newsletter-inner">
          <div className="newsletter-text">
            <h3>Stay Updated with New Stock</h3>
            <p>Get exclusive trade pricing and early access to new product lines.</p>
          </div>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your business email…"
              value={newsletter}
              onChange={e => setNewsletter(e.target.value)}
            />
            <button onClick={() => { if(newsletter) { showToast("Subscribed! Welcome to Banwell trade updates."); setNewsletter(""); } }}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div className="contact" id="contact">
        <div className="contact-info">
          <h2 className="contact-info-title">Get In Touch</h2>
          <p className="contact-info-sub">Whether you're a retailer, reseller, or trade buyer — we'd love to hear from you. Contact us to discuss trade accounts, bulk pricing, or product availability.</p>
          {[
            { icon: "📞", title: "Phone", text: "02034885029\nMon–Fri 9am–6pm GMT" },
            { icon: "✉️", title: "Email", text: "info@banwellwholesale.co.uk\nGeneral & trade enquiries" },
            { icon: "📍", title: "Address", text: "Unit 5 Vale Industrial Centre\nSouthern Road, Aylesbury\nEngland, HP19 9EW" },
          ].map((d, i) => (
            <div key={i} className="contact-detail">
              <div className="contact-detail-icon" style={{ fontSize: "18px" }}>{d.icon}</div>
              <div className="contact-detail-text">
                <h4>{d.title}</h4>
                <p style={{ whiteSpace: "pre-line" }}>{d.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="contact-form">
          <h3 style={{ fontFamily: "var(--font-cond)", fontSize: "22px", fontWeight: 800, marginBottom: "6px", color: "var(--dark)" }}>Trade & Wholesale Enquiries</h3>
          <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 24 }}>Prices are available to verified trade accounts only. Please complete the form below and our trade team will respond within one business day.</p>
          {formSent ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: "48px", marginBottom: 16 }}>✅</div>
              <h4 style={{ fontSize: 20, fontWeight: 700, color: "var(--dark)", marginBottom: 8 }}>Message Sent!</h4>
              <p style={{ color: "var(--gray)" }}>Your email client has been opened. Our trade team will be in touch shortly.</p>
              <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => setFormSent(false)}>Send Another Enquiry</button>
            </div>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleFormChange} placeholder="John Smith" />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input name="company" value={form.company} onChange={handleFormChange} placeholder="Your Ltd / Business Name" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="john@yourbusiness.co.uk" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="02034885029" />
                </div>
              </div>
              <div className="form-group">
                <label>Enquiry Type</label>
                <select name="subject" value={form.subject} onChange={handleFormChange}>
                  <option>Trade Account Enquiry</option>
                  <option>Product Pricing Enquiry</option>
                  <option>Bulk Order Enquiry</option>
                  <option>Stock Availability</option>
                  <option>Returns & Warranty</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea name="message" value={form.message} onChange={handleFormChange} placeholder="Please include the products you're interested in, quantities required, and any other relevant details…" />
              </div>
              <button className="btn-primary" style={{ width: "100%", padding: "14px" }} onClick={handleFormSubmit}>
                Send Enquiry →
              </button>
              <p style={{ fontSize: 12, color: "var(--gray)", marginTop: 10, textAlign: "center" }}>This will open your email client ready to send to our trade team.</p>
            </>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <LogoImgFooter />
              <div className="footer-brand-name" style={{ margin: 0 }}>Banwell<span>.</span></div>
            </div>
            <p className="footer-about">Banwell Wholesale Ltd is a UK-based authorised electronics distributor supplying premium consumer technology from the world's leading brands. Trade accounts, bulk orders, and retail supply welcome. Based in Aylesbury, England.</p>
            <p className="footer-about" style={{ marginTop: 8 }}>
              📞 <a href="tel: 02034885029" style={{ color: "rgba(255,255,255,0.6)" }}>02034885029</a> &nbsp;|&nbsp;
              ✉️ <a href="mailto:info@banwellwholesale.co.uk" style={{ color: "rgba(255,255,255,0.6)" }}>info@banwellwholesale.co.uk</a>
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            {[
              { label: "Home", section: "home" },
              { label: "About Us", section: "about" },
              { label: "Stock Lines", section: "hot-deals" },
              { label: "Products", section: "products" },
              { label: "Contact", section: "contact" },
            ].map(l => (
              <a key={l.label} className="footer-link" onClick={() => scrollToSection(l.section)}>{l.label}</a>
            ))}
          </div>
          <div className="footer-col">
            <h4>Categories</h4>
            {["Apple Products", "Gaming & Consoles", "Audio & Headphones", "Graphics Cards", "Health & Wellness", "Accessories"].map(l => (
              <a key={l} className="footer-link" onClick={() => scrollToSection("products")}>{l}</a>
            ))}
          </div>
          <div className="footer-col">
            <h4>Trade Info</h4>
            {["Open a Trade Account", "Bulk Order Enquiry", "Returns Policy", "Warranty Claims", "Terms & Conditions", "Privacy Policy"].map(l => (
              <a key={l} className="footer-link">{l}</a>
            ))}
          </div>
        </div>
        <div className="footer-bottom-bar">
          <div className="footer-bottom">
            <span>© 2025 Banwell Wholesale Ltd. All rights reserved. Company Reg No. England & Wales. Unit 5 Vale Industrial Centre, Aylesbury, HP19 9EW.</span>
            <span className="footer-reg">Authorised UK Distributor · Trade Only · B2B Wholesale</span>
          </div>
        </div>
      </footer>

      {/* ── MOBILE NAV ── */}
      {mobileNavOpen && (
        <>
          <div className="mobile-nav-overlay" onClick={() => setMobileNavOpen(false)} />
          <div className="mobile-nav">
            <div className="mobile-nav-header">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <LogoImgMini />
                <div className="logo" style={{ fontSize: 22 }}>Banwell<span style={{ color: "var(--red)" }}>.</span></div>
              </div>
              <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)}>✕</button>
            </div>
            {NAV_LINKS.map(l => (
              <a key={l.label} className="mobile-nav-link" onClick={() => handleNavClick(l)}>{l.label}</a>
            ))}
            <div style={{ marginTop: 24, padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 8 }}>📞 02034885029</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>✉️ info@banwellwholesale.co.uk</div>
            </div>
          </div>
        </>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className="toast">
          <span className="toast-icon">✓</span>
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── SMALL LOGO HELPERS ───────────────────────────────────────────────────────
function LogoImgFooter() {
  const [err, setErr] = useState(false);
  if (err) return null;
  return (
    <img
      src="/logo.jpeg"
      alt="Banwell Wholesale"
      style={{ height: 36, width: "auto", objectFit: "contain", mixBlendMode: "screen", filter: "brightness(1.2)", background: "transparent" }}
      onError={() => setErr(true)}
    />
  );
}

function LogoImgMini() {
  const [err, setErr] = useState(false);
  if (err) return null;
  return (
    <img
      src="/logo.jpeg"
      alt="Banwell Wholesale"
      style={{ height: 32, width: "auto", objectFit: "contain", mixBlendMode: "screen", filter: "brightness(1.2)", background: "transparent" }}
      onError={() => setErr(true)}
    />
  );
}