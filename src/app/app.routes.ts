import { Routes } from '@angular/router';

/**
 * Routes de l'application.
 *
 * Toutes les pages sont chargées en lazy via `loadComponent` afin que
 * chaque route n'embarque que son propre code. La route `/formations`
 * est volontairement déclarée avec `data: { enabled: false }` — pour
 * l'activer, remplacer le composant placeholder par le vrai puis
 * supprimer le flag `enabled`.
 *
 * `/projets/:slug` pointe sur un `CaseStudyComponent` partagé qui lit
 * le slug dans les paramètres de route (voir `data/case-studies.data.ts`).
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Bini Kadher Ouattara — Développeur Full-Stack & Responsable SI',
  },
  {
    path: 'projets/:slug',
    loadComponent: () =>
      import('./pages/case-study/case-study.component').then(m => m.CaseStudyComponent),
    title: 'Étude de cas — kadher.dev',
  },
  {
    path: 'formations',
    loadComponent: () =>
      import('./pages/formations/formations.component').then(m => m.FormationsComponent),
    title: 'Formations — kadher.dev',
    data: { enabled: false },
  },
  { path: '**', redirectTo: '' },
];
