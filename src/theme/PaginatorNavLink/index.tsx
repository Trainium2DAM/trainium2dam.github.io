import React from 'react';
import Link from '@docusaurus/Link';

interface Props {
  permalink: string;
  title: string;
  subLabel?: React.ReactNode;
  isNext?: boolean;
}

function ArrowLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3L5 8L10 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 3L11 8L6 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PaginatorNavLinkWrapper(props: Props): JSX.Element {
  const { permalink, title, subLabel, isNext } = props;

  return (
    <Link
      to={permalink}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        style={{
          padding: '1.1rem 1.25rem',
          border: '1px solid var(--surface-border)',
          borderRadius: 6,
          backgroundColor: 'var(--surface-raised)',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '0.875rem',
          justifyContent: isNext ? 'flex-end' : 'flex-start',
          height: '100%',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = 'var(--brand-primary)';
          el.style.boxShadow = 'var(--shadow-gold)';
          el.style.transform = 'translateY(-2px)';
          const arrow = el.querySelector('.paginator-arrow') as HTMLElement;
          if (arrow) {
            arrow.style.transform = isNext ? 'translateX(3px)' : 'translateX(-3px)';
            arrow.style.color = 'var(--brand-primary)';
          }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = 'var(--surface-border)';
          el.style.boxShadow = 'var(--shadow-sm)';
          el.style.transform = 'translateY(0)';
          const arrow = el.querySelector('.paginator-arrow') as HTMLElement;
          if (arrow) {
            arrow.style.transform = 'translateX(0)';
            arrow.style.color = 'var(--text-tertiary)';
          }
        }}
      >
        {!isNext && (
          <div
            className="paginator-arrow"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              color: 'var(--text-tertiary)',
              transition: 'transform 0.2s ease, color 0.2s ease',
            }}
          >
            <ArrowLeft />
          </div>
        )}

        <div
          style={{
            flex: 1,
            minWidth: 0,
            textAlign: isNext ? 'right' : 'left',
          }}
        >
          {subLabel && (
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
                color: 'var(--text-tertiary)',
                marginBottom: '0.3rem',
                fontFamily: "'Geist', sans-serif",
              }}
            >
              {subLabel}
            </div>
          )}
          <div
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontWeight: 400,
              fontSize: '1rem',
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.015em',
            }}
          >
            {title}
          </div>
        </div>

        {isNext && (
          <div
            className="paginator-arrow"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              color: 'var(--text-tertiary)',
              transition: 'transform 0.2s ease, color 0.2s ease',
            }}
          >
            <ArrowRight />
          </div>
        )}
      </div>
    </Link>
  );
}
