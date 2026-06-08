import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

/** Discriminant qui sélectionne la visualisation SVG inline à afficher. */
export type ProjectVizKey =
  | 'africa-booking'
  | 'innov'
  | 'icomvis'
  | 'procouture'
  | 'kaida';

/** Un chiffre clé d'une carte projet (`n` = nombre, `l` = libellé). */
export interface ProjectStat {
  readonly n: string;
  readonly l: string;
}

/**
 * Un projet mis en avant, rendu sous forme de carte complète.
 *
 * `caseStudySlug` et `externalUrl` sont indépendamment optionnels :
 * renseigner l'un, l'autre ou les deux affiche les boutons CTA
 * correspondants. `caseStudySlug` doit correspondre à une entrée de
 * `case-studies.data.ts`.
 */
export interface Project {
  readonly name: string;
  readonly tag: string;
  readonly year: string;
  readonly desc: string;
  readonly stats: readonly ProjectStat[];
  readonly tech: readonly string[];
  readonly viz: ProjectVizKey;
  readonly caseStudySlug?: string;
  readonly externalUrl?: string;
}

/** Un site secondaire affiché dans la grille compacte « Autres réalisations ». */
export interface OtherSite {
  readonly name: string;
  readonly url: string;
  readonly host: string;
  readonly desc: string;
}

/**
 * Section « Missions & Réalisations » — cartes projets principales
 * suivies d'une grille compacte « Autres réalisations ».
 *
 * Chaque carte affiche l'une des visualisations SVG inline (sélectionnée
 * par `viz`) et jusqu'à deux CTA : un lien interne vers l'étude de cas
 * (`caseStudySlug`) et/ou un lien externe « Voir le projet »
 * (`externalUrl`).
 */
@Component({
  selector: 'app-projects',
  imports: [RouterLink, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  /** Données des 6 lignes de rack serveur dans la visualisation Innov. */
  readonly innovGrid = Array.from({ length: 6 }, (_, i) => i);

  /** Coordonnées précalculées des 46 points de boîtes mail — sorties
   *  du template car ce dernier ne peut pas exécuter `Math.floor`. */
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
      year: '2023 — présent',
      desc:
        "Plateforme de réservation pour le parc d'appart-hôtel d'Innov Immobilier — refonte complète d'une version non documentée, du parcours client à l'ERP métier (réservation, séjour, paiements, sortie), avec notifications SMS et WhatsApp via Twilio.",
      stats: [
        { n: '100+', l: 'appartements gérés' },
        { n: '1', l: 'plateforme bout-en-bout' },
        { n: '0', l: 'perte de données à la migration' },
      ],
      tech: ['Angular', 'Laravel', 'MySQL', 'Twilio', 'WhatsApp Business'],
      viz: 'africa-booking',
      caseStudySlug: 'africabooking',
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
      caseStudySlug: 'innov-immobilier',
    },
    {
      name: 'ProCouture',
      tag: 'Application mobile · SaaS',
      year: '2023 — 2024',
      desc:
        "Solution mobile et web pour les couturiers — souvent du secteur informel — afin qu'ils pilotent leur atelier comme une vraie entreprise : clients, rendez-vous, production, caisse, fournisseurs et boutique en ligne. L'objectif côté métier : rendre l'activité mesurable, pour ouvrir l'accès au financement bancaire. Lauréat du 1ᵉʳ prix Yellow Startup MTN (2023) et du 2ᵉ prix de l'étape ivoirienne du Prix Orange de l'entrepreneur social en Afrique et Moyen-Orient (2024).",
      stats: [
        { n: '500+', l: 'téléchargements Play Store' },
        { n: '🏆 1ᵉʳ', l: 'Yellow Startup MTN 2023' },
        { n: '🏆 2ᵉ', l: 'Prix Orange 2024' },
      ],
      tech: ['Flutter', 'Dart', 'Laravel', 'MySQL', 'REST APIs'],
      viz: 'procouture',
      caseStudySlug: 'procouture',
    },
    {
      name: 'Kaida Events',
      tag: 'Plateforme événementielle',
      year: '2024',
      desc:
        "Plateforme dédiée à la location d'articles événementiels — chaises, mobilier, décor — pour les organisateurs et les particuliers en Côte d'Ivoire. Catalogue en ligne, demande de devis et suivi des réservations, côté client comme côté loueur.",
      stats: [
        { n: 'kaida-events.com', l: 'en production' },
        { n: 'CI', l: 'marché' },
        { n: 'Catalogue + devis', l: 'parcours principal' },
      ],
      tech: ['Angular', 'Laravel', 'MySQL', 'PHP 8'],
      viz: 'kaida',
      externalUrl: 'https://kaida-events.com',
    },
    {
      name: 'ICOMVIS — Hébergement Mail',
      tag: 'Mission · Infrastructure',
      year: "2022 — 2024",
      desc:
        "Mission consultant : mise en place et exploitation d'un service d'hébergement de messagerie pour des PME ivoiriennes — adresses professionnelles, SPF/DKIM/DMARC configurés d'office, webmail en français et migration en douceur depuis Gmail ou cPanel.",
      stats: [
        { n: '12+', l: 'PME hébergées' },
        { n: '42', l: 'comptes actifs' },
        { n: '24/7', l: 'supervision' },
      ],
      tech: ['Postfix', 'Dovecot', 'Rspamd', 'Roundcube', 'Linux'],
      viz: 'icomvis',
      externalUrl: 'https://icomvis.com',
    },
  ];

  readonly otherSites: readonly OtherSite[] = [
    {
      name: 'ICOMVIS',
      url: 'https://icomvis.com',
      host: 'icomvis.com',
      desc: "Site vitrine du cabinet de services IT (hébergement, devops, conseil).",
    },
    {
      name: 'SERTEL',
      url: 'https://sertel.ci',
      host: 'sertel.ci',
      desc: 'Site corporate — présentation des activités et contact.',
    },
    {
      name: 'AGORA Énergie',
      url: 'https://agora-ci.com',
      host: 'agora-ci.com',
      desc: 'Site corporate d\'une société du secteur énergie en Côte d\'Ivoire.',
    },
  ];
}
