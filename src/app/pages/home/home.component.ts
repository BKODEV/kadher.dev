import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { StackComponent } from '../../components/stack/stack.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { JourneyComponent } from '../../components/journey/journey.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';

/**
 * Page d'accueil. Assemble toutes les sections de premier niveau.
 *
 * Le Hero est chargé en eager car il occupe le viewport initial. Toutes
 * les sections suivantes sont encapsulées dans
 * `@defer (hydrate on viewport; hydrate on interaction; prefetch on idle)` :
 * - les triggers `hydrate` conservent la section dans le HTML prérendu
 *   (bon pour le SEO et le premier paint) tout en différant
 *   l'hydratation JS jusqu'à ce qu'elle soit nécessaire ;
 * - `prefetch on idle` préchauffe le chunk JS en arrière-plan pour que
 *   l'hydratation soit instantanée le moment venu.
 */
@Component({
  selector: 'app-home',
  imports: [
    NavComponent,
    HeroComponent,
    AboutComponent,
    StackComponent,
    ServicesComponent,
    ProjectsComponent,
    JourneyComponent,
    ContactComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-nav />
    <main id="main">
      <app-hero />

      @defer (hydrate on viewport; hydrate on interaction; prefetch on idle) {
        <app-about />
      } @placeholder {
        <div class="defer-placeholder" aria-hidden="true"></div>
      }

      @defer (hydrate on viewport; hydrate on interaction; prefetch on idle) {
        <app-stack />
      } @placeholder {
        <div class="defer-placeholder" aria-hidden="true"></div>
      }

      @defer (hydrate on viewport; hydrate on interaction; prefetch on idle) {
        <app-services />
      } @placeholder {
        <div class="defer-placeholder" aria-hidden="true"></div>
      }

      @defer (hydrate on viewport; hydrate on interaction; prefetch on idle) {
        <app-projects />
      } @placeholder {
        <div class="defer-placeholder" aria-hidden="true"></div>
      }

      @defer (hydrate on viewport; hydrate on interaction; prefetch on idle) {
        <app-journey />
      } @placeholder {
        <div class="defer-placeholder" aria-hidden="true"></div>
      }

      @defer (hydrate on viewport; hydrate on interaction; prefetch on idle) {
        <app-contact />
      } @placeholder {
        <div class="defer-placeholder" aria-hidden="true"></div>
      }
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; }
    main { display: block; }
    .defer-placeholder { min-height: 320px; }
  `],
})
export class HomeComponent {}
