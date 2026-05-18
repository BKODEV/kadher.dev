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
  selector: '[appReveal]',
  host: {
    class: 'reveal',
  },
})
export class RevealOnScrollDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly threshold = input<number>(0.15, { alias: 'revealThreshold' });

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    afterNextRender(() => {
      const el = this.host.nativeElement;

      if (
        typeof window === 'undefined' ||
        typeof IntersectionObserver === 'undefined' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        el.classList.add('in');
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              el.classList.add('in');
              io.disconnect();
              return;
            }
          }
        },
        { threshold: this.threshold(), rootMargin: '0px 0px -8% 0px' },
      );
      io.observe(el);
    });
  }
}
