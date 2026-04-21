import { useState, useEffect, useRef } from "react";

const G = {
  cream: "#faf7f2",
  warm: "#f5efe4",
  sand: "#e8dcc8",
  terracotta: "#c17a4a",
  terracottaDark: "#9e6038",
  terracottaLight: "#f0d4b8",
  forest: "#2d4a3e",
  forestLight: "#3d6454",
  forestMuted: "#6b9e8a",
  charcoal: "#1e2320",
  text: "#2c2c2c",
  muted: "#7a7060",
  white: "#ffffff",
  divider: "#ddd4c0",
};

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito:wght@300;400;500;600;700&display=swap');
`;

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${G.cream}; color: ${G.text}; font-family: 'Nunito', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.7s 0.2s ease both; }
  .fade-up-3 { animation: fadeUp 0.7s 0.35s ease both; }
  .fade-up-4 { animation: fadeUp 0.7s 0.5s ease both; }

  nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all 0.3s; }
  nav.scrolled { background: rgba(250,247,242,0.96); backdrop-filter: blur(12px); box-shadow: 0 2px 20px rgba(0,0,0,0.07); }

  .nav-link {
    color: ${G.forest};
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    padding: 6px 0;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s, color 0.2s;
  }
  .nav-link:hover { color: ${G.terracotta}; border-bottom-color: ${G.terracotta}; }

  .btn-primary {
    background: ${G.terracotta};
    color: white;
    border: none;
    padding: 14px 32px;
    border-radius: 50px;
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(193,122,74,0.3);
    letter-spacing: 0.2px;
  }
  .btn-primary:hover { background: ${G.terracottaDark}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(193,122,74,0.4); }

  .btn-outline {
    background: transparent;
    color: ${G.forest};
    border: 2px solid ${G.forest};
    padding: 13px 32px;
    border-radius: 50px;
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.2px;
  }
  .btn-outline:hover { background: ${G.forest}; color: white; transform: translateY(-2px); }

  .btn-forest {
    background: ${G.forest};
    color: white;
    border: none;
    padding: 14px 32px;
    border-radius: 50px;
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 16px rgba(45,74,62,0.3);
  }
  .btn-forest:hover { background: ${G.forestLight}; transform: translateY(-2px); }

  .service-card {
    background: white;
    border-radius: 20px;
    padding: 36px 32px;
    border: 1px solid ${G.divider};
    transition: transform 0.25s, box-shadow 0.25s;
    position: relative;
    overflow: hidden;
  }
  .service-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
  }
  .service-card.terracotta::before { background: ${G.terracotta}; }
  .service-card.forest::before { background: ${G.forest}; }
  .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.1); }

  .section-tag {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .tag-terracotta { background: ${G.terracottaLight}; color: ${G.terracottaDark}; }
  .tag-forest { background: rgba(45,74,62,0.1); color: ${G.forest}; }
  .tag-sand { background: ${G.sand}; color: ${G.muted}; }

  .chat-bubble-user {
    background: ${G.forest};
    color: white;
    padding: 12px 16px;
    border-radius: 18px 18px 4px 18px;
    font-size: 14px;
    line-height: 1.5;
    max-width: 80%;
    align-self: flex-end;
  }
  .chat-bubble-ai {
    background: white;
    color: ${G.text};
    padding: 12px 16px;
    border-radius: 18px 18px 18px 4px;
    font-size: 14px;
    line-height: 1.5;
    max-width: 80%;
    align-self: flex-start;
    border: 1px solid ${G.divider};
  }
  .chat-input {
    flex: 1;
    border: 1.5px solid ${G.divider};
    border-radius: 50px;
    padding: 11px 20px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    background: white;
    color: ${G.text};
    outline: none;
    transition: border-color 0.2s;
  }
  .chat-input:focus { border-color: ${G.terracotta}; }
  .chat-send {
    background: ${G.terracotta};
    border: none;
    border-radius: 50%;
    width: 42px;
    height: 42px;
    color: white;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .chat-send:hover { background: ${G.terracottaDark}; }

  .testimonial-card {
    background: white;
    border-radius: 16px;
    padding: 28px;
    border: 1px solid ${G.divider};
  }

  .floating-badge {
    animation: float 3s ease-in-out infinite;
  }

  input, textarea, select {
    font-family: 'Nunito', sans-serif;
  }

  .contact-input {
    width: 100%;
    border: 1.5px solid ${G.divider};
    border-radius: 12px;
    padding: 13px 16px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    background: white;
    color: ${G.text};
    outline: none;
    transition: border-color 0.2s;
  }
  .contact-input:focus { border-color: ${G.terracotta}; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${G.warm}; }
  ::-webkit-scrollbar-thumb { background: ${G.sand}; border-radius: 3px; }
`;

