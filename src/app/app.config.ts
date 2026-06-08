import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

/**
 * Providers de l'application côté navigateur.
 *
 * Choix notables :
 * - `provideZonelessChangeDetection()` — l'app est entièrement pilotée
 *   par les signals, donc Zone.js est inutile.
 * - `withInMemoryScrolling` + `withViewTransitions` — défilement vers
 *   les ancres (ex. `/#projects`) et API View Transitions native pour
 *   les changements de route.
 * - `withIncrementalHydration` — requis par les blocs
 *   `@defer (hydrate ...)` du home : les sections différées sont rendues
 *   côté serveur mais leur JS ne s'hydrate qu'au déclenchement.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
      withViewTransitions(),
    ),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    provideHttpClient(withFetch()),
  ],
};
