import {
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Anime le contenu texte de l'élément hôte de 0 jusqu'à un nombre cible
 * la première fois que la section entre dans le viewport (easing cubic
 * ease-out, ~1,4 s par défaut).
 *
 * - En SSR la valeur finale est rendue directement, ce qui garantit que
 *   les crawlers et le mode sans JS voient le bon chiffre.
 * - Respecte `prefers-reduced-motion` : on saute directement à la
 *   valeur cible.
 *
 * Usage : `<span [appCountUp]="46">46</span>`. Le fallback "46" dans le
 * template garde une sortie SSR correcte si la directive n'a pas encore
 * eu le temps de s'exécuter.
 */
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
