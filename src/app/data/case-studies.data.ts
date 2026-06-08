/**
 * Données des études de cas — source unique de vérité pour les pages
 * `/projets/:slug` (consommée par {@link CaseStudyComponent}) ET pour
 * la passe de prérendu (`getPrerenderParams` dans `app.routes.server.ts`
 * lit les slugs ici).
 *
 * Pour ajouter une étude de cas : (1) ajouter une entrée ci-dessous ;
 * (2) pointer le projet concerné dans la section « Projets » via le
 * champ `caseStudySlug`. Le build prend en compte la nouvelle route
 * automatiquement.
 */

/** Un point étiqueté dans le bloc optionnel « Ce que la plateforme fait ». */
export interface CaseStudyFeature {
  readonly label: string;
  readonly desc: string;
}

/** Section structurée optionnelle entre « Démarche » et « Résultats ». */
export interface CaseStudyFeatures {
  readonly title: string;
  readonly items: readonly CaseStudyFeature[];
}

/**
 * Une étude de cas. `approach` est rendu un paragraphe par entrée,
 * `results` en liste à puces, `stack` en ligne de chips.
 */
export interface CaseStudy {
  readonly slug: string;
  readonly name: string;
  readonly tag: string;
  readonly year: string;
  readonly context: string;
  readonly role: string;
  readonly approach: readonly string[];
  readonly features?: CaseStudyFeatures;
  readonly results: readonly string[];
  readonly stack: readonly string[];
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: 'africabooking',
    name: 'AfricaBooking',
    tag: 'Plateforme de réservation',
    year: '2023 — présent',
    context:
      "Innov Immobilier, spécialisée en appart-hôtel et rénovation, disposait d'une version incomplète et non documentée de sa plateforme de réservation. Aucune convention de code, aucun cahier des charges, aucune documentation technique. Le système existant ne pouvait pas évoluer ni être maintenu.",
    role:
      "Développeur seul — audit technique, remodélisation complète, développement de la nouvelle version et migration des données de production.",
    approach: [
      "Audit complet des services existants avant toute ligne de code. Nouvelle modélisation des données en partant des vrais processus métier : du moment où un client réserve jusqu'à sa sortie, en passant par les paiements et la gestion du séjour.",
      "Développement from scratch avec Angular côté client et Laravel pour l'API et l'ERP interne.",
      "Scripts de migration personnalisés pour transférer les données de l'ancienne base vers la nouvelle architecture sans aucune perte. Intégration Twilio pour les notifications SMS et WhatsApp automatiques tout au long du parcours client.",
    ],
    features: {
      title: 'Ce que la plateforme fait',
      items: [
        {
          label: 'Côté client',
          desc: "réservation en ligne des appartements du parc Innov Immobilier (100+ biens).",
        },
        {
          label: 'Côté métier',
          desc: 'ERP complet couvrant tout le cycle — réservation, gestion du séjour, paiements, sortie.',
        },
      ],
    },
    results: [
      'Plateforme en production sur africabooking.app',
      '100+ appartements gérés en temps réel',
      'Une seule plateforme couvrant tout le cycle — réservation, paiement, sortie',
      "Migration zéro perte de données depuis l'ancienne version",
      'Notifications SMS/WhatsApp automatiques opérationnelles',
    ],
    stack: ['Angular', 'Laravel', 'MySQL', 'Twilio', 'WhatsApp Business API'],
  },
  {
    slug: 'innov-immobilier',
    name: 'Innov Immobilier — Internalisation IT',
    tag: 'Infrastructure',
    year: '2024 – 2026',
    context:
      "Innov Immobilier, entreprise spécialisée en appart-hôtel et rénovation, dépendait entièrement d'un prestataire externe pour son infrastructure IT et son hébergement mail. Outils dispersés, coûts non maîtrisés, aucune souveraineté sur les données. La direction voulait reprendre le contrôle.",
    role:
      "Responsable des Systèmes d'Information — audit, conception, déploiement et exploitation de toute l'infrastructure.",
    approach: [
      "Audit complet de l'existant puis plan d'internalisation en trois phases : infrastructure serveur (Dell PowerEdge sous Proxmox VE avec 2 VPS Hostinger en complément), migration des 46 boîtes mail hors du prestataire via imapsync avec scripts bash personnalisés pour gérer les contraintes mémoire et le traitement parallèle, puis développement d'un ERP interne Laravel remplaçant quatre outils dispersés.",
      'Zéro interruption de service pendant toute la migration.',
    ],
    results: [
      'Réduction des dépenses IT : -78 %',
      "46 boîtes mail migrées, 0 heure d'arrêt",
      'ERP interne remplaçant 4 outils tiers',
      "Souveraineté totale sur l'infrastructure et les données",
    ],
    stack: [
      'Proxmox VE',
      'Dell PowerEdge',
      'Debian',
      'Postfix',
      'Dovecot',
      'imapsync',
      'NextCloud',
      'Laravel ERP',
    ],
  },
  {
    slug: 'procouture',
    name: 'ProCouture',
    tag: 'Application mobile · SaaS',
    year: '2023 — 2024',
    context:
      "Les couturiers du secteur informel en Côte d'Ivoire géraient leur atelier sans aucun outil numérique — clients, commandes, caisse, fournisseurs tout sur papier ou de mémoire. Impossible de mesurer l'activité, d'accéder au financement bancaire ou de professionnaliser le métier.",
    role:
      "Tech Lead chez Ecinov — encadrement de l'équipe de développement, choix d'architecture, livraison du produit.",
    approach: [
      "Architecture Flutter pour le mobile (iOS + Android) avec un backend Laravel et une interface web d'administration.",
      "L'enjeu principal : concevoir une UX adaptée à des utilisateurs peu familiers du numérique, avec des flux de caisse et de gestion de commandes simples et fiables même en connectivité limitée.",
      "Le projet a été lauréat du 1ᵉʳ prix Yellow Startup MTN 2023, puis présenté à l'étape ivoirienne du Prix Orange de l'Entrepreneur Social en Afrique et Moyen-Orient 2024.",
    ],
    results: [
      "1ᵉʳ prix Yellow Startup MTN 2023",
      "2ᵉ Prix Orange de l'entrepreneur social 2024 (étape Côte d'Ivoire)",
      '500+ téléchargements sur le Play Store',
      'Disponible sur iOS · Android · Web',
      '186 K FCFA de caisse gérée en production',
    ],
    stack: ['Flutter', 'Dart', 'Laravel', 'MySQL', 'REST APIs'],
  },
];

/** Helper de lookup. Retourne `undefined` pour un slug inconnu (la page
 *  gère ce cas par redirection). */
export function findCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/**
 * Retourne l'étude de cas suivant `slug`, en bouclant à la première en
 * fin de liste — alimente le CTA « Projet suivant → » en bas de chaque
 * page. L'appelant doit passer un slug qui existe dans
 * {@link CASE_STUDIES}.
 */
export function nextCaseStudy(slug: string): CaseStudy {
  const idx = CASE_STUDIES.findIndex((c) => c.slug === slug);
  const nextIdx = (idx + 1) % CASE_STUDIES.length;
  return CASE_STUDIES[nextIdx];
}
