import React, { useEffect, useRef, useState } from 'react';
import { MantineProvider, createTheme, useMantineColorScheme } from '@mantine/core';
import { useLocation } from '@docusaurus/router';
import '@mantine/core/styles.css';

const theme = createTheme({
  defaultRadius: 'sm',
  primaryColor: 'yellow',
  primaryShade: { light: 7, dark: 5 },
  fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif",
  fontFamilyMonospace: "'Geist Mono', 'SF Mono', Monaco, monospace",
  headings: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontWeight: '400',
  },
  colors: {
    gold: [
      '#FDF8ED',
      '#F5EDCF',
      '#ECD9A4',
      '#E0C476',
      '#D4B050',
      '#C8A96E',
      '#B8935A',
      '#A07D46',
      '#856535',
      '#6B5028',
    ],
    ink: [
      '#F0EBE1',
      '#DDD8CC',
      '#C4BEAF',
      '#A8A194',
      '#8C8578',
      '#6B655C',
      '#4A4539',
      '#2E2B22',
      '#1A1815',
      '#0F0E0C',
    ],
  },
  respectReducedMotion: true,
  components: {
    Drawer: {
      defaultProps: {
        transitionProps: {
          duration: 240,
          timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
  },
});

interface RootProps {
  children: React.ReactNode;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let ctx: any;

    const animatePage = async () => {
      if (!contentRef.current) return;
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default || gsapModule;

      ctx = gsap.context(() => {
        if (isInitialMount.current) {
          isInitialMount.current = false;
          gsap.to(
            contentRef.current,
            { opacity: 1, duration: 0.55, ease: 'power2.out' }
          );
        } else {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0.7 },
            { opacity: 1, duration: 0.3, ease: 'power1.out' }
          );
        }
      }, contentRef);
    };

    animatePage();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [location.pathname]);

  return <div ref={contentRef} style={!mounted ? { opacity: 0 } : undefined}>{children}</div>;
}

function ThemeSynchronizer() {
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    const html = document.documentElement;

    const syncTheme = () => {
      const currentTheme = html.getAttribute('data-theme');
      if (currentTheme === 'dark' || currentTheme === 'light') {
        setColorScheme(currentTheme);
      }
    };

    syncTheme();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          syncTheme();
        }
      }
    });

    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [setColorScheme]);

  return null;
}

export default function Root({ children }: RootProps): JSX.Element {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" getRootElement={() => document.documentElement}>
      <ThemeSynchronizer />
      <PageTransition>{children}</PageTransition>
    </MantineProvider>
  );
}
