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
            pin: true, scrub: 1, invalidateOnRefresh: true,
            onUpdate: self => {
              gallery.querySelector('.portal-progress-fill').style.transform = `scaleX(${self.progress})`;
            }
          }});
          timeline.to(track, {x: () => -distance(), ease: 'none'}, 0)
            .fromTo('.portal-disc', {rotation: -18}, {rotation: 24, ease: 'none'}, 0);
          gsap.from('.portal-gallery-heading > *', {y: 28, opacity: 0, stagger: .12, duration: .8,
            scrollTrigger: {trigger: gallery, scroller: document.getElementById('pageScroll'), start: 'top 85%'}});
          gsap.utils.toArray('.portal-featured .featured-client').forEach((card, index) => {
            gsap.from(card, {x: index % 2 ? 55 : -55, opacity: 0, duration: .8,
              scrollTrigger: {trigger: card, scroller: document.getElementById('pageScroll'), start: 'top 90%'}});
          });
        });
      }, gallery.parentElement);
      ScrollTrigger.refresh();
    }
  };
})();

