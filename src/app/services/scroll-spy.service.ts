import {
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Détecte quelle section du home est actuellement à l'écran, afin que
 * la pastille active de la nav puisse la mettre en évidence.
 *
 * Repose sur des calculs de position de scroll (re-lecture de
 * `getElementById` à chaque frame) plutôt que sur un
 * `IntersectionObserver`. Raison : on reste correct même lorsque les
 * sections apparaissent tardivement — typiquement lorsqu'un bloc
 * `@defer (hydrate on viewport)` s'hydrate et qu'Angular remplace ou
 * recâble son DOM. Le calcul est throttlé via `requestAnimationFrame`
 * et protégé par un check `isPlatformBrowser` (no-op en SSR).
 *
 * Les consommateurs appellent `observe(ids)` une fois avec la liste
 * ordonnée des IDs à suivre ; les mises à jour passent par le signal
 * `activeId`.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly activeId = signal<string>('about');
  readonly scrolled = signal<boolean>(false);

  private sectionIds: readonly string[] = [];
  private rafHandle: number | null = null;

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    const tick = () => {
      this.scrolled.set(window.scrollY > 24);
      if (this.rafHandle != null) return;
      this.rafHandle = requestAnimationFrame(() => {
        this.rafHandle = null;
        this.updateActive();
      });
    };

    tick();
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick, { passive: true });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
      if (this.rafHandle != null) cancelAnimationFrame(this.rafHandle);
    });
  }

  /**
   * Enregistre la liste ordonnée des IDs de sections à suivre. À appeler
   * une fois à l'init du composant. Un appel ultérieur remplace
   * intégralement la liste précédente.
   */
  observe(ids: readonly string[]): void {
    this.sectionIds = ids;
    if (isPlatformBrowser(this.platformId)) this.updateActive();
  }

  /**
   * Sélectionne la section dont le haut a franchi le plus récemment
   * ~35 % du viewport. On parcourt la liste dans l'ordre déclaré, donc
   * les sections plus basses gagnent les égalités — ce qui correspond
   * au sens de lecture descendant de l'utilisateur.
   */
  private updateActive(): void {
    if (this.sectionIds.length === 0) return;

    // A section is "active" once its top crosses ~35% of the viewport.
    // Querying getElementById on every frame keeps us correct even when
    // sections appear late (incremental hydration, lazy @defer blocks).
    const threshold = window.innerHeight * 0.35;
    let active = this.sectionIds[0];

    for (const id of this.sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) active = id;
    }

    if (active !== this.activeId()) this.activeId.set(active);
  }
}
