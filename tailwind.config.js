/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],

  theme: {
    extend: {
      // ── COLORS ────────────────────────────────────────────────────────────
      colors: {
        // Backgrounds (darkest to lightest, matching Twitch's layering)
        bg: {
          base: '#0e0e10', // root background — near black
          alt: '#18181b', // sidebar, panels
          overlay: '#1f1f23', // cards, hover states
          input: '#2a2a35', // text fields, inputs
          border: '#2a2a35', // subtle borders
        },

        // Twitch purple — primary brand accent
        brand: {
          DEFAULT: '#9147ff',
          light: '#a970ff', // hover
          dark: '#772ce8', // pressed / active
          muted: '#3d2463', // purple-tinted backgrounds (badges, highlights)
          subtle: '#1e1033', // very subtle purple backgrounds
        },

        // Text
        text: {
          primary: '#efeff1', // primary text
          secondary: '#adadb8', // secondary text, metadata
          muted: '#737384', // placeholders, disabled
          link: '#a970ff', // links and mentions
          live: '#ff6905', // LIVE badge
        },

        // Chat panel
        chat: {
          bg: '#18181b',
          input: '#1f1f23',
          border: '#3a3a48',
          hover: '#26262c',
        },

        // Actions and CTAs
        action: {
          follow: '#9147ff', // Follow button
          subscribe: '#9147ff', // Subscribe button
          sub_bg: '#bf94ff', // text inside sub button on light mode
          prime: '#6f5fc4', // Twitch Prime
          bits: '#00c8af', // Bits (teal)
        },

        // System states
        state: {
          live: '#e91916', // red LIVE indicator
          online: '#00b5ad', // channel online
          offline: '#737384', // channel offline
          error: '#e91916',
          success: '#00c8af',
          warning: '#ff6905',
        },

        // Category tags (stream pills)
        tag: {
          bg: '#26262c',
          text: '#adadb8',
          'bg-hover': '#3a3a48',
          'text-hover': '#efeff1',
        },
      },

      // ── TYPOGRAPHY ────────────────────────────────────────────────────────
      fontFamily: {
        sans: [
          'Roobert', // Twitch's own typeface
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }], // 10px
        xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
        sm: ['0.8125rem', { lineHeight: '1.25rem' }], // 13px
        base: ['0.875rem', { lineHeight: '1.25rem' }], // 14px — Twitch base size
        md: ['1rem', { lineHeight: '1.5rem' }], // 16px
        lg: ['1.125rem', { lineHeight: '1.5rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
      },

      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      // ── SPACING ───────────────────────────────────────────────────────────
      // Twitch uses a consistent 4px base scale
      spacing: {
        px: '1px',
        0: '0',
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3: '12px',
        3.5: '14px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
        // Twitch UI fixed dimensions
        sidebar: '240px', // left sidebar expanded width
        'sidebar-sm': '50px', // sidebar collapsed (icons only)
        chat: '340px', // chat panel width
        'chat-sm': '300px', // chat on medium screens
      },

      // ── BREAKPOINTS ───────────────────────────────────────────────────────
      screens: {
        xs: '480px', // mobile landscape
        sm: '640px', // small tablet
        md: '768px', // tablet
        lg: '1024px', // small desktop — sidebar collapses here
        xl: '1280px', // standard desktop
        '2xl': '1536px', // large desktop
        '3xl': '1920px', // full HD / ultrawide
      },

      // ── BORDER RADIUS ─────────────────────────────────────────────────────
      borderRadius: {
        none: '0',
        sm: '0.125rem', // 2px  — small tags, chips
        DEFAULT: '0.25rem', // 4px  — buttons, inputs — Twitch base radius
        md: '0.375rem', // 6px
        lg: '0.5rem', // 8px  — cards, panels
        xl: '0.75rem', // 12px — modals
        '2xl': '1rem', // 16px
        full: '9999px', // pills, avatars
      },

      // ── SHADOWS ───────────────────────────────────────────────────────────
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.4)',
        DEFAULT: '0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.4)',
        md: '0 4px 8px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.4)',
        lg: '0 8px 24px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.4)',
        xl: '0 16px 40px rgba(0,0,0,0.7)',
        // Brand-colored shadows
        brand: '0 0 0 2px #9147ff', // focus ring
        'brand-glow': '0 4px 16px rgba(145,71,255,0.4)', // glow effect
        // Stream card elevation
        card: '0 1px 3px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)',
        none: 'none',
      },

      // ── RING (focus states) ───────────────────────────────────────────────
      ringColor: {
        DEFAULT: '#9147ff',
        brand: '#9147ff',
        white: '#efeff1',
      },

      ringOffsetColor: {
        base: '#0e0e10',
        alt: '#18181b',
      },

      // ── OPACITY ───────────────────────────────────────────────────────────
      opacity: {
        0: '0',
        5: '0.05',
        10: '0.1',
        20: '0.2',
        30: '0.3',
        40: '0.4',
        50: '0.5',
        60: '0.6',
        70: '0.7',
        75: '0.75',
        80: '0.8',
        90: '0.9',
        95: '0.95',
        100: '1',
      },

      // ── TRANSITIONS ───────────────────────────────────────────────────────
      transitionDuration: {
        fast: '100ms',
        base: '150ms',
        slow: '250ms',
        slower: '400ms',
      },

      transitionTimingFunction: {
        DEFAULT: 'ease',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ── Z-INDEX ───────────────────────────────────────────────────────────
      zIndex: {
        auto: 'auto',
        0: '0',
        10: '10', // base elements
        20: '20', // sidebar
        30: '30', // dropdowns, tooltips
        40: '40', // modals
        50: '50', // notifications / toasts
        overlay: '100', // fullscreen overlays
      },

      // ── ASPECT RATIO ──────────────────────────────────────────────────────
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9', // stream player
        portrait: '9 / 16', // vertical clips
        '4/3': '4 / 3',
      },
    },
  },

  plugins: [],
}
