import React from 'react';
import OriginalDocRootLayoutSidebar from '@theme-original/DocRoot/Layout/Sidebar';
import type { WrapperProps } from '@docusaurus/types';
import type DocRootLayoutSidebarType from '@theme/DocRoot/Layout/Sidebar';

type Props = WrapperProps<typeof DocRootLayoutSidebarType>;

export default function DocRootLayoutSidebarWrapper(props: Props): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      maxHeight: 'none',
      overflow: 'visible',
    }}>
      <OriginalDocRootLayoutSidebar {...props} />
    </div>
  );
}