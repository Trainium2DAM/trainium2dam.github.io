import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Rainium - Tu app de gimasio todo en uno",
  tagline: "Gestiona - Controla - Entrena",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://rainium2dam.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "rainium2dam", // Usually your GitHub org/user name.
  projectName: "rainium2dam.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",
  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Rainium - Docs",
      logo: {
        alt: 'Logo',
        // Logo para modo claro
        src: 'img/logo_default.png',
        // Logo para modo oscuro
        srcDark: 'img/logo_darkmode.png',
      },
      items: [],
    },
    algolia: {
      appId: "ENGTLX40IS",
      apiKey: "e5300ee17a2e9a437afc8930bb67be75",
      indexName: "Documentacion de Rainium",

      // Opcionales
      contextualSearch: true,
      searchParameters: {},
      insights: false,
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Información",
          items: [
            {
              label: "Introducción al proyecto",
              to: "/docs/intro",
            },
            {
              label: "Documentación de Wireframes",
              to: "/docs/tutorial-basics/first",
            },
            {
              label: "Instalación y puesta en marcha",
              to: "/docs/intro",
            },
            {
              label: "FAQ",
              to: "/docs/intro",
            },
          ],
        },
      ],
      copyright: `Copyleft 🄯 ${new Date().getFullYear()} Rainium, no es una marca registrada y es de libre uso.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
