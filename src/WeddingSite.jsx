import React, { useEffect, useState } from "react";

// Jamie & Meg's Wedding Website
// React single-page layout with countdown, FAQs, RSVP and Google Maps embed

const WEDDING_DATE = new Date("2027-07-31T13:00:00"); // adjust time if needed

function getTimeRemaining() {
  const now = new Date().getTime();
  const distance = WEDDING_DATE.getTime() - now;

  if (distance <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isTodayOrPast: true,
    };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { total: distance, days, hours, minutes, seconds, isTodayOrPast: false };
}

const WeddingSite = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Inline styles for simplicity; you can move this to App.css if you prefer */}
      <style>{`
        :root {
          --bg: #fffdf7;
          --accent: #c7ddc5;
          --accent-soft: #e9f3e7;
          --rose: #f7d7e4;
          --rose-soft: #fbeff5;
          --text-main: #33312b;
          --text-soft: #6b6a61;
          --card: #ffffff;
          --border-soft: #e9e2d8;
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: radial-gradient(circle at top left, var(--accent-soft), var(--bg));
          color: var(--text-main);
        }

        .wedding-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .nav-shell {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(12px);
          background: linear-gradient(to right, rgba(255, 253, 247, 0.94), rgba(249, 242, 248, 0.96));
          border-bottom: 1px solid var(--border-soft);
        }

        .nav-inner {
          max-width: 1040px;
          margin: 0 auto;
          padding: 0.65rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .nav-brand {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 500;
          letter-spacing: 0.06em;
          font-size: 0.95rem;
          text-transform: uppercase;
          color: var(--text-soft);
          white-space: nowrap;
        }

        .nav-links {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .nav-link {
          border: none;
          background: transparent;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          color: var(--text-soft);
          transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;
        }

        .nav-link:hover {
          background: rgba(199, 221, 197, 0.35);
          color: var(--text-main);
          transform: translateY(-1px);
        }

        .hero {
          padding: 3.5rem 1.5rem 3rem;
          background: radial-gradient(circle at top, var(--rose-soft), var(--bg));
        }

        .hero-inner {
          max-width: 1040px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 2.5rem;
          align-items: center;
        }

        @media (max-width: 800px) {
          .hero-inner {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        .hero-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(255, 248, 252, 0.98));
          border-radius: 32px;
          padding: 2.2rem 2rem;
          border: 1px solid var(--border-soft);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.06);
          position: relative;
          overflow: hidden;
        }

        .hero-card::before,
        .hero-card::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          filter: blur(6px);
          opacity: 0.4;
        }

        .hero-card::before {
          width: 210px;
          height: 210px;
          background: radial-gradient(circle, var(--accent-soft), transparent 70%);
          top: -80px;
          right: -90px;
        }

        .hero-card::after {
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, var(--rose-soft), transparent 70%);
          bottom: -70px;
          left: -80px;
        }

        .tagline {
          font-size: 0.85rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-soft);
        }

        .names {
          margin: 0.8rem 0 0.4rem;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(2.4rem, 4vw, 3.1rem);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .ampersand {
          font-family: 'Times New Roman', serif;
          font-size: 0.9em;
        }

        .hero-subcopy {
          margin: 0.5rem 0 1.3rem;
          color: var(--text-soft);
          font-size: 0.98rem;
          max-width: 30rem;
        }

        .hero-details {
          display: flex;
          flex-wrap: wrap;
          gap: 1.1rem;
          margin-bottom: 1.6rem;
        }

        .pill {
          padding: 0.55rem 1.1rem;
          border-radius: 999px;
          background: rgba(233, 243, 231, 0.8);
          border: 1px solid rgba(199, 221, 197, 0.8);
          font-size: 0.9rem;
          color: var(--text-soft);
        }

        .pill-rose {
          background: rgba(247, 215, 228, 0.4);
          border-color: rgba(247, 215, 228, 0.9);
        }

        .countdown-shell {
          margin-top: 0.75rem;
          padding: 0.9rem 1rem;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.86);
          border: 1px dashed rgba(201, 183, 162, 0.7);
        }

        .countdown-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--text-soft);
          margin-bottom: 0.35rem;
        }

        .countdown-grid {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .countdown-item {
          min-width: 64px;
          padding: 0.45rem 0.55rem;
          border-radius: 14px;
          background: var(--accent-soft);
          text-align: center;
        }

        .countdown-number {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 1.2rem;
        }

        .countdown-unit {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-soft);
        }

        .hero-cta-row {
          margin-top: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          align-items: center;
        }

        .primary-btn {
          border-radius: 999px;
          border: none;
          cursor: pointer;
          padding: 0.7rem 1.6rem;
          background: linear-gradient(135deg, #d7e8d3, #f7d7e4);
          color: var(--text-main);
          font-size: 0.9rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          box-shadow: 0 12px 28px rgba(163, 171, 157, 0.35);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .primary-btn:hover {
          filter: brightness(1.04);
          transform: translateY(-1px);
        }

        .secondary-text {
          font-size: 0.9rem;
          color: var(--text-soft);
        }

        .hero-photo-card {
          border-radius: 32px;
          border: 1px solid var(--border-soft);
          background: radial-gradient(circle at top, #e7f0e4, #f5e9f0);
          padding: 1.5rem 1.5rem 1.8rem;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .hero-photo-inner {
          border-radius: 24px;
          background: url('https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg?auto=compress&cs=tinysrgb&w=1200')
              center/cover no-repeat;
          min-height: 260px;
          position: relative;
        }

        .hero-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.45), transparent 55%);
          border-radius: 24px;
        }

        .hero-photo-caption {
          position: absolute;
          left: 1.4rem;
          bottom: 1.2rem;
          color: white;
          font-size: 0.85rem;
          max-width: 10rem;
        }

        .hero-photo-tag {
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.9;
        }

        .hero-photo-main {
          margin-top: 0.35rem;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 1.1rem;
        }

        .hero-photo-border {
          position: absolute;
          inset: 0.8rem;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          pointer-events: none;
        }

        .content-section {
          max-width: 1040px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 0;
        }

        .section-heading {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 1.6rem;
          margin-bottom: 0.2rem;
        }

        .section-subtitle {
          font-size: 0.9rem;
          color: var(--text-soft);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 1.4rem;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .card-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        .info-card {
          background: var(--card);
          border-radius: 24px;
          border: 1px solid rgba(233, 226, 215, 0.9);
          padding: 1.3rem 1.4rem;
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.04);
        }

        .info-title {
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .info-body {
          font-size: 0.95rem;
          color: var(--text-soft);
        }

        .timeline {
          margin-top: 1.2rem;
          border-radius: 24px;
          border: 1px solid rgba(233, 226, 215, 0.9);
          background: var(--card);
          padding: 1.5rem 1.5rem 1.3rem;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.03);
        }

        .timeline-row {
          display: grid;
          grid-template-columns: 0.8fr 2fr;
          gap: 1.2rem;
          padding: 0.7rem 0;
          border-bottom: 1px dashed rgba(218, 206, 191, 0.9);
        }

        .timeline-row:last-child {
          border-bottom: none;
        }

        .timeline-time {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-soft);
        }

        .timeline-title {
          font-weight: 600;
        }

        .timeline-copy {
          font-size: 0.92rem;
          color: var(--text-soft);
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 800px) {
          .faq-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        .faq-item {
          background: var(--card);
          border-radius: 24px;
          border: 1px solid rgba(233, 226, 215, 0.9);
          padding: 1.3rem 1.5rem;
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.03);
        }

        .faq-question {
          font-weight: 600;
          margin-bottom: 0.4rem;
          font-size: 0.98rem;
        }

        .faq-answer {
          font-size: 0.94rem;
          color: var(--text-soft);
        }

        .map-card {
          margin-top: 1.5rem;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(210, 200, 187, 0.9);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.06);
        }

        .map-frame {
          border: none;
          width: 100%;
          height: 320px;
          display: block;
        }

        .map-footer {
          padding: 0.8rem 1rem 1rem;
          background: linear-gradient(to right, var(--accent-soft), var(--rose-soft));
          font-size: 0.9rem;
          color: var(--text-soft);
        }

        .map-footer strong { color: var(--text-main); }

        .two-column {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .two-column {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        .rsvp-card {
          background: var(--card);
          border-radius: 24px;
          border: 1px solid rgba(233, 226, 215, 0.9);
          padding: 1.5rem 1.5rem 1.6rem;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.05);
        }

        .rsvp-note {
          font-size: 0.9rem;
          color: var(--text-soft);
          margin-bottom: 1rem;
        }

        .rsvp-form {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .field-label {
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-soft);
        }

        .field-input,
        .field-select,
        .field-textarea {
          width: 100%;
          padding: 0.65rem 0.7rem;
          border-radius: 12px;
          border: 1px solid rgba(210, 200, 187, 0.9);
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          background: rgba(255, 255, 255, 0.96);
        }

        .field-input:focus,
        .field-select:focus,
        .field-textarea:focus {
          border-color: #b1caa9;
          box-shadow: 0 0 0 1px rgba(177, 202, 169, 0.55);
        }

        .field-textarea {
          min-height: 90px;
          resize: vertical;
        }

        .contact-card {
          border-radius: 24px;
          border: 1px solid rgba(233, 226, 215, 0.9);
          padding: 1.4rem 1.5rem;
          background: linear-gradient(135deg, rgba(231, 240, 228, 0.9), rgba(248, 231, 241, 0.95));
        }

        .contact-line {
          font-size: 0.95rem;
          color: var(--text-soft);
          margin-top: 0.4rem;
        }

        .footer {
          margin-top: 2.5rem;
          padding: 1.8rem 1.5rem 2.3rem;
          background: #f4efe7;
          border-top: 1px solid var(--border-soft);
        }

        .footer-inner {
          max-width: 1040px;
          margin: 0 auto;
          font-size: 0.8rem;
          color: var(--text-soft);
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          justify-content: space-between;
          align-items: center;
        }

        .footer-hearts { font-size: 0.9rem; }
      `}</style>

      <div className="wedding-page">
        <header className="nav-shell">
          <div className="nav-inner">
            <div className="nav-brand">Jamie &amp; Meg's Wedding · 31 July 2027</div>
            <nav className="nav-links">
              <button className="nav-link" onClick={() => handleNavClick("our-day")}>
                Our Day
              </button>
              <button className="nav-link" onClick={() => handleNavClick("details")}>
                Details
              </button>
              <button className="nav-link" onClick={() => handleNavClick("faq")}>
                FAQ
              </button>
              <button className="nav-link" onClick={() => handleNavClick("rsvp")}>
                RSVP
              </button>
            </nav>
          </div>
        </header>

        <section className="hero" id="top">
          <div className="hero-inner">
            <div className="hero-card">
              <div className="tagline">Welcome to our wedding site for needs to know about our day</div>
              <h1 className="names">
                Jamie <span className="ampersand">&amp;</span> Meg
              </h1>
              <p className="hero-subcopy">
                We would be honoured to have you join us as we celebrate our wedding
                at The Warren Golf &amp; Country Club.
              </p>

              <div className="hero-details">
                <div className="pill">
                  Saturday · 31 July 2027
                </div>
                <div className="pill pill-rose">The Warren Estate · Woodham Walter</div>
              </div>

              <div className="countdown-shell">
                {timeLeft.isTodayOrPast ? (
                  <div className="secondary-text">
                    Today is the day – let&apos;s celebrate together.
                  </div>
                ) : (
                  <>
                    <div className="countdown-label">Countdown to our wedding</div>
                    <div className="countdown-grid">
                      <div className="countdown-item">
                        <div className="countdown-number">{timeLeft.days}</div>
                        <div className="countdown-unit">Days</div>
                      </div>
                      <div className="countdown-item">
                        <div className="countdown-number">{timeLeft.hours}</div>
                        <div className="countdown-unit">Hours</div>
                      </div>
                      <div className="countdown-item">
                        <div className="countdown-number">{timeLeft.minutes}</div>
                        <div className="countdown-unit">Minutes</div>
                      </div>
                      <div className="countdown-item">
                        <div className="countdown-number">{timeLeft.seconds}</div>
                        <div className="countdown-unit">Seconds</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="hero-cta-row">
                <button className="primary-btn" onClick={() => handleNavClick("rsvp")}>
                  RSVP online
                  <span>↗</span>
                </button>
                <div className="secondary-text">We kindly request responses by 30 April 2027.</div>
              </div>
            </div>

            <aside className="hero-photo-card">
              <div className="hero-photo-inner">
                <div className="hero-photo-overlay" />
                <div className="hero-photo-border" />
                <div className="hero-photo-caption">
                  <div className="hero-photo-tag">The Warren Estate</div>
                  <div className="hero-photo-main">Essex Country side venue</div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <main>
          {/* Our Day / overview */}
          <section id="our-day" className="content-section">
            <h2 className="section-heading">Our Day</h2>
            <div className="section-subtitle">A summer celebration in the countryside</div>

            <div className="card-grid">
              <div className="info-card">
                <div className="info-title">Ceremony</div>
                <p className="info-body">
                  Weather permitting, our ceremony will take place outdoors beneath the oak pergola
                  overlooking the gardens. Please arrive 30 minutes before the ceremony begins.
                </p>
              </div>
              <div className="info-card">
                <div className="info-title">Drinks &amp; Photos</div>
                <p className="info-body">
                  After the ceremony, we&apos;ll gather on the lawn for drinks, canapés and photos
                  amongst the flowers and greenery.
                </p>
              </div>
              <div className="info-card">
                <div className="info-title">Evening Celebrations</div>
                <p className="info-body">
                  We&apos;ll continue the celebrations in the Rose Barn with dinner, speeches, and
                  dancing into the evening.
                </p>
              </div>
            </div>

            <div className="timeline">
              <div className="timeline-row">
                <div className="timeline-time">1:00 pm</div>
                <div>
                  <div className="timeline-title">Guests arrive</div>
                  <div className="timeline-copy">
                    Welcome drinks served and time to find your seat.
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">1:30 pm</div>
                <div>
                  <div className="timeline-title">Ceremony</div>
                  <div className="timeline-copy">
                    Join us as we say our vows surrounded by family, friends and gardens.
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">3:00 pm</div>
                <div>
                  <div className="timeline-title">Drinks reception</div>
                  <div className="timeline-copy">
                    Toasts, canapés, lawn games and photos across the estate.
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">5:00 pm</div>
                <div>
                  <div className="timeline-title">Wedding breakfast</div>
                  <div className="timeline-copy">
                    Dinner is served in the Rose Barn, followed by speeches.
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">7:30 pm</div>
                <div>
                  <div className="timeline-title">Evening guests &amp; first dance</div>
                  <div className="timeline-copy">
                    Our band/DJ will keep the dance floor full until carriages.
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">11:30 pm</div>
                <div>
                  <div className="timeline-title">Carriages</div>
                  <div className="timeline-copy">Taxis and lifts at the ready.</div>
                </div>
              </div>
            </div>
          </section>

          {/* Venue & travel */}
          <section id="details" className="content-section">
            <h2 className="section-heading">The Venue</h2>
            <div className="section-subtitle">The Warren Golf &amp; Country Club · CM9 6RW</div>

            <div className="two-column">
              <div>
                <p className="info-body" style={{ marginBottom: "1.1rem" }}>
                  Set in acres of Essex countryside, The Warren Estate offers sweeping lawns,
                  woodland and a beautifully restored barn – the perfect English romantic garden
                  setting for our day.
                </p>
                <div className="info-card">
                  <div className="info-title">Address</div>
                  <p className="info-body">
                    The Warren Golf &amp; Country Club Ltd
                    <br /> Woodham Walter
                    <br /> Maldon, Essex
                    <br /> CM9 6RW
                  </p>
                  <p className="info-body">
                    There is ample parking available on site. If you&apos;re arranging a taxi, please
                    book in advance, as we&apos;re in the countryside.
                  </p>
                </div>
              </div>

              <div className="map-card">
                <iframe
                  title="The Warren Golf & Country Club map"
                  className="map-frame"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=The+Warren+Golf+%26+Country+Club+Ltd,+Woodham+Walter,+Maldon,+Essex,+CM9+6RW&output=embed"
                ></iframe>
                <div className="map-footer">
                  <strong>Tip:</strong> Tap or click inside the map to open directions in Google Maps
                  on your device.
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="content-section">
            <h2 className="section-heading">Frequently Asked Questions</h2>
            <div className="section-subtitle">Little details for a lovely day</div>

            <div className="faq-grid">
              <article className="faq-item">
                <h3 className="faq-question">What should I wear?</h3>
                <p className="faq-answer">
                  Dress code is <strong>summer formal</strong>. Think light suits, dresses and
                  jumpsuits suitable for a garden wedding. Stilettos can sink into the lawn, so
                  wedges or block heels are a great choice.
                </p>
              </article>

              <article className="faq-item">
                <h3 className="faq-question">Are children invited?</h3>
                <p className="faq-answer">
                  As much as we love your little ones, we are keeping our day an adults-only
                  celebration (with the exception of children in the wedding party). Thank you for
                  understanding.
                </p>
              </article>

              <article className="faq-item">
                <h3 className="faq-question">Can I bring a plus one?</h3>
                <p className="faq-answer">
                  Your invitation will specify if a guest is included. If you&apos;re unsure, please feel
                  free to contact us and we&apos;ll be happy to clarify.
                </p>
              </article>

              <article className="faq-item">
                <h3 className="faq-question">Do you have a gift list?</h3>
                <p className="faq-answer">
                  Your presence is more than enough. If you would like to give a gift, a contribution
                  towards our future adventures and home would be greatly appreciated.
                </p>
              </article>

              <article className="faq-item">
                <h3 className="faq-question">Will there be food options for dietary needs?</h3>
                <p className="faq-answer">
                  Yes – please let us know any dietary requirements or allergies when you RSVP and we
                  will work with the venue to accommodate you.
                </p>
              </article>

              <article className="faq-item">
                <h3 className="faq-question">Where can I stay nearby?</h3>
                <p className="faq-answer">
                  There are a number of country inns, B&amp;Bs and hotels within a short drive of the
                  estate. We&apos;ll share a list of recommendations closer to the time.
                </p>
              </article>
            </div>
          </section>

          {/* RSVP & contact */}
          <section id="rsvp" className="content-section" style={{ paddingBottom: "2.5rem" }}>
            <h2 className="section-heading">RSVP</h2>
            <div className="section-subtitle">We can&apos;t wait to celebrate with you</div>

            <div className="two-column">
              <div className="rsvp-card">
                <p className="rsvp-note">
                  Please complete the form below to let us know if you&apos;ll be joining us, and share
                  any dietary requirements or song requests for the dance floor.
                </p>

                {/* Replace the action URL below with your own Formspree or form handler URL */}
                <form
                  className="rsvp-form"
                  action="https://formspree.io/f/yourFormIdHere"
                  method="POST"
                >
                  <div>
                    <label className="field-label" htmlFor="name">
                      Name(s)
                    </label>
                    <input
                      id="name"
                      name="name"
                      className="field-input"
                      type="text"
                      placeholder="Your full name(s)"
                      required
                    />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      className="field-input"
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="attendance">
                      Will you be joining us?
                    </label>
                    <select
                      id="attendance"
                      name="attendance"
                      className="field-select"
                      defaultValue="yes"
                      required
                    >
                      <option value="yes">Yes, I&apos;ll be there</option>
                      <option value="evening">Evening celebrations only</option>
                      <option value="no">Sorry, I can&apos;t make it</option>
                    </select>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="dietary">
                      Dietary requirements
                    </label>
                    <textarea
                      id="dietary"
                      name="dietary"
                      className="field-textarea"
                      placeholder="Allergies, intolerances or preferences (e.g. vegetarian, vegan)"
                    />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="song">
                      Song request (optional)
                    </label>
                    <input
                      id="song"
                      name="song"
                      className="field-input"
                      type="text"
                      placeholder="A song that will get you on the dance floor"
                    />
                  </div>

                  <button type="submit" className="primary-btn" style={{ marginTop: "0.7rem" }}>
                    Send RSVP
                  </button>
                </form>
              </div>

              <aside className="contact-card">
                <div className="info-title">Questions?</div>
                <p className="info-body">
                  If there&apos;s anything you&apos;re unsure about – travel, accommodation, gifts or
                  anything else – please feel free to get in touch with us.
                </p>
                <p className="contact-line">
                  Email: <strong>your-email@example.com</strong>
                  <br />
                  (We&apos;ll update this with our wedding inbox closer to the time.)
                </p>
              </aside>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-inner">
            <div>
              © {new Date().getFullYear()} Jamie &amp; Meg · The Warren Estate
            </div>
            <div className="footer-hearts">Grown with love in our English garden 💐</div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default WeddingSite;
