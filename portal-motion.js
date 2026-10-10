"use strict";
window.portalMotion = (() => {
  let context;
  let cleanup = () => {};
  return {
    destroy() { cleanup(); cleanup = () => {}; context?.revert(); context = null; },
    start() {
      const gallery = document.querySelector('.portal-gallery');
      if (!gallery) return;
      const track = gallery.querySelector('.portal-track');
      const listeners = [];
      const listen = (element, event, handler) => {
        element.addEventListener(event, handler);
        listeners.push(() => element.removeEventListener(event, handler));
      };
      listen(gallery.querySelector('.portal-directory-link'), 'click', () => {
        document.getElementById('portalDirectory')?.scrollIntoView({behavior: 'auto'});
      });
      const progress = () => {
        const distance = track.scrollWidth - track.clientWidth;
        gallery.querySelector('.portal-progress-fill').style.transform = `scaleX(${distance > 0 ? track.scrollLeft / distance : 1})`;
      };
      listen(track, 'scroll', progress);
      listen(window, 'resize', progress);
      progress();
      cleanup = () => listeners.forEach(remove => remove());
      if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      context = gsap.context(() => {
        gallery.querySelectorAll('.portal-record').forEach(card => {
          const image = card.querySelector('img');
          const arrow = card.querySelector('.portal-box-label > span');
          const animate = active => {
            gsap.to(image, {scale: active ? 1.04 : 1, duration: .3, ease: 'power2.out', overwrite: true});
            gsap.to(arrow, {x: active ? 3 : 0, y: active ? -3 : 0, duration: .3, ease: 'power2.out', overwrite: true});
          };
          listen(card, 'pointerenter', event => { if (event.pointerType === 'mouse') animate(true); });
          listen(card, 'pointerleave', () => animate(false));
          listen(card, 'focus', () => animate(true));
          listen(card, 'blur', () => animate(false));
        });
      }, gallery);
    }
  };
})();
