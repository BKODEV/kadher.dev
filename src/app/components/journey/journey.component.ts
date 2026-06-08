import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

/**
 * Une entrée de la timeline.
 * @property now - Si true, le point est rempli en accent et l'année
 *   également colorée, pour signaler une mission en cours.
 * @property badge - Petit tag uppercase à côté du nom de l'entreprise
 *   (ex. « En poste », « En cours »).
 */
interface JourneyEntry {
  readonly year: string;
  readonly title: string;
  readonly org: string;
  readonly badge?: string;
  readonly now?: boolean;
  readonly desc: string;
}

/**
 * Section « Parcours » — timeline carrière inversée (du plus récent au
 * plus ancien) reconstruite depuis le CV. Purement présentationnel ;
 * les entrées sont des données readonly, aucun I/O.
 */
@Component({
  selector: 'app-journey',
  imports: [RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
})
export class JourneyComponent {
  readonly entries: readonly JourneyEntry[] = [
    {
      year: 'Juil. 2024 → présent',
      title: "Responsable des Systèmes d'Information",
      org: 'Innov Immobilier — Abidjan',
      badge: 'En poste',
      now: true,
      desc: "Pilotage de la transformation digitale de l'entreprise. ERP interne sur mesure, stack serveur hybride (physique + virtualisée) sous Proxmox, messagerie auto-hébergée, sauvegardes, NextCloud et support de niveau 1.",
    },
    {
      year: '2024 → présent',
      title: 'Étudiant Ingénieur · Intelligence Économique',
      org: 'ECG — Abidjan',
      badge: 'En cours',
      now: true,
      desc: "Aligner les systèmes d'information sur les enjeux stratégiques de l'entreprise — veille concurrentielle, analyse de données et systèmes d'aide à la décision.",
    },
    {
      year: '2022 — 2024',
      title: 'Consultant SI · Formateur (temps partiel)',
      org: 'ICOMVIS — Abidjan',
      desc: "Mission parallèle : gestion de serveurs, configuration de serveurs de messagerie, suivi de projets de digitalisation et conseil en infrastructure pour des PME ivoiriennes. Animation de sessions publiques de formation au développement web (promotions 2022 & 2024).",
    },
    {
      year: 'Oct. 2022 — Juin 2024',
      title: 'Tech Lead · Développeur Full-Stack',
      org: 'Ecinov — Abidjan',
      desc: "Encadrement d'une équipe de développeurs, conception et déploiement d'applications web métier, traduction des besoins clients en solutions Angular / Laravel, optimisation performance et sécurité, devops.",
    },
    {
      year: '2020 — 2022',
      title: 'Responsable Informatique',
      org: "PFGA / Global'ys — Abidjan",
      desc: "Gestion du parc informatique, vidéosurveillance, câblage et configuration du réseau local, relation fournisseurs, hébergement et suivi GPS de véhicules, supervision réseau et formation des employés aux outils métier.",
    },
    {
      year: 'Fév. — Oct. 2019',
      title: 'Informaticien · Webmaster',
      org: 'Markegest — Abidjan',
      desc: "Administration d'un site e-commerce, gestion des données clients-ventes, animation des réseaux sociaux. Première confrontation au terrain : la donnée propre et la rigueur opérationnelle.",
    },
    {
      year: '2018 — 2019',
      title: "Stage de soutenance BTS · Développeur",
      org: "Leader's Entreprise — Abidjan",
      desc: "Développement de sites internet et mise en place d'une application web de gestion pour un pressing.",
    },
    {
      year: '2017 — 2018',
      title: 'Contrôleur Manager Back-Office',
      org: 'MTN CI · CallMe CI — Abidjan',
      desc: "Saisie, vérification et modification des informations abonnés, traitement de requêtes, authentification d'identification et activation des comptes Mobile Money.",
    },
    {
      year: '2016 — 2018',
      title: "BTS · Développeur d'Applications",
      org: 'ESMA — Abidjan',
      desc: "Bases formelles en génie logiciel et premier contact structuré avec le développement d'applications.",
    },
  ];
}
