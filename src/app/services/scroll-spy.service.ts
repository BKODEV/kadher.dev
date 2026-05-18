import {
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private observer: IntersectionObserver | null = null;
  private readonly observed = new Set<string>();

  readonly activeId = signal<string>('about');
  readonly scrolled = signal<boolean>(false);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    const onScroll = () => this.scrolled.set(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) this.activeId.set(e.target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    );

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
      this.observer?.disconnect();
      this.observer = null;
    });
  }

  observe(ids: readonly string[]): void {
    if (!isPlatformBrowser(this.platformId) || !this.observer) return;
    for (const id of ids) {
      if (this.observed.has(id)) continue;
      const el = document.getElementById(id);
      if (!el) continue;
      this.observer.observe(el);
      this.observed.add(id);
    }
  }
}
