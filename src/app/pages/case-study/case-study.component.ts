import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  CASE_STUDIES,
  CaseStudy,
  findCaseStudy,
  nextCaseStudy,
} from '../../data/case-studies.data';
import { FooterComponent } from '../../components/footer/footer.component';

/**
 * Composant unique partagé par toutes les routes `/projets/:slug`.
 *
 * Recherche le slug dans {@link CASE_STUDIES} ; s'il ne correspond à
 * rien, l'utilisateur est redirigé vers la section projets de l'accueil
 * afin qu'une URL mal tapée n'atterrisse jamais sur une page vide. Le
 * slug est lu de manière réactive : la navigation côté client entre
 * études de cas (via le CTA « Projet suivant ») re-rend la même
 * instance avec les nouvelles données.
 */
@Component({
  selector: 'app-case-study',
  imports: [RouterLink, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './case-study.component.html',
  styleUrl: './case-study.component.scss',
})
export class CaseStudyComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly study = computed<CaseStudy | undefined>(() => {
    const slug = this.params().get('slug');
    return slug ? findCaseStudy(slug) : undefined;
  });

  readonly next = computed<CaseStudy | null>(() => {
    const s = this.study();
    return s ? nextCaseStudy(s.slug) : null;
  });

  /**
   * Redirige vers la section projets si le slug est inconnu. Différé
   * dans une microtask pour laisser la résolution de route se terminer
   * d'abord — naviguer de façon synchrone depuis le constructeur est
   * risqué.
   */
  constructor() {
    queueMicrotask(() => {
      if (!this.study()) {
        this.router.navigate(['/'], { fragment: 'projects', replaceUrl: true });
      }
    });
  }
}
