import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Coquille racine de l'application.
 *
 * Volontairement minimaliste : n'héberge que le `router-outlet`. Le
 * layout de page (nav, sections, footer) est déclaré dans chaque page
 * routée, ce qui permet aux études de cas d'afficher leur propre en-tête
 * au lieu de la navigation principale.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet />`,
  styles: [`:host { display: contents; }`],
})
export class App {}
