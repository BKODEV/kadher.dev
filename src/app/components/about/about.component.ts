import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CountUpDirective } from '../../directives/count-up.directive';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

/** Une ligne clé/valeur du panneau « Aperçu · 2026 » en bas du composant. */
interface SnapshotRow {
  readonly k: string;
  readonly v: string;
}

/**
 * Section « À propos » — portrait, paragraphes de bio et carte snapshot
 * (stats animées + lignes clé/valeur). Les chiffres de stats utilisent
 * la directive `appCountUp` pour s'animer de 0 la première fois que la
 * section entre dans le viewport.
 */
@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, CountUpDirective, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly tags = [
    "7+ années d'expérience terrain",
    'BTS Informatique · Ing. IE (en cours)',
    'Freelance · Full-time',
    'FR · EN',
  ] as const;

  readonly snapshotRows: readonly SnapshotRow[] = [
    { k: 'POSTE', v: 'Responsable SI · Consultant IT' },
    { k: 'DISPONIBILITÉ', v: 'Freelance · Full-time' },
    { k: 'FORMATION', v: 'BTS Info · Ing. Intelligence Économique' },
    { k: 'BASE', v: 'Abidjan, CI' },
  ];
}
