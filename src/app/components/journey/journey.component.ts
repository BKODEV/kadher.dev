import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface JourneyEntry {
  readonly year: string;
  readonly title: string;
  readonly org: string;
  readonly badge?: string;
  readonly now?: boolean;
  readonly desc: string;
}

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
      year: '2024 → présent',
      title: "Responsable des Systèmes d'Information",
      org: 'Innov Immobilier',
      badge: 'En poste',
      now: true,
      desc: "Pilotage de la transformation digitale d'un groupe immobilier. Conception d'un ERP interne, gestion d'une stack serveur hybride (physique + virtualisée) sous Proxmox, serveur mail interne, et IT au quotidien.",
    },
    {
      year: '2024 → présent',
      title: 'Étudiant Ingénieur · Intelligence Économique',
      org: 'ECG Abidjan',
      badge: 'En cours',
      now: true,
      desc: "Faire le lien entre exécution technique et stratégie d'entreprise — veille concurrentielle, analyse de données, et systèmes d'aide à la décision.",
    },
    {
      year: '2022 → présent',
      title: 'Fondateur · Consultant IT · Formateur',
      org: 'ICOMVIS SARL',
      badge: 'Fondateur',
      desc: "Création d'un cabinet au service des PME ivoiriennes : hébergement de messagerie, devops, vidéosurveillance et digitalisation. Animation de sessions publiques de formation en développement web (promotions 2022 et 2024).",
    },
    {
      year: '2022 — 2024',
      title: 'Tech Lead · Développeur Full-Stack',
      org: 'Ecinov',
      desc: "Encadrement d'une équipe de développeurs. Traduction des besoins clients en solutions Angular / Laravel, gestion du pipeline de déploiement, et relèvement des standards performance et sécurité.",
    },
    {
      year: '2020 — 2022',
      title: 'Responsable Informatique',
      org: "PFGA / Global'ys",
      desc: "Gestion du parc informatique, vidéosurveillance, configuration du réseau et relation prestataires. Formation des employés aux outils et conception de tableaux de bord opérationnels.",
    },
    {
      year: '2018 — 2019',
      title: 'Webmaster · Contrôleur Back-Office',
      org: 'Markegest · MTN CI',
      desc: "Premières expériences dans l'administration e-commerce et le back-office télécom. C'est là que se sont forgés le sens de la donnée propre et la rigueur opérationnelle.",
    },
    {
      year: '2016 — 2018',
      title: "BTS · Développeur d'Applications",
      org: 'ESMA Abidjan',
      desc: "Bases formelles en génie logiciel — mais le vrai apprentissage s'est fait en autodidacte, week-ends compris, à debug Laravel jusque tard dans la nuit.",
    },
  ];
}
