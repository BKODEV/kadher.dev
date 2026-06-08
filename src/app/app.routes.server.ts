import { RenderMode, ServerRoute } from '@angular/ssr';
import { CASE_STUDIES } from './data/case-studies.data';

/**
 * Configuration du rendu côté serveur.
 *
 * Toutes les routes sont prérendues au build, de sorte que l'app peut
 * être servie par un simple serveur de fichiers statiques (nginx). La
 * route paramétrique `/projets/:slug` utilise `getPrerenderParams()`
 * pour générer un fichier HTML par étude de cas — la liste reste
 * pilotée par `case-studies.data.ts`, jamais dupliquée ici.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'formations', renderMode: RenderMode.Prerender },
  {
    path: 'projets/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
    },
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
