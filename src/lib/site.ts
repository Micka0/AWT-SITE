import type { IconName } from "./icons";

/* ------------------------------------------------------------------
   Tout le contenu du site est ici : modifiez ce fichier, pas les composants.
------------------------------------------------------------------- */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const googleFormUrl =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ?? "https://forms.gle/VOTRE-LIEN-GOOGLE-FORM";

export const company = {
  name: "Africa Wave Technology",
  tagline: "Surfez sur l’innovation.",
  description:
    "Africa Wave Technology conçoit, déploie et sécurise les solutions numériques des organisations africaines : transformation digitale, data & IA, cloud, cybersécurité, Fintech et GouvTech.",
  group: "e NCC Group",
  email: "africawavetech7@gmail.com",
  phone: "+225 077 878 25 68",
  /** Numéro au format international sans « + » ni espaces (lien WhatsApp et tel:) */
  phoneDigits: "2250778782568",
  address: "Abidjan, Côte d’Ivoire",
};

export const nav = [
  { id: "services", label: "Services" },
  { id: "methode", label: "Méthode" },
  { id: "realisations", label: "Réalisations" },
  { id: "pourquoi", label: "Pourquoi AWT" },
  { id: "inscription", label: "Inscription" },
  { id: "contact", label: "Contact" },
] as const;

export const stats = [
  { value: 30, suffix: "+", label: "Projets livrés" },
  { value: 15, suffix: "+", label: "Projets en cours" },
  { value: 7, suffix: "", label: "Pôles d’expertise" },
  { value: 24, suffix: " h", label: "Délai de réponse" },
];

/* Taux fixe de la parité CFA/euro : 1 € = 655,957 FCFA */
export const FCFA_PER_EUR = 655.957;

export type Service = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  icon: IconName;
  /** Prix « à partir de » en FCFA. Absent = sur devis. */
  from?: number;
  soon?: boolean;
  /** Carte « cibles prioritaires » */
  sector?: {
    priorities: { name: string; desc: string }[];
    others: string;
  };
};

export const services: Service[] = [
  {
    id: "transformation-digitale",
    title: "Transformation digitale",
    description: "ERP, CRM et applications sur mesure pour digitaliser vos processus de bout en bout.",
    bullets: ["Applications web et mobiles", "ERP / CRM sur mesure", "Automatisation des tâches"],
    icon: "digital",
    from: 2_500_000,
  },
  {
    id: "cybersecurite",
    title: "Cybersécurité",
    description: "Protection de vos systèmes et de vos données, avec une sécurité pensée dès la conception.",
    bullets: ["Audit de sécurité", "Surveillance et réponse aux incidents"],
    icon: "shield",
    soon: true,
  },
  {
    id: "data-ia",
    title: "Data & IA",
    description: "Vos données deviennent un avantage concret : tableaux de bord, prédiction, assistants intelligents.",
    bullets: ["Tableaux de bord décisionnels", "Modèles d’IA appliqués à votre métier"],
    icon: "chart",
    from: 1_800_000,
  },
  {
    id: "cloud",
    title: "Cloud & infrastructure",
    description: "Hébergement, migration et exploitation fiables, dimensionnés pour grandir avec votre activité.",
    bullets: ["Migration et hébergement cloud", "Supervision et maintenance"],
    icon: "cloud",
    from: 750_000,
  },
  {
    id: "recherche",
    title: "Recherche & innovation",
    description:
      "Prototypage et développement de technologies nouvelles, avec des partenaires académiques et industriels.",
    bullets: ["Preuves de concept", "Veille technologique"],
    icon: "flask",
  },
  {
    id: "consulting",
    title: "Consulting & formation",
    description:
      "Conseil stratégique et montée en compétences de vos équipes pour s’approprier durablement le numérique.",
    bullets: [
      "Conseil et feuille de route digitale",
      "Formations sur mesure en entreprise",
      "Accompagnement au changement",
    ],
    icon: "cap",
    from: 500_000,
  },
  {
    id: "sectoriel",
    title: "Solutions sectorielles",
    description:
      "Fintech et GouvTech en priorité, puis santé, agriculture et éducation : des plateformes adaptées aux réalités du marché africain.",
    icon: "globe",
    from: 2_000_000,
    sector: {
      priorities: [
        { name: "Fintech", desc: "paiement mobile, inclusion financière, sécurité des transactions" },
        { name: "GouvTech", desc: "services publics numériques, e-administration, identité numérique" },
      ],
      others: "HealthTech, AgriTech et EdTech",
    },
  },
];

export const steps = [
  { title: "Audit et diagnostic", text: "Analyse de vos besoins, de votre existant technique et de vos objectifs." },
  { title: "Conception", text: "Architecture, maquettes et plan de déploiement validés avec vos équipes." },
  { title: "Développement", text: "Sprints courts, revues régulières, qualité et sécurité intégrées au code." },
  { title: "Livraison et support", text: "Déploiement, formation des équipes et accompagnement après le lancement." },
];

export type Project = {
  id: "web" | "app" | "flow";
  category: string;
  title: string;
  text: string;
  alt: string;
};

export const projects: Project[] = [
  {
    id: "web",
    category: "Développement web",
    title: "Site vitrine d’un client",
    text: "Présence digitale moderne, pensée pour générer des demandes de contact qualifiées.",
    alt: "Aperçu d’un site web vitrine moderne",
  },
  {
    id: "app",
    category: "Application & plateforme",
    title: "Plateforme métier sur mesure",
    text: "Application web et mobile développée avec un partenaire stratégique.",
    alt: "Aperçu d’un tableau de bord et de son application mobile",
  },
  {
    id: "flow",
    category: "Automatisation",
    title: "Workflow automatisé",
    text: "Rappels et suivi administratif automatisés pour alléger la charge des équipes.",
    alt: "Schéma d’un workflow automatisé : déclencheur, traitement, validation",
  },
];

export const why = [
  {
    title: "Expertise stratégique",
    text: "Nous concevons des stratégies numériques alignées avec vos objectifs, avant d’écrire la première ligne de code.",
  },
  {
    title: "Excellence technique",
    text: "Ingénieurs expérimentés, code propre, architecture robuste et livraison dans les délais.",
  },
  {
    title: "Sécurité native",
    text: "Chaque solution intègre la sécurité dès sa conception, pas après un incident.",
  },
  {
    title: "Accompagnement long terme",
    text: "Support, évolutions, formation et maintenance : nous restons votre partenaire après la livraison.",
  },
  {
    title: "Innovation utile",
    text: "Chaque solution vise un gain mesurable : productivité, coûts réduits, nouveaux revenus.",
  },
  {
    title: "Pensé pour grandir",
    text: "Ce qui sert 100 utilisateurs aujourd’hui doit pouvoir en servir un million demain sans refonte.",
  },
];

export const footerServices = [
  "Transformation digitale",
  "Cybersécurité",
  "Data & IA",
  "Cloud & infrastructure",
  "Consulting & formation",
];
