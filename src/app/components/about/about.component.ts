import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CountUpDirective } from '../../directives/count-up.directive';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface SnapshotRow {
  readonly k: string;
  readonly v: string;
}

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
    { k: 'POSTE', v: 'Responsable SI · Consultant indépendant' },
    { k: 'CLIENT PRINCIPAL', v: 'Innov Immobilier' },
    { k: 'FORMATION', v: 'BTS Info · Ing. Intelligence Économique' },
    { k: 'BASE', v: 'Abidjan, CI' },
  ];
}
