import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

/**
 * Section Hero / above-the-fold.
 *
 * Le ticker en bas affiche l'heure courante à Abidjan (Africa/Abidjan,
 * GMT, sans heure d'été), rafraîchie toutes les 30 s. Le tick ne tourne
 * qu'en navigateur — en SSR le signal conserve son placeholder pour
 * éviter de figer une heure de build dans le HTML prérendu.
 */
@Component({
  selector: 'app-hero',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly time = signal<string>('—:— GMT');

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    afterNextRender(() => {
      const tick = () => {
        const fmt = new Intl.DateTimeFormat('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Africa/Abidjan',
          hour12: false,
        });
        this.time.set(fmt.format(new Date()) + ' GMT');
      };
      tick();
      const handle = window.setInterval(tick, 30_000);
      this.destroyRef.onDestroy(() => window.clearInterval(handle));
    });
  }
}
