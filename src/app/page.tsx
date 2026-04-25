import Link from "next/link";
import { HomeInteractions } from "@/components/HomeInteractions";

export default function Home() {
  return (
    <>
      {/* ══════════════════════════════════════════════
           HERO
      ══════════════════════════════════════════════ */}
      <section id="hero">
        <div className="hero-glow" />
        <div className="hero-grid" />

        {/* Refinery schematic */}
        <svg
          className="hero-refinery"
          viewBox="0 0 620 720"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Ground */}
          <line x1="20" y1="620" x2="600" y2="620" stroke="#0047BA" strokeWidth="2" opacity="0.25" />

          {/* Column A, Atmospheric Distillation */}
          <rect x="80" y="180" width="68" height="440" fill="#0047BA" opacity="0.05" />
          <rect x="81" y="181" width="66" height="438" stroke="#0047BA" strokeWidth="1.5" opacity="0.45" />
          <line x1="81" y1="240" x2="147" y2="240" stroke="#0047BA" strokeWidth="0.6" opacity="0.35" />
          <line x1="81" y1="290" x2="147" y2="290" stroke="#0047BA" strokeWidth="0.6" opacity="0.35" />
          <line x1="81" y1="340" x2="147" y2="340" stroke="#0047BA" strokeWidth="0.6" opacity="0.35" />
          <line x1="81" y1="390" x2="147" y2="390" stroke="#0047BA" strokeWidth="0.6" opacity="0.35" />
          <line x1="81" y1="440" x2="147" y2="440" stroke="#0047BA" strokeWidth="0.6" opacity="0.35" />
          <line x1="81" y1="490" x2="147" y2="490" stroke="#0047BA" strokeWidth="0.6" opacity="0.35" />
          <line x1="81" y1="540" x2="147" y2="540" stroke="#0047BA" strokeWidth="0.6" opacity="0.35" />
          <line x1="81" y1="590" x2="147" y2="590" stroke="#0047BA" strokeWidth="0.6" opacity="0.35" />
          <text x="114" y="172" fontFamily="Courier Prime, monospace" fontSize="9" fill="#0047BA" opacity="0.6" textAnchor="middle">
            ATMOS DIST.
          </text>

          {/* Column B, Vacuum */}
          <rect x="258" y="280" width="56" height="340" fill="#0047BA" opacity="0.04" />
          <rect x="259" y="281" width="54" height="338" stroke="#0047BA" strokeWidth="1.5" opacity="0.38" />
          <line x1="259" y1="330" x2="313" y2="330" stroke="#0047BA" strokeWidth="0.6" opacity="0.3" />
          <line x1="259" y1="380" x2="313" y2="380" stroke="#0047BA" strokeWidth="0.6" opacity="0.3" />
          <line x1="259" y1="430" x2="313" y2="430" stroke="#0047BA" strokeWidth="0.6" opacity="0.3" />
          <line x1="259" y1="480" x2="313" y2="480" stroke="#0047BA" strokeWidth="0.6" opacity="0.3" />
          <line x1="259" y1="530" x2="313" y2="530" stroke="#0047BA" strokeWidth="0.6" opacity="0.3" />
          <line x1="259" y1="580" x2="313" y2="580" stroke="#0047BA" strokeWidth="0.6" opacity="0.3" />
          <text x="286" y="272" fontFamily="Courier Prime, monospace" fontSize="9" fill="#0047BA" opacity="0.5" textAnchor="middle">
            VAC. DIST.
          </text>

          {/* Column C, Fractionator */}
          <rect x="430" y="100" width="76" height="520" fill="#0047BA" opacity="0.03" />
          <rect x="431" y="101" width="74" height="518" stroke="#0047BA" strokeWidth="1.5" opacity="0.3" />
          <line x1="431" y1="160" x2="505" y2="160" stroke="#0047BA" strokeWidth="0.6" opacity="0.22" />
          <line x1="431" y1="220" x2="505" y2="220" stroke="#0047BA" strokeWidth="0.6" opacity="0.22" />
          <line x1="431" y1="280" x2="505" y2="280" stroke="#0047BA" strokeWidth="0.6" opacity="0.22" />
          <line x1="431" y1="340" x2="505" y2="340" stroke="#0047BA" strokeWidth="0.6" opacity="0.22" />
          <line x1="431" y1="400" x2="505" y2="400" stroke="#0047BA" strokeWidth="0.6" opacity="0.22" />
          <line x1="431" y1="460" x2="505" y2="460" stroke="#0047BA" strokeWidth="0.6" opacity="0.22" />
          <line x1="431" y1="520" x2="505" y2="520" stroke="#0047BA" strokeWidth="0.6" opacity="0.22" />
          <line x1="431" y1="580" x2="505" y2="580" stroke="#0047BA" strokeWidth="0.6" opacity="0.22" />
          <text x="468" y="92" fontFamily="Courier Prime, monospace" fontSize="9" fill="#0047BA" opacity="0.45" textAnchor="middle">
            FRACTIONATOR
          </text>

          {/* Pipes A→B */}
          <path d="M147 310 L190 310 L190 340 L259 340" stroke="#002E5D" strokeWidth="2" opacity="0.35" fill="none" />
          <path d="M147 420 L200 420 L200 430 L259 430" stroke="#002E5D" strokeWidth="2" opacity="0.3" fill="none" />
          <circle cx="190" cy="320" r="5" stroke="#002E5D" strokeWidth="1.5" opacity="0.45" fill="none" />
          <circle cx="200" cy="424" r="5" stroke="#002E5D" strokeWidth="1.5" opacity="0.4" fill="none" />

          {/* Pipes B→C */}
          <path d="M313 330 L370 300 L431 300" stroke="#002E5D" strokeWidth="2" opacity="0.32" fill="none" />
          <path d="M313 460 L370 440 L431 440" stroke="#002E5D" strokeWidth="2" opacity="0.28" fill="none" />
          <circle cx="355" cy="307" r="4" stroke="#002E5D" strokeWidth="1.5" opacity="0.38" fill="none" />

          {/* Flare stack */}
          <line x1="564" y1="60" x2="564" y2="620" stroke="#0047BA" strokeWidth="3" opacity="0.28" />
          <path d="M553 60 C 548 38, 558 18, 564 0 C 570 18, 580 38, 575 60 Z" fill="#002E5D" opacity="0.4" />
          <path d="M556 60 C 552 44, 559 28, 564 14 C 569 28, 576 44, 572 60 Z" fill="#0047BA" opacity="0.6" />
          <text x="564" y="80" fontFamily="Courier Prime, monospace" fontSize="8" fill="#0047BA" opacity="0.45" textAnchor="middle">
            FLARE
          </text>

          {/* Heat exchanger */}
          <rect x="50" y="570" width="130" height="42" rx="21" stroke="#0047BA" strokeWidth="1.5" opacity="0.35" fill="none" />
          <line x1="85" y1="570" x2="85" y2="612" stroke="#0047BA" strokeWidth="0.5" opacity="0.25" />
          <line x1="115" y1="570" x2="115" y2="612" stroke="#0047BA" strokeWidth="0.5" opacity="0.25" />
          <line x1="145" y1="570" x2="145" y2="612" stroke="#0047BA" strokeWidth="0.5" opacity="0.25" />
          <text x="115" y="564" fontFamily="Courier Prime, monospace" fontSize="8" fill="#0047BA" opacity="0.4" textAnchor="middle">
            HT. EXCHANGER
          </text>

          {/* Pump */}
          <circle cx="355" cy="595" r="26" stroke="#0047BA" strokeWidth="1.5" opacity="0.32" fill="none" />
          <path d="M342 595 L368 595 M355 582 L355 608" stroke="#0047BA" strokeWidth="1" opacity="0.28" />
          <text x="355" y="636" fontFamily="Courier Prime, monospace" fontSize="8" fill="#0047BA" opacity="0.38" textAnchor="middle">
            PUMP
          </text>

          {/* Product draw lines */}
          <line x1="147" y1="240" x2="175" y2="240" stroke="#0047BA" strokeWidth="1.5" opacity="0.3" />
          <line x1="147" y1="340" x2="175" y2="340" stroke="#0047BA" strokeWidth="1.5" opacity="0.25" />
          <line x1="147" y1="490" x2="175" y2="490" stroke="#0047BA" strokeWidth="1.5" opacity="0.2" />

          <text x="310" y="648" fontFamily="Courier Prime, monospace" fontSize="8" fill="#0047BA" opacity="0.2" textAnchor="middle">
            PROCESS FLOW SCHEMATIC, NOT TO SCALE
          </text>
        </svg>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">Oil Refinery Education, Plain and Simple</span>
          </div>
          <h1 className="hero-headline">
            LOVE<br />
            THE<br />
            <span className="italic-fire">Process</span>
          </h1>
          <p className="hero-sub">
            A plain-English introduction to oil refineries. No prior experience
            needed, just curiosity about how crude oil becomes the products the
            world runs on.
          </p>
          <div className="hero-actions">
            <Link href="/library#module-1" className="btn-primary">
              Start Learning
            </Link>
            <a href="#process" className="btn-ghost">
              See the Process
            </a>
          </div>
        </div>

        <div className="hero-scroll" aria-hidden="true">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           STATS
      ══════════════════════════════════════════════ */}
      <section id="stats">
        <div className="stats-grid">
          <div className="stat-item reveal">
            <div className="stat-value">
              <span className="stat-n" data-target="130">0</span>
              <span className="su">+</span>
            </div>
            <div className="stat-label">
              Active refineries<br />in the United States
            </div>
          </div>
          <div className="stat-item reveal d1">
            <div className="stat-value">
              <span className="stat-n" data-target="18">0</span>
              <span className="su" style={{ fontWeight: 300 }}> Million</span>
            </div>
            <div className="stat-label">
              Barrels processed<br />daily, US alone
            </div>
          </div>
          <div className="stat-item reveal d2">
            <div className="stat-value">
              <span className="stat-n" data-target="40">0</span>
              <span className="su">+</span>
            </div>
            <div className="stat-label">
              Distinct products<br />from a single barrel
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           MODULES
      ══════════════════════════════════════════════ */}
      <section id="modules">
        <div className="sec-head">
          <div>
            <div className="sec-label">
              <div className="sec-label-bar" />
              <span className="sec-label-text">Learning Modules</span>
            </div>
            <h2 className="sec-title reveal">
              THE<br />CURRICULUM
            </h2>
          </div>
          <p className="sec-desc reveal d2">
            Three modules covering hydrocarbon chemistry, refinery processes,
            and plant equipment, written in plain English for students,
            professionals, and the genuinely curious.
          </p>
        </div>

        <div className="modules-grid">
          <Link href="/library#module-1" className="module-card reveal">
            <div className="module-num">MODULE 01</div>
            <svg className="module-icon" viewBox="0 0 40 40" fill="none">
              <circle cx="14" cy="20" r="7" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="26" cy="20" r="7" stroke="currentColor" strokeWidth="1.5" />
              <line x1="4" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="32" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="20" y1="8" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="20" y1="28" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h3 className="module-title">
              Hydrocarbon Chemistry,<br />Feedstocks &amp; Products
            </h3>
            <p className="module-desc">
              Where it all begins. Learn what crude oil actually is, how
              hydrocarbons are classified, and how a barrel gets turned into
              gasoline, jet fuel, diesel, and everything in between.
            </p>
            <svg className="module-arrow" viewBox="0 0 28 28" fill="none">
              <path d="M5 23L23 5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 5h11v11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>

          <Link href="/library#module-2" className="module-card reveal d1">
            <div className="module-num">MODULE 02</div>
            <svg className="module-icon" viewBox="0 0 40 40" fill="none">
              <rect x="9" y="4" width="10" height="28" stroke="currentColor" strokeWidth="1.5" />
              <line x1="9" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="0.8" />
              <line x1="9" y1="20" x2="19" y2="20" stroke="currentColor" strokeWidth="0.8" />
              <line x1="9" y1="27" x2="19" y2="27" stroke="currentColor" strokeWidth="0.8" />
              <path d="M19 14C25 14 31 18 31 26V32H19" stroke="currentColor" strokeWidth="1.5" />
              <line x1="6" y1="32" x2="34" y2="32" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <h3 className="module-title">
              Refinery Processes<br />&amp; Units
            </h3>
            <p className="module-desc">
              The core of the operation. Understand how distillation columns,
              crackers, hydrotreaters, and reformers work together, and why
              each unit exists in the first place.
            </p>
            <svg className="module-arrow" viewBox="0 0 28 28" fill="none">
              <path d="M5 23L23 5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 5h11v11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>

          <Link href="/library#module-3" className="module-card reveal d2">
            <div className="module-num">MODULE 03</div>
            <svg className="module-icon" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 10v4M20 26v4M10 20h4M26 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M13 13l3 3M24 24l3 3M27 13l-3 3M16 24l-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <circle cx="20" cy="20" r="3" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <h3 className="module-title">
              Equipment, Inspection<br />&amp; Maintenance
            </h3>
            <p className="module-desc">
              The hands-on side of refining. Covers pumps, compressors, vessels,
              motors, and the inspection and maintenance practices that keep
              them running safely for decades.
            </p>
            <svg className="module-arrow" viewBox="0 0 28 28" fill="none">
              <path d="M5 23L23 5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 5h11v11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════════
           PROCESS
      ══════════════════════════════════════════════ */}
      <section id="process">
        <div className="process-rel">
          <div className="sec-head">
            <div>
              <div className="sec-label">
                <div className="sec-label-bar" />
                <span className="sec-label-text">Process Overview</span>
              </div>
              <h2 className="sec-title reveal">
                FROM WELL<br />TO PRODUCT
              </h2>
            </div>
            <p className="sec-desc reveal d2">
              Crude oil can&apos;t be used straight out of the ground. A refinery
              breaks it down, rearranges it, and cleans it up. The major
              products are transportation fuels that power the economy.
            </p>
          </div>

          <div className="process-flow">
            <div className="process-step reveal">
              <div className="process-node">
                <span className="process-node-n">01</span>
              </div>
              <div className="process-step-title">Crude Intake</div>
              <div className="process-step-desc">
                Raw crude arrives via pipeline or tanker and enters desalting
                units to remove brine and sediment
              </div>
            </div>
            <div className="process-step reveal d1">
              <div className="process-node">
                <span className="process-node-n">02</span>
              </div>
              <div className="process-step-title">Separation</div>
              <div className="process-step-desc">
                Distillation columns split crude into naphtha, kerosene, gas
                oil, and atmospheric residue fractions
              </div>
            </div>
            <div className="process-step reveal d2">
              <div className="process-node">
                <span className="process-node-n">03</span>
              </div>
              <div className="process-step-title">Conversion</div>
              <div className="process-step-desc">
                FCC, hydrocracking, and coking units crack heavy molecules into
                lighter, higher-value fuels
              </div>
            </div>
            <div className="process-step reveal d3">
              <div className="process-node">
                <span className="process-node-n">04</span>
              </div>
              <div className="process-step-title">Treatment</div>
              <div className="process-step-desc">
                Hydrotreaters strip sulfur, nitrogen, and metals to meet
                environmental specs and protect equipment
              </div>
            </div>
            <div className="process-step reveal d4">
              <div className="process-node">
                <span className="process-node-n">05</span>
              </div>
              <div className="process-step-title">Blending</div>
              <div className="process-step-desc">
                Finished products are blended to specification and dispatched by
                pipeline, tanker, or truck
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══════════════════════════════════════════════
           AUDIENCE
      ══════════════════════════════════════════════ */}
      <section id="audience">
        <div className="sec-label">
          <div className="sec-label-bar" />
          <span className="sec-label-text">Who It&apos;s For</span>
        </div>
        <h2 className="sec-title reveal" style={{ marginTop: 18 }}>
          BUILT FOR<br />THOSE WHO<br />WANT MORE
        </h2>

        <div className="audience-grid">
          <div>
            <div className="aud-stat-card reveal">
              <div className="aud-stat-n">13k+</div>
              <div className="aud-stat-lbl">
                Chemical engineering degrees awarded in the US each year (ASEE)
              </div>
            </div>
            <div className="aud-stat-card reveal d1">
              <div className="aud-stat-n">$94k</div>
              <div className="aud-stat-lbl">
                Median salary for a US refinery process operator. Often no
                degree required (BLS, 2024)
              </div>
            </div>
            <div className="aud-stat-card reveal d2">
              <div className="aud-stat-n">
                2{" "}
                <span style={{ fontSize: "0.5em", fontWeight: 300 }}>
                  Million+
                </span>
              </div>
              <div className="aud-stat-lbl">
                US jobs directly and indirectly supported by oil refining (AFPM)
              </div>
            </div>
          </div>

          <ul className="audience-list">
            <li className="audience-item reveal">
              <span className="aud-n">01</span>
              <div className="aud-item-body">
                <h3>Chemical Engineering Students</h3>
                <p>
                  Bridge the gap between classroom thermodynamics and real plant
                  operations. See exactly how separation, reaction, and heat
                  transfer principles play out at industrial scale.
                </p>
              </div>
            </li>
            <li className="audience-item reveal d1">
              <span className="aud-n">02</span>
              <div className="aud-item-body">
                <h3>Future Refinery Operators</h3>
                <p>
                  Whether entering through a technical program or on-the-job
                  training, get ahead of the curve. Understand the why behind
                  every procedure you&apos;ll follow in the control room.
                </p>
              </div>
            </li>
            <li className="audience-item reveal d2">
              <span className="aud-n">03</span>
              <div className="aud-item-body">
                <h3>People Who Work in Refining</h3>
                <p>
                  Refineries employ thousands of people across dozens of
                  disciplines. Whether you&apos;re an engineer, an operator, a
                  contractor, or someone who works with refineries from the
                  outside, this is a place to build your knowledge.
                </p>
              </div>
            </li>
            <li className="audience-item reveal d3">
              <span className="aud-n">04</span>
              <div className="aud-item-body">
                <h3>Curious Minds &amp; Career Changers</h3>
                <p>
                  No chemistry degree required to start. Modules build from
                  fundamentals up, making complex industrial processes
                  accessible without sacrificing technical depth.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Divider into CTA */}
      <div
        style={{
          height: 2,
          background: "linear-gradient(to right, var(--fire), transparent)",
          margin: "0 48px",
        }}
      />

      {/* ══════════════════════════════════════════════
           FINAL CTA
      ══════════════════════════════════════════════ */}
      <section id="cta">
        <div className="cta-inner">
          <h2 className="cta-title reveal">
            READY TO<br />
            <span className="fire-line">LOVE</span>
            THE PROCESS
          </h2>
          <p className="cta-desc reveal d1">
            Three modules. An introduction to refining technology.<br />
            A starting point for anyone who wants to understand how a refinery
            actually works.
          </p>
          <div className="cta-actions reveal d2">
            <Link
              href="/library#module-1"
              className="btn-primary"
              style={{ fontSize: 15, padding: "20px 52px" }}
            >
              Begin Module 01
            </Link>
          </div>
        </div>
      </section>

      <HomeInteractions />
    </>
  );
}
