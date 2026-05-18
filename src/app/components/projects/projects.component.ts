import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

export type ProjectVizKey = 'africa-booking' | 'innov' | 'icomvis';

export interface ProjectStat {
  readonly n: string;
  readonly l: string;
}

export interface Project {
  readonly name: string;
  readonly tag: string;
  readonly year: string;
  readonly desc: string;
  readonly stats: readonly ProjectStat[];
  readonly tech: readonly string[];
  readonly viz: ProjectVizKey;
}

@Component({
  selector: 'app-projects',
  imports: [RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly innovGrid = Array.from({ length: 6 }, (_, i) => i);
  readonly mailDots = Array.from({ length: 46 }, (_, i) => ({
    i,
    x: (i % 10) * 12,
    y: Math.floor(i / 10) * 12,
    opacity: 0.4 + (i % 5) * 0.12,
  }));

  readonly projects: readonly Project[] = [
    {
      name: 'AfricaBooking',
      tag: 'Plateforme de réservation',
      year: '2023',
      desc:
        "Plateforme full-stack de réservation de transport inter-villes en Côte d'Ivoire. Sélection de sièges en temps réel, intégration des paiements et confirmations automatisées par SMS et WhatsApp via Twilio.",
      stats: [
        { n: '30+', l: 'agences intégrées' },
        { n: '8s', l: 'temps moyen de réservation' },
        { n: '99%', l: 'livraison SMS' },
      ],
      tech: ['Angular', 'Laravel', 'MySQL', 'Twilio', 'WhatsApp Business'],
      viz: 'africa-booking',
    },
    {
      name: 'Innov Immobilier — Internalisation IT',
      tag: 'Infrastructure',
      year: '2024 – 2026',
      desc:
        "Internalisation complète de l'infrastructure IT d'une entreprise immobilière spécialisée en appart-hôtel et rénovation. De l'audit jusqu'au déploiement en production, zéro interruption — et un ERP interne qui remplace quatre outils dispersés.",
      stats: [
        { n: '46', l: 'boîtes mail migrées' },
        { n: '-78%', l: 'dépenses IT' },
        { n: '0', l: "heure d'arrêt" },
      ],
      tech: ['Proxmox VE', 'Debian', 'Postfix · Dovecot', 'imapsync', 'NextCloud', 'Laravel ERP'],
      viz: 'innov',
    },
    {
      name: 'ICOMVIS — Hébergement Mail',
      tag: 'SaaS / Hébergement',
      year: "2022 – aujourd'hui",
      desc:
        "Service d'hébergement de messagerie pensé pour les PME ivoiriennes qui ont besoin d'adresses professionnelles sans le tarif entreprise. SPF/DKIM/DMARC configurés d'office, webmail en français, et migration en douceur depuis Gmail ou cPanel.",
      stats: [
        { n: '12+', l: 'PME hébergées' },
        { n: '42', l: 'comptes actifs' },
        { n: '24/7', l: 'supervision' },
      ],
      tech: ['Postfix', 'Dovecot', 'Rspamd', 'Roundcube', 'Linux'],
      viz: 'icomvis',
    },
  ];
}
