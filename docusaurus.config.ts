import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Trainium",
  tagline: "Documentation",
  favicon: "img/favicon.ico",
  url: "https://trainium2dam.github.io",
  baseUrl: "/",
  organizationName: "trainium2dam",
  projectName: "trainium2dam.github.io",
  deploymentBranch: "gh-pages",
  trailingSlash: true,
  onBrokenLinks: "warn",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "ca", "va", "fr", "ary", "eu", "gl", "de", "pt", "ru"],
    localeConfigs: {
      es: { label: "Español" },
      en: { label: "English" },
      ca: { label: "Català" },
      va: { label: "Valencià" },
      fr: { label: "Français" },
      ary: { label: "الدارجة" },
      eu: { label: "Euskara" },
      gl: { label: "Galego" },
      de: { label: "Deutsch" },
      pt: { label: "Português" },
      ru: { label: "Русский" },
    },
  },
  plugins: ["docusaurus-plugin-image-zoom"],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          breadcrumbs: true,
          routeBasePath: '/docs',
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "Trainium",
      logo: {
        alt: "Trainium",
        src: "img/logo_darkmode.png",
        srcDark: "img/logo_default.png",
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/trainium2dam',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    algolia: {
      appId: "ENGTLX40IS",
      apiKey: "e5300ee17a2e9a437afc8930bb67be75",
      indexName: "Trainium Docs",
      contextualSearch: true,
    },
    zoom: {
      selector: ".markdown img",
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Introduction",
              to: "/docs/intro",
            },
            {
              label: "API Reference",
              to: "/docs/api-servicios/firebase",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/trainium2dam",
            },
          ],
        },
      ],
      copyright: `Trainium — Documentación técnica`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['typescript', 'javascript', 'bash', 'json', 'css', 'jsx', 'tsx'],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;