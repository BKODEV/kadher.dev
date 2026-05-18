import {
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly to = input.required<number>({ alias: 'appCountUp' });
  readonly duration = input<number>(1400);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      // Render final value during SSR to avoid empty text
      afterNextRender(() => {
        this.host.nativeElement.textContent = String(this.to());
      });
      return;
    }

    afterNextRender(() => {
      const el = this.host.nativeElement;
      const target = this.to();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduced || typeof IntersectionObserver === 'undefined') {
        el.textContent = String(target);
        return;
      }

      el.textContent = '0';
      let started = false;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || started) return;
          started = true;
          io.disconnect();
          const start = performance.now();
          const dur = this.duration();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = String(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
        { threshold: 0.4 },
      );
      io.observe(el);
    });
  }
}
