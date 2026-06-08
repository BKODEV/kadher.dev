import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Pied de page du site — ligne de signature, utilisée à la fois sur
 *  la page d'accueil et sur les pages d'études de cas. */
@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <span class="sig">© 2026 Bini Kadher Ouattara · Abidjan, CI</span>
      <span>Conçu avec soin · Angular hors-service · Laravel d'astreinte</span>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