const WELLNESS_SERVICES = [
  {
    icon: "🏋️",
    title: "Concierge Wellness Training",
    desc: "Personalized one-on-one training brought directly to you — at your home, building gym, or outdoor space. Programs designed around your goals, schedule, and lifestyle.",
    features: ["In-home or outdoor sessions", "Custom programming", "Nutrition guidance", "Flexible scheduling"],
  },
  {
    icon: "💆",
    title: "Performance Massage & Recovery",
    desc: "Targeted soft tissue work to reduce pain, improve mobility, and accelerate recovery. Ideal for active individuals, athletes, and anyone dealing with chronic tension.",
    features: ["Deep tissue & sports massage", "Myofascial release", "Post-workout recovery", "Mobile service"],
  },
  {
    icon: "📱",
    title: "Online Coaching",
    desc: "Expert coaching delivered virtually — perfect for clients outside the South Bay or those who prefer the flexibility of remote guidance with real accountability.",
    features: ["Custom training plans", "Video check-ins", "App-based tracking", "Ongoing support"],
  },
];

const PT_SERVICES = [
  {
    icon: "🦴",
    title: "Orthopedic Rehabilitation",
    desc: "Evidence-based treatment for musculoskeletal injuries, post-surgical rehab, and chronic pain conditions.",
  },
  {
    icon: "🏃",
    title: "Sports & Performance Rehab",
    desc: "Return-to-sport programs for athletes recovering from injury, with a focus on full functional restoration.",
  },
  {
    icon: "🏠",
    title: "Mobile PT — We Come to You",
    desc: "Cash-based physical therapy in the comfort of your home. No waiting rooms, no insurance headaches.",
  },
  {
    icon: "📋",
    title: "Movement Assessments",
    desc: "Comprehensive movement screenings to identify dysfunction, reduce injury risk, and optimize performance.",
  },
];

const TESTIMONIALS = [
  { name: "Sarah M.", role: "Marathon Runner", text: "Mitchell helped me recover from a knee injury faster than I thought possible. His mobile PT is a game changer — I never have to leave home.", stars: 5 },
  { name: "James T.", role: "Busy Professional", text: "The online coaching keeps me accountable even with my crazy schedule. Best investment I've made in my health.", stars: 5 },
  { name: "Linda K.", role: "South Bay Resident", text: "The recovery massage sessions have completely transformed how my body feels. I can't imagine going back to a regular gym setup.", stars: 5 },
];

const SYSTEM_PROMPT = `You are the friendly virtual assistant for Home Wealth, a wellness and physical therapy practice run by Mitchell Nguyen, DPT, based in the South Bay region of Los Angeles (El Segundo to Palos Verdes).

Home Wealth offers two categories of services:
WELLNESS SERVICES (non-medical):
- Concierge Wellness Training: personalized in-home or outdoor personal training
- Performance Massage & Recovery: mobile sports massage and soft tissue work
- Online Coaching: virtual coaching with custom programming and accountability

MEDICAL SERVICES (Cash-Based Physical Therapy):
- Orthopedic Rehabilitation
- Sports & Performance Rehab
- Mobile PT (in-home visits)
- Movement Assessments

All services are cash-based (no insurance). Mitchell serves the South Bay area of LA County — El Segundo to Palos Verdes.

Be warm, helpful, and conversational. Help visitors understand services, answer questions, and guide them toward booking. If asked about pricing, let them know pricing is customized and encourage them to reach out directly. Keep responses concise (2-4 sentences max).`;

