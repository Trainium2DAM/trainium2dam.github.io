import React from 'react';
import DocSidebarItems from '@theme/DocSidebarItems';
import type { Props } from '@theme/DocSidebar/Desktop';
import styles from './styles.module.css';

function DocSidebarDesktop({ path, sidebar }: Props) {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.sidebarNav} aria-label="Sidebar de documentación">
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </nav>
    </div>
  );
}

export default DocSidebarDesktop;