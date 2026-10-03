import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const practice = [
  {
    number: '01',
    title: 'Web development',
    className: 'practice-web',
    summary: 'Responsive interfaces, reusable UI, and APIs.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'JSX', 'Context API', 'REST APIs'],
    details: 'Built responsive React interfaces with reusable components, Hooks, and Context API. Connected interfaces to REST endpoints and adjusted layouts for different screen sizes.',
    practice: 'Reusable component structure, client-side state, REST API integration, responsive styling, and CSS-in-JS.',
    tools: ['HTML', 'CSS', 'JavaScript', 'React.js', 'JSX', 'React Hooks', 'Context API', 'REST APIs', 'Responsive design', 'Component architecture', 'CSS-in-JS'],
  },
  {
    number: '02',
    title: 'Cybersecurity',
    className: 'practice-security',
    summary: 'Security fundamentals and authorized assessment.',
    skills: ['VAPT', 'OWASP Top 10', 'Reconnaissance', 'Network security', 'Mobile & Wi-Fi'],
    details: 'Completed a six-month ethical hacking internship focused on learning assessment methods within an authorized scope and communicating findings responsibly.',
    practice: 'Footprinting and reconnaissance, client-side attack concepts, network fundamentals, mobile and Wi-Fi security, and writing reports with remediation recommendations.',
    tools: ['Ethical hacking', 'VAPT concepts', 'OWASP Top 10', 'Footprinting', 'Reconnaissance', 'Client-side attacks', 'Social engineering awareness', 'Malware awareness', 'Mobile security', 'Wi-Fi security', 'Steganography', 'Password security', 'Network security', 'Penetration-testing reports'],
  },
  {
    number: '03',
    title: 'Content & media',
    className: 'practice-media',
    summary: 'Visual storytelling through edit, color, and motion.',
    skills: ['Premiere Pro', 'After Effects', 'CapCut', 'Photography', 'Motion graphics'],
    details: 'Created freelance video and visual content for social media, marketing, and personal branding, focusing on clear pacing and a consistent visual finish.',
    practice: 'Cutting footage, color grading, motion graphics, image editing, photography, and synchronizing audio with picture.',
    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut', 'Image editing', 'Photography', 'Motion graphics', 'Audio synchronization'],
  },
];

const motionDuration = 460;
const focusableSelector = 'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFlipTransform(from, to) {
  const scaleX = from.width / to.width;
  const scaleY = from.height / to.height;
  const translateX = from.left + from.width / 2 - (to.left + to.width / 2);
  const translateY = from.top + from.height / 2 - (to.top + to.height / 2);
  return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
}

