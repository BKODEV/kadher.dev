import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { StackComponent } from '../../components/stack/stack.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { JourneyComponent } from '../../components/journey/journey.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    NavComponent,
    HeroComponent,
    AboutComponent,
    StackComponent,
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
