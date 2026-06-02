import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useLocation } from '@docusaurus/router';
import OriginalDocItemLayout from '@theme-original/DocItem/Layout';
import MobileDocNav from '../../MobileDocNav';

interface Props {
  children: React.ReactNode;
}

function AnimatedContent({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    let ctx: any;

    const run = async () => {
      if (!contentRef.current) return;

      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }

      const gsapModule = await import('gsap');
      const gsap = gsapModule.default || gsapModule;

      const selectors = [
        '.breadcrumbs',
        'article > h1',
        'article > .markdown > *',
        '.pagination-nav',
        '.doc-card-wrapper',
      ].join(', ');

      const targets = contentRef.current.querySelectorAll(selectors);

      ctx = gsap.context(() => {
        gsap.killTweensOf(Array.from(targets));
        gsap.set(targets, { clearProps: 'all' });
        gsap.fromTo(
          targets,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.03,
            ease: 'power2.out',
            clearProps: 'all',
          }
        );
      }, contentRef);
    };

    const id = setTimeout(run, 50);

    return () => {
      clearTimeout(id);
      if (ctx) ctx.revert();
    };
  }, [location.pathname]);

  return <div ref={contentRef}>{children}</div>;
}

export default function DocItemLayoutWrapper(props: Props): JSX.Element {
  const isMobile = useMediaQuery('(max-width: 996px)');

  return (
    <>
      <AnimatedContent>
        <OriginalDocItemLayout {...props} />
      </AnimatedContent>
      {isMobile && <MobileDocNav />}
    </>
  );
}
