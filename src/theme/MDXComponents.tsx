import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';

const MDXTable = ({ children, ...props }: any) => (
  <div
    style={{
      margin: '2rem 0',
      borderRadius: 6,
      border: '1px solid var(--surface-border)',
      boxShadow: 'var(--shadow-sm)',
      background: 'var(--surface-raised)',
      overflowX: 'auto',
      overflowY: 'visible',
      WebkitOverflowScrolling: 'touch',
      width: '100%',
    }}
  >
    <table
      style={{
        width: '100%',
        minWidth: '100%',
        borderCollapse: 'collapse',
        margin: 0,
        fontSize: '0.875rem',
        background: 'transparent',
        border: 'none',
        display: 'table',
      }}
      {...props}
    >
      {children}
    </table>
  </div>
);

const MDXBlockquote = ({ children, ...props }: any) => (
  <blockquote
    style={{
      borderLeft: '3px solid var(--brand-primary)',
      margin: '1.75rem 0',
      padding: '0.75rem 1.25rem',
      background: 'var(--surface-overlay)',
      borderRadius: '0 5px 5px 0',
      fontStyle: 'italic',
      color: 'var(--text-secondary)',
    }}
    {...props}
  >
    {children}
  </blockquote>
);

export default {
  ...MDXComponents,
  table: MDXTable,
  blockquote: MDXBlockquote,
};
