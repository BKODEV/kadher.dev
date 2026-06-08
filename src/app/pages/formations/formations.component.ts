import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Page placeholder pour la future section « /formations ».
 *
 * La route est déclarée avec `data: { enabled: false }` dans
 * `app.routes.ts` comme signal qu'il s'agit d'un stub. Pour la mettre
 * en ligne : remplacer le template par du vrai contenu et supprimer le
 * flag `enabled: false`.
 */
@Component({
  selector: 'app-formations',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="placeholder">
      <span class="eyebrow">Bientôt</span>
      <h1>Formations<span class="dot">.</span></h1>
      <p>
        Cette section est en cours de préparation — elle accueillera les programmes
        de formation animés par Bini Kadher Ouattara et son équipe.
      </p>
      <a routerLink="/" class="btn btn-ghost">← Retour à l'accueil</a>
    </main>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
    .placeholder {
      max-width: 640px;
      margin: 0 auto;
      padding: clamp(120px, 16vh, 180px) var(--gutter) clamp(80px, 10vw, 120px);
      display: flex; flex-direction: column; gap: 18px;
    }
    h1 {
      margin: 0;
      font-size: clamp(40px, 7vw, 72px);
      font-weight: 500;
      letter-spacing: -0.035em;
      line-height: 1;
    }
    h1 .dot { color: var(--accent); }
    p { color: var(--text-dim); max-width: 50ch; }
    .btn { align-self: flex-start; margin-top: 12px; }
  `],
})
export class FormationsComponent {}
