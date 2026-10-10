'use strict';
window.portalMotion = (() => {
  let context;
  return {
    destroy() { context?.revert(); context = null; },
    start() {
      const gallery = document.querySelector('.portal-gallery');
      gallery?.querySelector('.portal-directory-link').addEventListener('click', () => {
        document.getElementById('portalDirectory')?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
      });
      if (!gallery || !window.gsap || !window.ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
          const track = gallery.querySelector('.portal-track');
          const distance = () => Math.max(0, track.scrollWidth - gallery.clientWidth + 48);
          const timeline = gsap.timeline({scrollTrigger: {
            trigger: gallery, scroller: document.getElementById('pageScroll'), start: 'top top',
            end: () => '+=' + Math.max(distance(), innerHeight * 1.8),
            pin: true, scrub: true, invalidateOnRefresh: true,
            onUpdate: self => {
              gallery.querySelector('.portal-progress-fill').style.transform = `scaleX(${self.progress})`;
            }
          }});
          timeline.to(track, {x: () => -distance(), ease: 'none'}, 0);

        });
      }, gallery.parentElement);
      ScrollTrigger.refresh();
    }
  };
})();

