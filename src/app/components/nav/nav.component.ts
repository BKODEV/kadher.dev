import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { ScrollSpyService } from '../../services/scroll-spy.service';

interface NavSection {
  readonly id: string;
  readonly label: string;
  readonly idx: string;
}

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
    { id: 'projects', label: 'Projets', idx: '03' },
    { id: 'journey', label: 'Parcours', idx: '04' },
    { id: 'contact', label: 'Contact', idx: '05' },
  ];

  constructor() {
    afterNextRender(() => {
      this.scrollSpy.observe(this.sections.map((s) => s.id));
    });
  }
}
