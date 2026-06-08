import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

/** Icônes disponibles pour une carte service — doit correspondre à un
 *  `@case` du `@switch` dans le template. */
type ServiceIcon = 'code' | 'mail' | 'server' | 'compass' | 'link';

interface Service {
  readonly icon: ServiceIcon;
  readonly title: string;
  readonly desc: string;
}

/**
 * Section « Ce que je fais » — 5 cartes d'offres (dev / hébergement /
 * infra on-premise / audit / intégration). Pour ajouter une carte :
 * ajouter une entrée dans `services` et, si besoin, un nouveau `@case`
 * icône dans le template.
 */
@Component({
  selector: 'app-services',
  imports: [RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  readonly services: readonly Service[] = [
    {
      icon: 'code',
      title: 'Développement web & mobile',
      desc: "Sites vitrines, applications web métier, plateformes de réservation ou de gestion. Angular, Laravel, Flutter — du front au back, livré et déployé.",
    },
    {
      icon: 'mail',
      title: 'Hébergement & messagerie',
      desc: "Nom de domaine, hébergement VPS, messagerie professionnelle avec adresses à votre nom de domaine. SPF, DKIM, DMARC configurés d'office. Espace collaboratif auto-hébergé (NextCloud) — partage de fichiers, agenda, contacts partagés — en alternative souveraine à Google Workspace ou Microsoft 365. Migration en douceur depuis Gmail ou cPanel.",
    },
    {
      icon: 'server',
      title: 'Infrastructure on-premise',
      desc: "Mise en place de serveurs physiques auto-hébergés sous Proxmox VE, virtualisation, réseau interne, sauvegarde et supervision. Pour les entreprises qui veulent une infrastructure souveraine et maîtrisée.",
    },
    {
      icon: 'compass',
      title: 'Audit & conseil SI',
      desc: "Audit de l'existant, plan d'internalisation, choix des outils, rédaction des procédures. Pour les entreprises qui veulent reprendre le contrôle de leur système d'information.",
    },
    {
      icon: 'link',
      title: 'Intégration & automatisation',
      desc: "Connexion entre vos outils métier, automatisation des notifications (SMS, WhatsApp), migration de données, scripts sur mesure.",
    },
  ];
}
