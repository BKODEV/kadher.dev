import { ChangeDetectionStrategy, Component } from '@angular/core';

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