function PracticeModal({ item, icon, sourceElement, panelRef, closeButtonRef, onClosed }) {
  const overlayRef = useRef(null);
  const closingRef = useRef(false);

  useLayoutEffect(() => {
    const body = document.body;
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;

    const panel = panelRef.current;
    const overlay = overlayRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (panel && overlay && sourceElement) {
      const sourceRect = sourceElement.getBoundingClientRect();
      const modalRect = panel.getBoundingClientRect();
      panel.style.transformOrigin = 'center center';
      overlay.style.opacity = '0';

      if (!prefersReducedMotion) {
        panel.style.transform = getFlipTransform(sourceRect, modalRect);
        panel.style.opacity = '0.82';
      } else {
        panel.style.opacity = '0';
      }

      requestAnimationFrame(() => {
        panel.style.transition = prefersReducedMotion
          ? 'opacity 160ms ease-out'
          : `transform ${motionDuration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity 220ms ease-out`;
        overlay.style.transition = 'opacity 220ms ease-out';
        panel.style.transform = 'translate(0, 0) scale(1, 1)';
        panel.style.opacity = '1';
        overlay.style.opacity = '1';
      });
    }

    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      Object.assign(body.style, previousBodyStyles);
      window.scrollTo(0, scrollY);
    };
  }, [closeButtonRef, panelRef, sourceElement]);

  const closeWithAnimation = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    const panel = panelRef.current;
    const overlay = overlayRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sourceRect = sourceElement?.getBoundingClientRect();
    const modalRect = panel?.getBoundingClientRect();

    if (panel && overlay && sourceRect && modalRect && !prefersReducedMotion) {
      panel.style.transition = `transform ${motionDuration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity 220ms ease-in`;
      overlay.style.transition = `opacity ${motionDuration}ms ease-in`;
      panel.style.transform = getFlipTransform(sourceRect, modalRect);
      panel.style.opacity = '0.82';
      overlay.style.opacity = '0';
      window.setTimeout(onClosed, motionDuration);
      return;
    }

    if (panel && overlay) {
      panel.style.transition = 'opacity 140ms ease-in';
      overlay.style.transition = 'opacity 140ms ease-in';
      panel.style.opacity = '0';
      overlay.style.opacity = '0';
    }
    window.setTimeout(onClosed, 140);
  }, [onClosed, panelRef, sourceElement]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeWithAnimation();
      return;
    }
    if (event.key !== 'Tab' || !panelRef.current) return;

    const focusable = [...panelRef.current.querySelectorAll(focusableSelector)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return createPortal(
    <div
      className="practice-modal-overlay"
      ref={overlayRef}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeWithAnimation();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeWithAnimation();
      }}
    >
      <section
        aria-labelledby={`practice-modal-title-${item.number}`}
        aria-modal="true"
        className={`practice-modal ${item.className}`}
        onKeyDown={handleKeyDown}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <button
          aria-label={`Close ${item.title} details`}
          className="practice-modal-close"
          onClick={closeWithAnimation}
          ref={closeButtonRef}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
        <div className="practice-modal-content">
          <div className="practice-meta"><span>{item.number} / 03</span><span>MANISH · 2026</span></div>
          <div className="practice-art practice-modal-art" aria-hidden="true">
            <span className="practice-glyph">{icon}</span><span className="practice-ring" />
          </div>
          <h2 className="practice-modal-title" id={`practice-modal-title-${item.number}`}>{item.title}</h2>
          <p className="practice-summary practice-modal-summary">{item.summary}</p>
          <p className="practice-details-description">{item.details}</p>
          <h3>Built &amp; practised</h3>
          <p className="practice-details-copy">{item.practice}</p>
          <h3>Skills &amp; tools</h3>
          <ul className="practice-tools">{item.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </div>
      </section>
    </div>,
    document.body,
  );
}

function PracticeCard({ item, index, cardRef, onOpen }) {
  const icon = index === 0 ? '〈/〉' : index === 1 ? '⌑' : '✳';

  return (
    <article className={`practice-card js-reveal ${item.className}`}>
      <button
      aria-haspopup="dialog"
      className="practice-card-trigger"
      onClick={(event) => onOpen(item, icon, event.currentTarget)}
      ref={cardRef}
      type="button"
    >
        <span className="practice-meta"><span>{item.number} / 03</span><span>MANISH · 2026</span></span>
        <span className="practice-art" aria-hidden="true"><span className="practice-glyph">{icon}</span><span className="practice-ring" /></span>
        <span className="practice-title">{item.title}</span>
        <span className="practice-summary">{item.summary}</span>
        <span className="practice-skills">{item.skills.map((skill) => <span className="practice-skill" key={skill}>{skill}</span>)}</span>
      </button>
    </article>
  );
}

export default function Explorations() {
  const [activeItem, setActiveItem] = useState(null);
  const [sourceElement, setSourceElement] = useState(null);
  const [activeIcon, setActiveIcon] = useState('');
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const sourceRefs = useRef(practice.map(() => ({ current: null })));

  const openModal = useCallback((item, icon, element) => {
    if (activeItem) return;
    setActiveItem(item);
    setActiveIcon(icon);
    setSourceElement(element);
  }, [activeItem]);

  useEffect(() => {
    if (activeItem) return undefined;
    sourceElement?.focus({ preventScroll: true });
    return undefined;
  }, [activeItem, sourceElement]);

  return (
    <section className="explorations-section page-section" id="explorations">
      <h2 className="sr-only">Skills</h2>
      <div className="exploration-heading">
        <div><h2>What I’m <em>learning.</em></h2><p>A growing toolkit across the things I enjoy building and exploring.</p></div>
        <div className="orbit-stamp" aria-hidden="true"><span>M</span><i>WEB · SECURITY · MEDIA</i></div>
      </div>
      <div className="practice-grid">
        {practice.map((item, index) => (
          <PracticeCard
            cardRef={sourceRefs.current[index]}
            index={index}
            item={item}
            key={item.number}
            onOpen={openModal}
          />
        ))}
      </div>
      {activeItem && (
        <PracticeModal
          closeButtonRef={closeButtonRef}
          icon={activeIcon}
          item={activeItem}
          onClosed={() => {
            setActiveItem(null);
          }}
          panelRef={panelRef}
          sourceElement={sourceElement}
        />
      )}
    </section>
  );
}
