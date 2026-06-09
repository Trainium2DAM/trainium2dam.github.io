import React from 'react';
import { useLocation } from '@docusaurus/router';
import { useThemeConfig } from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';

const LOGOS = [
  { src: '/img/logo1.webp', alt: 'IES Las Espeñetas', href: 'https://portal.edu.gva.es/03011070/' },
  { src: '/img/logo2.webp', alt: 'GVA', href: 'https://ceice.gva.es/es/' },
  { src: '/img/logo3.webp', alt: 'Ministerio de Educación', href: 'https://www.educacionfpydeportes.gob.es/portada.html' },
  { src: '/img/logo4.webp', alt: 'Fondo Social Europeo', href: 'https://ceice.gva.es/es/web/fse' },
];

function FooterLogos() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2.5rem',
        flexWrap: 'wrap',
        padding: '1.5rem 0 0',
      }}
    >
      {LOGOS.map((logo, i) => (
        <a
          key={i}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            textDecoration: 'none',
            opacity: 0.65,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.65'; }}
        >
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            style={{
              height: 40,
              width: 'auto',
              maxWidth: 130,
              objectFit: 'contain',
            }}
          />
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  const { footer } = useThemeConfig();
  const { pathname } = useLocation();
  if (!footer) return null;

  const { copyright, links, logo, style } = footer;
  const isDocPage = pathname.startsWith('/docs/') || /^\/[a-z]{2,3}(-[a-z]+)?\/docs\//.test(pathname);

  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', {
        'footer--dark': style === 'dark',
      })}
    >
      <div className="container container-fluid">
        {links && links.length > 0 && <FooterLinks links={links} />}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm"><FooterLogo logo={logo} /></div>}
            {copyright && <FooterCopyright copyright={copyright} />}
          </div>
        )}
        {isDocPage && <FooterLogos />}
      </div>
    </footer>
  );
}