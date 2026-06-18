import type { BadgeVariant } from '@/shared/components/atoms/Badge'

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface MetalSlide {
  id: string
  name: string
  symbol: string
  price: string
  change: string
  trend: BadgeVariant
  description: string
}

export interface Stat {
  label: string
  value: number
  suffix: string
  prefix?: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
}

/**
 * Íconos como emoji para no depender de una librería de íconos.
 * El proyecto no incluye un set de íconos para UI (solo el sprite social).
 */
export const FEATURES: Feature[] = [
  {
    icon: '⛏️',
    title: 'Gestión de turnos',
    description:
      'Planificá y monitoreá los turnos de cada mina con asignación de personal y seguimiento en vivo.',
  },
  {
    icon: '🚛',
    title: 'Control de equipos',
    description:
      'Inventario de flota y maquinaria con estado operativo, mantenimiento y alertas de disponibilidad.',
  },
  {
    icon: '📈',
    title: 'Precios en tiempo real',
    description:
      'Cotizaciones de oro, cobre y litio actualizadas al minuto para decidir cuándo y cuánto producir.',
  },
  {
    icon: '🏭',
    title: 'Índice de producción',
    description:
      'Seguí el índice de producción minera y comparalo con tu rendimiento real por faena.',
  },
  {
    icon: '📊',
    title: 'Reportes ejecutivos',
    description:
      'Tableros y exportes listos para gerencia: extracción, costos y proyecciones en un clic.',
  },
  {
    icon: '🔔',
    title: 'Alertas inteligentes',
    description:
      'Notificaciones automáticas ante caídas de equipos, desvíos de producción o picos de precio.',
  },
]

export const METAL_SLIDES: MetalSlide[] = [
  {
    id: 'gold',
    name: 'Oro',
    symbol: 'XAU',
    price: '$2.412,80 / oz',
    change: '+1,8%',
    trend: 'success',
    description:
      'El oro sostiene su rol de refugio y marca máximos del trimestre impulsado por la demanda de bancos centrales.',
  },
  {
    id: 'copper',
    name: 'Cobre',
    symbol: 'XCU',
    price: '$4,38 / lb',
    change: '+0,9%',
    trend: 'success',
    description:
      'La electrificación global y la transición energética mantienen la presión de demanda sobre el cobre.',
  },
  {
    id: 'lithium',
    name: 'Litio',
    symbol: 'LIT',
    price: '$13.950 / t',
    change: '-2,3%',
    trend: 'danger',
    description:
      'El litio corrige tras la sobreoferta del año, aunque el pipeline de baterías anticipa una recuperación.',
  },
  {
    id: 'production',
    name: 'Producción minera',
    symbol: 'IPM',
    price: '108,4 pts',
    change: '+0,4%',
    trend: 'info',
    description:
      'El índice de producción minera crece de forma moderada, consolidando la recuperación post-temporada.',
  },
]

export const STATS: Stat[] = [
  { label: 'Toneladas extraídas', value: 1280000, suffix: ' t' },
  { label: 'Equipos monitoreados', value: 340, suffix: '' },
  { label: 'Disponibilidad de flota', value: 98, suffix: '%' },
  { label: 'Minas conectadas', value: 24, suffix: '' },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Carla Mendoza',
    role: 'Gerente de Operaciones',
    company: 'Minera Andes Sur',
    quote:
      'Centralizamos turnos, flota y cotizaciones en un solo lugar. Las decisiones que antes tardaban días ahora se toman en minutos.',
  },
  {
    name: 'Diego Fuentes',
    role: 'Jefe de Mantenimiento',
    company: 'Cerro Verde Holding',
    quote:
      'Las alertas de equipos nos bajaron las paradas no planificadas casi a la mitad. El control de flota es impecable.',
  },
  {
    name: 'Valentina Rojas',
    role: 'Directora Financiera',
    company: 'Grupo Litio Patagonia',
    quote:
      'Ver los precios del litio y el cobre en tiempo real junto a la producción cambió por completo nuestra planificación.',
  },
]

export const FOOTER_LINKS: { title: string; links: string[] }[] = [
  { title: 'Producto', links: ['Características', 'Dashboard', 'Operaciones', 'Equipos'] },
  { title: 'Recursos', links: ['Documentación', 'Guías', 'API', 'Estado del servicio'] },
  { title: 'Empresa', links: ['Sobre nosotros', 'Clientes', 'Contacto', 'Trabajá con nosotros'] },
  { title: 'Legal', links: ['Términos', 'Privacidad', 'Seguridad', 'Cookies'] },
]

export const SOCIAL_ICONS = [
  'github-icon',
  'x-icon',
  'bluesky-icon',
  'discord-icon',
] as const
