import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { ScrollSpyService } from '../../services/scroll-spy.service';

/** Une entrée de la nav sticky. `id` doit correspondre à l'ID DOM de la section. */
interface NavSection {
  readonly id: string;
  readonly label: string;
  readonly idx: string;
}

/**
 * Navigation sticky en haut de page. Affiche la marque, une pastille
 * par section et le CTA principal « Prendre contact ».
 *
 * La pastille active et la bordure « scrolled » sont pilotées par les
 * signals du `ScrollSpyService` ; les IDs des sections sont enregistrés
 * via `observe()` une fois la vue rendue.
 */
@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private readonly scrollSpy = inject(ScrollSpyService);

  readonly scrolled = this.scrollSpy.scrolled;
  readonly active = this.scrollSpy.activeId;

  readonly sections: readonly NavSection[] = [
    { id: 'about', label: 'À propos', idx: '01' },
    { id: 'stack', label: 'Stack', idx: '02' },
    { id: 'services', label: 'Services', idx: '03' },
    { id: 'projects', label: 'Projets', idx: '04' },
    { id: 'journey', label: 'Parcours', idx: '05' },
    { id: 'contact', label: 'Contact', idx: '06' },
  ];

  constructor() {
    afterNextRender(() => {
      this.scrollSpy.observe(this.sections.map((s) => s.id));
    });
  }
}
