import { useEffect, useRef } from 'react';

export default function MotionLayer({ children }) {
  const root = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let started = false;
    let cleanup;

    const initializeMotion = () => {
      if (started || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      started = true;
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, triggerModule]) => {
      if (cancelled || !root.current) return;
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia(root);

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.site-header', {
          y: -16,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power2.out',
        });

        gsap.from(
          ['.hero h1', '.hero-role', '.hero-description', '.hero-actions'],
          {
            y: 22,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.12,
          },
        );

        gsap.utils.toArray('.js-reveal', root.current).forEach((element) => {
          gsap.from(element, {
            y: 26,
            autoAlpha: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true,
            },
          });
        });

        gsap.utils.toArray('.work-card').forEach((card) => {
          gsap.fromTo(
            card.querySelector('.work-art'),
            { scale: 1.08 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top 35%',
                scrub: 0.8,
              },
            },
          );
        });

        const route = root.current.querySelector('.journey-route path');
        if (route) {
          const routeLength = route.getTotalLength();
          gsap.fromTo(route,
            { strokeDashoffset: routeLength },
            { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.journey-timeline', start: 'top 78%', end: 'bottom 65%', scrub: 0.7 } },
          );
        }

        const depthIcons = gsap.utils.toArray('.journey-medallion, .blog-card-art', root.current);
        const cleanups = depthIcons.map((icon) => {
          const onMove = (event) => {
            const bounds = icon.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            gsap.to(icon, { rotateY: x * 22, rotateX: y * -22, scale: 1.06, z: 18, duration: 0.35, ease: 'power2.out', transformPerspective: 650, overwrite: true });
          };
          const onLeave = () => gsap.to(icon, { rotateX: 0, rotateY: 0, scale: 1, z: 0, duration: 0.55, ease: 'elastic.out(1, 0.55)', overwrite: true });
          icon.addEventListener('pointermove', onMove);
          icon.addEventListener('pointerleave', onLeave);
          return () => {
            icon.removeEventListener('pointermove', onMove);
            icon.removeEventListener('pointerleave', onLeave);
          };
        });

        gsap.delayedCall(0.2, () => ScrollTrigger.refresh());

        return () => cleanups.forEach((cleanup) => cleanup());

      });

      cleanup = () => media.revert();
      }).catch(() => {});
    };
    const passiveOptions = { once: true, passive: true };
    window.addEventListener('scroll', initializeMotion, passiveOptions);
    window.addEventListener('pointerdown', initializeMotion, passiveOptions);
    window.addEventListener('keydown', initializeMotion, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('scroll', initializeMotion);
      window.removeEventListener('pointerdown', initializeMotion);
      window.removeEventListener('keydown', initializeMotion);
      cleanup?.();
    };
  }, []);

  return <div ref={root} className="motion-root">{children}</div>;
}
