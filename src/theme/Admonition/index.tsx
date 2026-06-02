import React from 'react';

interface Props {
  type: string;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const configs: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  note: {
    label: 'Nota',
    color: '#C8A96E',
    bg: 'rgba(200,169,110,0.07)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  info: {
    label: 'Información',
    color: '#5B9BD5',
    bg: 'rgba(91,155,213,0.07)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  tip: {
    label: 'Sugerencia',
    color: '#7B9E87',
    bg: 'rgba(123,158,135,0.07)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 2C5.239 2 3 4.239 3 7c0 1.657.806 3.13 2.048 4.057C5.385 11.32 5.5 11.636 5.5 12v.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V12c0-.364.115-.68.452-.943C11.194 10.13 12 8.657 12 7c0-2.761-1.791-5-4-5Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M6.5 14h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  warning: {
    label: 'Advertencia',
    color: '#D4A017',
    bg: 'rgba(212,160,23,0.07)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 2L14 13H2L8 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M8 6V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.25" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  caution: {
    label: 'Precaución',
    color: '#D4A017',
    bg: 'rgba(212,160,23,0.07)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 2L14 13H2L8 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M8 6V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.25" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  danger: {
    label: 'Peligro',
    color: '#C0504D',
    bg: 'rgba(192,80,77,0.07)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M5.5 5.5l5 5M10.5 5.5l-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  success: {
    label: 'Éxito',
    color: '#7B9E87',
    bg: 'rgba(123,158,135,0.07)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M5 8.5l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

export default function AdmonitionWrapper({ type, title, icon: customIcon, children }: Props): JSX.Element {
  const key =
    type === 'caution' ? 'caution' : type === 'important' ? 'info' : type;
  const cfg = configs[key] || configs.note;
  const displayTitle = title || cfg.label;

  return (
    <div
      style={{
        margin: '1.75rem 0',
        borderRadius: 6,
        border: `1px solid var(--surface-border)`,
        borderLeft: `3px solid ${cfg.color}`,
        backgroundColor: cfg.bg,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.875rem 1.1rem 0.5rem',
          color: cfg.color,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {customIcon || cfg.icon}
        </span>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            fontFamily: "'Geist', sans-serif",
          }}
        >
          {displayTitle as string}
        </span>
      </div>
      <div
        style={{
          padding: '0.25rem 1.1rem 1rem',
          fontSize: '0.9rem',
          color: 'var(--ifm-color-emphasis-700)',
          lineHeight: 1.75,
        }}
      >
        {children}
      </div>
    </div>
  );
}
