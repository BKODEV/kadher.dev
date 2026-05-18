import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Bini Kadher Ouattara — Développeur Full-Stack & Responsable SI',
  },
  {
    path: 'formations',
    loadComponent: () =>
      import('./pages/formations/formations.component').then(m => m.FormationsComponent),
    title: 'Formations — bko.dev',
    data: { enabled: false },
  },
  { path: '**', redirectTo: '' },
];
