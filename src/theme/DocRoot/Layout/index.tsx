import React from 'react';
import OriginalDocRootLayout from '@theme-original/DocRoot/Layout';

interface Props {
  children: React.ReactNode;
}

export default function DocRootLayoutWrapper(props: Props): JSX.Element {
  return <OriginalDocRootLayout {...props} />;
}
