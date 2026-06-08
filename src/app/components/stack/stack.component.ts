import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

/**
 * Une carte de la grille « Stack ».
 * @property learning - Si true, la carte affiche le badge « en cours »
 *   et ses items prennent une bordure pointillée pour signaler une
 *   techno exploratoire.
 */
interface StackGroup {
  readonly kind: string;
  readonly icon: string;
  readonly items: readonly string[];
  readonly learning?: boolean;
}

/**
 * Grille de la stack technique (Frontend / Backend / Bases de données /
 * Infrastructure / Outils / Mobile / En apprentissage). Purement
 * présentationnel — toutes les données sont dans le tableau `stack`.
 */
@Component({
  selector: 'app-stack',
  imports: [RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss',
})
export class StackComponent {
  readonly stack: readonly StackGroup[] = [
    { kind: 'Frontend', icon: 'FE', items: ['Angular', 'TypeScript', 'HTML5/CSS', 'Bootstrap', 'RxJS'] },
    { kind: 'Backend', icon: 'BE', items: ['Laravel', 'PHP 8', 'REST APIs', 'Auth & RBAC', 'Queues'] },
    { kind: 'Bases de données', icon: 'DB', items: ['MySQL', 'PostgreSQL', 'Redis', 'Sauvegardes & réplication'] },
    {
      kind: 'Infrastructure',
      icon: 'IO',
      items: ['Proxmox VE', 'Linux (Debian/Ubuntu)', 'Serveurs auto-hébergés', 'NextCloud', 'Serveurs mail'],
    },
    { kind: 'Outils', icon: 'TL', items: ['Docker', 'Git · GitHub Actions', 'CI/CD', 'Twilio', 'imapsync'] },
    { kind: 'Mobile', icon: 'MB', items: ['Flutter', 'Dart'] },
    {
      kind: 'En apprentissage',
      icon: 'LX',
      items: ['LLM / API IA', 'Bases vectorielles', 'Data viz'],
      learning: true,
    },
  ];

  /** Libellé en haut à droite de la carte : index sur 2 chiffres, ou
   *  « en cours » pour les technos en apprentissage. */
  indexLabel(i: number, learning?: boolean): string {
    return learning ? 'en cours' : String(i + 1).padStart(2, '0');
  }
}