// ─── AI Chat ──────────────────────────────────────────────────────────────────
async function askAI(messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });
  const data = await res.json();
  return data.content?.map((b) => b.text || "").join("") || "Sorry, I couldn't get a response.";
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Nav({ onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""} style={{ padding: "0 5%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: G.forest, cursor: "pointer" }} onClick={() => onNav("hero")}>
          Home <span style={{ color: G.terracotta }}>Wealth</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Wellness", "Physical Therapy", "About", "Chat", "Contact"].map((l) => (
            <a key={l} className="nav-link" href="#" onClick={(e) => { e.preventDefault(); onNav(l.toLowerCase().replace(" ", "-")); }}>
              {l}
            </a>
          ))}
          <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }} onClick={() => onNav("contact")}>
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ onNav }) {
  return (
    <section id="hero" style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${G.warm} 0%, ${G.cream} 50%, #eef4f0 100%)`, display: "flex", alignItems: "center", padding: "100px 5% 60px", position: "relative", overflow: "hidden" }}>
      {/* Background texture circles */}
      <div style={{ position: "absolute", top: "10%", right: "5%", width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle, ${G.terracottaLight}40 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "2%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(45,74,62,0.08) 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%" }}>
        <div>
          <div className="fade-up-1">
            <span className="section-tag tag-terracotta">South Bay, Los Angeles</span>
          </div>
          <h1 className="fade-up-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: 54, fontWeight: 700, lineHeight: 1.15, color: G.charcoal, marginBottom: 20 }}>
            Wellness that comes <em style={{ color: G.terracotta }}>to you.</em>
          </h1>
          <p className="fade-up-3" style={{ fontSize: 17, color: G.muted, lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>
            Personalized training, recovery massage, and cash-based physical therapy — delivered in the comfort of your home across El Segundo, Manhattan Beach, Redondo Beach, Torrance, and Palos Verdes.
          </p>
          <div className="fade-up-4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => onNav("contact")}>Book a Session</button>
            <button className="btn-outline" onClick={() => onNav("wellness")}>Explore Services</button>
          </div>

          <div className="fade-up-4" style={{ display: "flex", gap: 32, marginTop: 44 }}>
            {[{ n: "200+", l: "Clients Served" }, { n: "5★", l: "Avg. Rating" }, { n: "100%", l: "Cash-Based" }].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: G.forest }}>{s.n}</div>
                <div style={{ fontSize: 12, color: G.muted, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
          <div style={{ width: 380, height: 440, borderRadius: "40% 60% 55% 45% / 45% 45% 55% 55%", background: `linear-gradient(135deg, ${G.forestLight}, ${G.forest})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90, boxShadow: "0 32px 80px rgba(45,74,62,0.25)" }}>
            🌿
          </div>
          {/* Floating badges */}
          <div className="floating-badge" style={{ position: "absolute", top: 40, right: 20, background: "white", borderRadius: 16, padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: 13, fontWeight: 700, color: G.forest, animationDelay: "0s" }}>
            🏠 Mobile PT
          </div>
          <div className="floating-badge" style={{ position: "absolute", bottom: 80, left: 0, background: "white", borderRadius: 16, padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: 13, fontWeight: 700, color: G.terracottaDark, animationDelay: "1s" }}>
            💪 Personal Training
          </div>
          <div className="floating-badge" style={{ position: "absolute", bottom: 20, right: 30, background: "white", borderRadius: 16, padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: 13, fontWeight: 700, color: G.forest, animationDelay: "2s" }}>
            💆 Recovery Massage
          </div>
        </div>
      </div>
    </section>
  );
}

function WellnessSection({ onNav }) {
  return (
    <section id="wellness" style={{ padding: "100px 5%", background: G.cream }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="section-tag tag-terracotta">Non-Medical Services</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: G.charcoal, marginBottom: 16 }}>
            Concierge Wellness Services
          </h2>
          <p style={{ color: G.muted, fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Premium wellness experiences tailored to your lifestyle — no gym commute, no waiting. Just results, at your door.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {WELLNESS_SERVICES.map((s) => (
            <div key={s.title} className="service-card terracotta">
              <div style={{ fontSize: 40, marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: G.charcoal, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ color: G.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {s.features.map((f) => (
                  <li key={f} style={{ fontSize: 13, color: G.forest, fontWeight: 600, padding: "5px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: G.terracotta }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="btn-primary" style={{ marginTop: 24, width: "100%", padding: "12px", fontSize: 14 }} onClick={() => onNav("contact")}>
                Inquire
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PTSection({ onNav }) {
  return (
    <section id="physical-therapy" style={{ padding: "100px 5%", background: `linear-gradient(160deg, #eef4f0 0%, ${G.cream} 100%)` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <span className="section-tag tag-forest">Medical Services</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: G.charcoal, marginBottom: 20, lineHeight: 1.2 }}>
              Cash-Based Physical Therapy
            </h2>
            <p style={{ color: G.muted, fontSize: 16, lineHeight: 1.75, marginBottom: 24 }}>
              Skip the insurance maze. Get one-on-one, undivided PT care from a licensed Doctor of Physical Therapy — in your home, on your schedule.
            </p>
            <p style={{ color: G.muted, fontSize: 15, lineHeight: 1.75, marginBottom: 36 }}>
              Cash-based PT means longer sessions, personalized treatment, and a direct relationship with your therapist. No referrals needed, no surprise bills.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
              {["No insurance needed", "1-on-1 care", "In-home visits", "Licensed DPT"].map((b) => (
                <span key={b} style={{ background: "rgba(45,74,62,0.08)", color: G.forest, padding: "7px 16px", borderRadius: 50, fontSize: 13, fontWeight: 600 }}>{b}</span>
              ))}
            </div>
            <button className="btn-forest" onClick={() => onNav("contact")}>Schedule a Free Consult</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {PT_SERVICES.map((s) => (
              <div key={s.title} className="service-card forest" style={{ padding: "24px 20px" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: G.charcoal, marginBottom: 8 }}>{s.title}</h4>
                <p style={{ color: G.muted, fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{ padding: "100px 5%", background: G.cream }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 32, background: `linear-gradient(145deg, ${G.sand}, ${G.terracottaLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100 }}>
              👨‍⚕️
            </div>
            <div style={{ position: "absolute", bottom: -20, right: -20, background: G.forest, color: "white", borderRadius: 20, padding: "20px 24px", boxShadow: "0 12px 40px rgba(45,74,62,0.3)" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700 }}>DPT</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>Doctor of Physical Therapy</div>
            </div>
          </div>

          <div>
            <span className="section-tag tag-sand">About Mitchell</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: G.charcoal, marginBottom: 20, lineHeight: 1.2 }}>
              Mitchell Nguyen, DPT
            </h2>
            <p style={{ color: G.muted, fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              Mitchell is a Doctor of Physical Therapy and certified wellness coach with a passion for helping people in the South Bay live pain-free, active lives. With a background in orthopedic rehab and performance training, he brings clinical expertise and genuine care to every session.
            </p>
            <p style={{ color: G.muted, fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              After years in traditional clinic settings, Mitchell founded Home Wealth to offer a better model — one where clients receive undivided, personalized attention in the comfort of their own environment, without the barriers of insurance or crowded waiting rooms.
            </p>
            <p style={{ color: G.muted, fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
              Serving the South Bay community from El Segundo to Palos Verdes, Mitchell is committed to making premium wellness and rehabilitation accessible to everyone who needs it.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {["Licensed DPT", "Certified Coach", "South Bay Native"].map((b) => (
                <span key={b} style={{ background: G.terracottaLight, color: G.terracottaDark, padding: "7px 16px", borderRadius: 50, fontSize: 13, fontWeight: 700 }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section style={{ padding: "80px 5%", background: G.warm }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="section-tag tag-sand">What Clients Say</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: G.charcoal }}>Real Results, Real People</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card">
              <div style={{ color: G.terracotta, fontSize: 20, marginBottom: 12 }}>{"★".repeat(t.stars)}</div>
              <p style={{ color: G.text, fontSize: 14, lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ fontWeight: 700, fontSize: 14, color: G.charcoal }}>{t.name}</div>
              <div style={{ fontSize: 12, color: G.muted }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatSection() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm the Home Wealth assistant 👋 I can help you learn about our services, understand what's right for you, or get you set up with Mitchell. What brings you here today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const reply = await askAI(newMsgs.map((m) => ({ role: m.role, content: m.content })));
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please reach out directly!" }]);
    }
    setLoading(false);
  }

  const SUGGESTIONS = ["What services do you offer?", "Do I need insurance?", "What areas do you serve?", "How does cash-based PT work?"];

  return (
    <section id="chat" style={{ padding: "100px 5%", background: G.cream }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="section-tag tag-terracotta">AI Assistant</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: G.charcoal, marginBottom: 12 }}>Have Questions? Just Ask.</h2>
          <p style={{ color: G.muted, fontSize: 15 }}>Our AI assistant knows everything about Home Wealth services and can help you figure out next steps.</p>
        </div>

        <div style={{ background: "white", borderRadius: 24, border: `1px solid ${G.divider}`, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.08)" }}>
          {/* Chat header */}
          <div style={{ background: G.forest, padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: G.terracotta, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>Home Wealth Assistant</div>
              <div style={{ color: G.forestMuted, fontSize: 12 }}>● Online now</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ height: 360, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 12, background: G.warm }}>
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble-ai" style={{ color: G.muted }}>
                Typing...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div style={{ padding: "12px 24px 0", display: "flex", gap: 8, flexWrap: "wrap", background: G.warm }}>
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => { setInput(s); }} style={{ background: "white", border: `1px solid ${G.divider}`, borderRadius: 50, padding: "6px 14px", fontSize: 12, color: G.forest, fontWeight: 600, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: 16, display: "flex", gap: 10, borderTop: `1px solid ${G.divider}`, background: "white" }}>
            <input
              className="chat-input"
              placeholder="Ask anything about our services..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button className="chat-send" onClick={send}>↑</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" style={{ padding: "100px 5%", background: G.warm }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
          <div>
            <span className="section-tag tag-forest">Get In Touch</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: G.charcoal, marginBottom: 20, lineHeight: 1.2 }}>
              Ready to start your wellness journey?
            </h2>
            <p style={{ color: G.muted, fontSize: 15, lineHeight: 1.75, marginBottom: 36 }}>
              Reach out and Mitchell will personally get back to you within 24 hours to discuss your goals and find the right service for you.
            </p>

            {[
              { icon: "📍", title: "Service Area", val: "South Bay, LA — El Segundo to Palos Verdes" },
              { icon: "💳", title: "Payment", val: "Cash, Zelle, Venmo, Credit Card" },
              { icon: "📅", title: "Availability", val: "Mon–Sat, flexible scheduling" },
            ].map((i) => (
              <div key={i.title} style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: G.terracottaLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{i.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: G.charcoal }}>{i.title}</div>
                  <div style={{ fontSize: 14, color: G.muted, marginTop: 2 }}>{i.val}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "white", borderRadius: 24, padding: 40, border: `1px solid ${G.divider}`, boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🌿</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: G.forest, marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: G.muted, fontSize: 14 }}>Mitchell will be in touch within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: G.charcoal, marginBottom: 24 }}>Book a Session</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: G.muted, display: "block", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Full Name</label>
                    <input className="contact-input" value={form.name} onChange={set("name")} placeholder="Your name" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: G.muted, display: "block", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Phone</label>
                    <input className="contact-input" value={form.phone} onChange={set("phone")} placeholder="(310) 000-0000" />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: G.muted, display: "block", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Email</label>
                  <input className="contact-input" value={form.email} onChange={set("email")} placeholder="you@email.com" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: G.muted, display: "block", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Service Interested In</label>
                  <select className="contact-input" value={form.service} onChange={set("service")}>
                    <option value="">Select a service...</option>
                    <optgroup label="Wellness Services">
                      <option>Concierge Wellness Training</option>
                      <option>Performance Massage & Recovery</option>
                      <option>Online Coaching</option>
                    </optgroup>
                    <optgroup label="Physical Therapy">
                      <option>Orthopedic Rehabilitation</option>
                      <option>Sports & Performance Rehab</option>
                      <option>Mobile PT</option>
                      <option>Movement Assessment</option>
                    </optgroup>
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: G.muted, display: "block", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Message</label>
                  <textarea className="contact-input" rows={4} value={form.message} onChange={set("message")} placeholder="Tell Mitchell about your goals or any injuries/conditions..." style={{ resize: "vertical" }} />
                </div>
                <button className="btn-primary" style={{ width: "100%", padding: 16, fontSize: 15 }} onClick={() => form.name && form.email && setSent(true)}>
                  Send Message →
                </button>
                <p style={{ fontSize: 11, color: G.muted, textAlign: "center", marginTop: 12 }}>Your information is kept private and never shared.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNav }) {
  return (
    <footer style={{ background: G.charcoal, color: "rgba(255,255,255,0.6)", padding: "48px 5% 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 12 }}>
              Home <span style={{ color: G.terracotta }}>Wealth</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 300 }}>Premium wellness training, recovery massage, and cash-based physical therapy serving the South Bay, Los Angeles.</p>
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 13, marginBottom: 16, letterSpacing: "0.5px", textTransform: "uppercase" }}>Services</div>
            {["Wellness Training", "Recovery Massage", "Online Coaching", "Cash-Based PT"].map((s) => (
              <div key={s} style={{ fontSize: 13, marginBottom: 8, cursor: "pointer" }}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 13, marginBottom: 16, letterSpacing: "0.5px", textTransform: "uppercase" }}>Service Area</div>
            {["El Segundo", "Manhattan Beach", "Redondo Beach", "Torrance", "Palos Verdes"].map((a) => (
              <div key={a} style={{ fontSize: 13, marginBottom: 8 }}>{a}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12 }}>© 2025 Home Wealth. All rights reserved.</div>
          <div style={{ fontSize: 12 }}>South Bay, Los Angeles County</div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function App() {
  function scrollTo(id) {
    const map = {
      hero: "hero", wellness: "wellness", "physical-therapy": "physical-therapy",
      about: "about", chat: "chat", contact: "contact",
    };
    const el = document.getElementById(map[id] || id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <style>{fonts + css}</style>
      <Nav onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <WellnessSection onNav={scrollTo} />
      <PTSection onNav={scrollTo} />
      <AboutSection />
      <TestimonialsSection />
      <ChatSection />
      <ContactSection />
      <Footer onNav={scrollTo} />
    </>
  );
}
