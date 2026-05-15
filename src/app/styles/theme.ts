export const theme = {
  colors: {
    bg: {
      primary: '#0f1117',
      sidebar: '#151820',
      card:    '#1a1f2e',
      hover:   '#1e2535',
    },
    text: {
      primary:   '#e2e8f0',
      secondary: '#8892a4',
      muted:     '#4a5568',
    },
    border: '#2d3748',
    accent: {
      primary: '#e91e8c',
      success: '#00d4aa',
      warning: '#f6c90e',
      danger:  '#ff4757',
      info:    '#4f9cf9',
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    fontSize: {
      xs:   '12px',
      sm:   '14px',
      base: '16px',
      lg:   '20px',
      xl:   '24px',
      '2xl':'32px',
    },
    fontWeight: {
      regular:  400,
      medium:   500,
      semibold: 600,
      bold:     700,
    },
  },
  spacing: {
    1:  '4px',
    2:  '8px',
    3:  '12px',
    4:  '16px',
    6:  '24px',
    8:  '32px',
    12: '48px',
    16: '64px',
  },
  layout: {
    sidebarWidth:   '240px',
    headerHeight:   '64px',
    contentPadding: '24px',
  },
  borderRadius: {
    sm:   '6px',
    md:   '8px',
    lg:   '12px',
    full: '9999px',
  },
} as const

export type Theme = typeof theme
