"use strict";
window.portalMotion = (() => {
  let context;
  let horizontalContext;
  let cleanup = () => {};
  return {
    destroy() { cleanup(); cleanup = () => {}; horizontalContext?.revert(); horizontalContext = null; context?.revert(); context = null; },
    start() {
      const services = document.querySelector('.services-motion');
      const setupHorizontal = (section, track) => {
        if (!window.gsap || !window.ScrollTrigger || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        gsap.registerPlugin(ScrollTrigger);
        horizontalContext = gsap.matchMedia();
        horizontalContext.add('(min-width: 901px) and (min-height: 700px)', () => {
          gsap.set(track, {scrollSnapType: 'none'});
          gsap.to(track, {
            scrollLeft: () => Math.max(0, track.scrollWidth - track.clientWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: section, scroller: '#pageScroll', start: 'top top',
              end: () => `+=${Math.max(1, track.scrollWidth - track.clientWidth)}`,
              pin: true, scrub: .6, invalidateOnRefresh: true
            }
          });
          const focusCard = event => {
            const card = event.target.closest('.card, .portal-record');
            if (!card) return;
            const trigger = ScrollTrigger.getAll().find(item => item.trigger === section);
            if (trigger) trigger.scroll(trigger.start + Math.max(0, Math.min(track.scrollWidth - track.clientWidth, card.offsetLeft - track.offsetLeft - 24)));
          };
          track.addEventListener('focusin', focusCard);
          return () => { track.removeEventListener('focusin', focusCard); track.scrollLeft = 0; };
        });
        horizontalContext.add('(max-width: 900px), (max-height: 699px)', () => {
          gsap.from(track.querySelectorAll('.card'), {
            x: 80, opacity: 0, duration: .7, stagger: .06, ease: 'power2.out',
            scrollTrigger: {
              trigger: section, scroller: '#pageScroll', start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          });
        });
      };
      if (services) setupHorizontal(services, services.querySelector('.services-track'));
      const gallery = document.querySelector('.portal-gallery');
      if (!gallery) return;
      const track = gallery.querySelector('.portal-track');
      const listeners = [];
      const toggle = gallery.querySelector('.portal-view-toggle');
      let simple = false;
      const listen = (element, event, handler) => {
        element.addEventListener(event, handler);
        listeners.push(() => element.removeEventListener(event, handler));
      };
      listen(gallery.querySelector('.portal-browse'), 'click', () => {
        document.getElementById('portalDirectory')?.scrollIntoView({behavior: 'auto'});
      });
      listen(toggle, 'click', () => {
        simple = !simple;
        gallery.classList.toggle('portal-simple', simple);
        toggle.setAttribute('aria-pressed', String(simple));
        toggle.textContent = simple ? 'Gallery view' : 'Simple view';
      });
      const progress = () => {
        const distance = track.scrollWidth - track.clientWidth;
        gallery.querySelector('.portal-progress-fill').style.transform = `scaleX(${distance > 0 ? track.scrollLeft / distance : 1})`;
      };
      listen(track, 'scroll', progress);
      listen(window, 'resize', progress);
      progress();
      cleanup = () => listeners.forEach(remove => remove());
    }
  };
})();
