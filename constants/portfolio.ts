export const LINKS = {
  github: 'https://github.com/Avd-22',
  linkedin: 'https://www.linkedin.com/in/anuvab-das-1b14ab226/',
  email: 'mailto:anuvab2das@gmail.com',
};
export type Project = {
  name: string;
  category: string;
  description: string;
  detail: string;
  tags: string[];
  url?: string;
  style: 'school' | 'chat' | 'chart';
};
export const PROJECTS: Project[] = [
  {
    name: 'Brainstake',
    category: 'EDTECH · MULTI-TENANT PLATFORM',
    description: 'One platform. Every school, connected.',
    detail:
      'Role-based dashboards for teachers, parents, students, and administrators. Built with route-level permissions, complex forms, and resilient API integration.',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'Ant Design'],
    url: 'https://admin.eschools.tech/login',
    style: 'school',
  },
  {
    name: 'ConnectBud',
    category: 'LEARNING · REAL-TIME EXPERIENCES',
    description: 'Bringing learning closer together.',
    detail:
      'A TypeScript migration, custom UI components, guided onboarding, and real-time chat. Firebase notifications keep the community connected.',
    tags: ['TypeScript', 'Material UI', 'WebSockets', 'Firebase'],
    url: 'https://www.connectbud.com/',
    style: 'chat',
  },
  {
    name: 'CloudArmour',
    category: 'SECURITY · DATA VISUALIZATION',
    description: 'Complex data. Clearer decisions.',
    detail:
      'Responsive security dashboards with Highcharts, reusable components, Redux-powered state, and protected admin routes.',
    tags: ['React', 'Highcharts', 'Redux Toolkit', 'Material UI'],
    style: 'chart',
  },
];

export const NAVIGATION = ['experience', 'projects', 'skills', 'contact'].map((id) => ({
  id,
  label: id[0].toUpperCase() + id.slice(1),
}));
export const PROFILE = {
  name: 'Anuvab Das',
  email: 'anuvab2das@gmail.com',
  phone: '+91 8583991458',
  phoneHref: 'tel:+918583991458',
  resume: '/Anuvab_Das_Resume.pdf',
  leetcode: 'https://leetcode.com/u/Anuvab_Das/',
};

export const SKILL_GROUPS = [
  {
    icon: '⌘',
    title: 'Frontend foundations',
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3'],
  },
  {
    icon: '◈',
    title: 'Interfaces & state',
    skills: [
      'Redux Toolkit',
      'Context API',
      'Tailwind CSS',
      'Material UI',
      'Ant Design',
      'Highcharts',
    ],
  },
  {
    icon: '⎇',
    title: 'Systems & workflows',
    skills: ['RESTful APIs', 'WebSockets', 'Firebase', 'Git & GitHub', 'Nx', 'CI/CD'],
  },
  {
    icon: '◎',
    title: 'Quality & security',
    skills: [
      'React Testing Library',
      'Unit Testing',
      'Chrome DevTools',
      'RBAC',
      'OAuth2 / OIDC concepts',
    ],
  },
];

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
};
export const EXPERIENCE: Experience[] = [
  {
    id: 'nextzen',
    role: 'Software Engineer',
    company: 'NextZen Minds Technologies Pvt Ltd.',
    period: 'OCT 2025 — PRESENT',
    current: true,
    description:
      'Building a multi-tenant eSchool platform where each school operates independently, with thoughtful interfaces and reliable foundations.',
    highlights: [
      'Implemented role-based access control across user types.',
      'Improved load performance with lazy loading and code splitting.',
      'Collaborated across product, design, and backend to ship maintainable features.',
    ],
    technologies: ['React', 'TypeScript', 'RBAC', 'Performance'],
  },
  {
    id: 'cbnits',
    role: 'Software Developer',
    company: 'CBNITS India Pvt. Ltd.',
    period: 'DEC 2022 — SEP 2025',
    current: false,
    description:
      'Developed client-facing applications in Agile teams, translating business requirements into responsive, well-structured web experiences.',
    highlights: [
      'Built shared component libraries for consistent, reusable interfaces.',
      'Contributed to frontend architecture, code reviews, and Git standards.',
      'Reduced bundle sizes through modular design and optimized loading.',
    ],
    technologies: ['React', 'TypeScript', 'Component Systems', 'Agile'],
  },
];
