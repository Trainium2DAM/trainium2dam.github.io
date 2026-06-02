import React from 'react';
import Link from '@docusaurus/Link';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import { useDocCardDescriptionCategoryItemsPlural } from '@docusaurus/theme-common/internal';
import isInternalUrl from '@docusaurus/isInternalUrl';

interface PropItem {
  type: 'link' | 'category';
  href: string;
  label: string;
  description?: string;
  docId?: string;
  items?: any[];
}

interface Props {
  item: PropItem;
}

function FolderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 6C2 5.448 2.448 5 3 5H7.586C7.851 5 8.105 5.105 8.293 5.293L9.707 6.707C9.895 6.895 10.149 7 10.414 7H15C15.552 7 16 7.448 16 8V14C16 14.552 15.552 15 15 15H3C2.448 15 2 14.552 2 14V6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 3H11L15 7V15C15 15.552 14.552 16 14 16H4C3.448 16 3 15.552 3 15V4C3 3.448 3.448 3 4 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M11 3V7H15" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6 10H12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 13H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 3H13V7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 3L7 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M6 4H3C2.448 4 2 4.448 2 5V13C2 13.552 2.448 14 3 14H11C11.552 14 12 13.552 12 13V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DocCardWrapper({ item }: Props): JSX.Element | null {
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();
  const doc = useDocById(item.docId ?? undefined);

  let href: string | undefined = item.href;
  let description: string | undefined = item.description;
  let isCategory = false;
  let isExternal = false;

  if (item.type === 'category') {
    href = findFirstSidebarItemLink(item);
    if (!href) return null;
    description =
      item.description ?? categoryItemsPlural(item.items?.length ?? 0);
    isCategory = true;
  } else {
    description = item.description ?? doc?.description;
    isExternal = !isInternalUrl(item.href);
  }

  const iconColor = isCategory
    ? 'var(--brand-accent)'
    : isExternal
    ? 'var(--text-tertiary)'
    : 'var(--brand-primary)';

  const Icon = isCategory ? FolderIcon : isExternal ? ExternalIcon : FileIcon;

  return (
    <Link
      href={href}
      className="doc-card-wrapper"
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
    >
      <div
        style={{
          height: '100%',
          padding: '1.25rem',
          borderRadius: 6,
          border: '1px solid var(--surface-border)',
          backgroundColor: 'var(--surface-raised)',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.625rem',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = 'var(--brand-primary)';
          el.style.boxShadow = 'var(--shadow-gold)';
          el.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = 'var(--surface-border)';
          el.style.boxShadow = 'var(--shadow-sm)';
          el.style.transform = 'translateY(0)';
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 5,
            backgroundColor: 'var(--ifm-color-emphasis-100)',
            color: iconColor,
            flexShrink: 0,
          }}
        >
          <Icon />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontWeight: 400,
              fontSize: '1rem',
              color: 'var(--text-primary)',
              marginBottom: '0.3rem',
              letterSpacing: '-0.015em',
              lineHeight: 1.3,
            }}
          >
            {item.label}
          </div>

          {description && (
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-tertiary)',
                lineHeight: 1.55,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'var(--brand-primary)',
            letterSpacing: '0.01em',
            marginTop: 'auto',
            paddingTop: '0.25rem',
          }}
        >
          <span>{isCategory ? 'Ver categoría' : isExternal ? 'Abrir enlace' : 'Leer más'}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
