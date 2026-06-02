import React, { useState, useCallback, useEffect } from 'react';
import {
  Drawer,
  Box,
  Text,
  UnstyledButton,
  Group,
  Portal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
        flexShrink: 0,
      }}
    >
      <path
        d="M5 3L9 7L5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5H17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M3 10H17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M3 15H12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function SidebarItem({
  item,
  level = 0,
  onClose,
}: {
  item: any;
  level?: number;
  onClose: () => void;
}) {
  const location = useLocation();
  const isActive =
    item.type === 'link' &&
    (location.pathname === item.href ||
      location.pathname.replace(/\/$/, '') === item.href);

  const hasItems = item.type === 'category' && item.items && item.items.length > 0;
  const [opened, setOpened] = useState(!item.collapsed);

  const toggle = useCallback(() => setOpened((o) => !o), []);

  if (item.type === 'category' && (!item.items || item.items.length === 0)) {
    return null;
  }

  if (hasItems) {
    return (
      <Box mb={2}>
        <UnstyledButton
          onClick={toggle}
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: level === 0 ? '0.55rem 0.75rem' : '0.45rem 0.75rem',
            borderRadius: 5,
            marginBottom: 2,
            fontSize: level === 0 ? '0.7rem' : '0.82rem',
            fontWeight: level === 0 ? 700 : 500,
            color: level === 0 ? 'var(--text-tertiary)' : 'var(--text-secondary)',
            letterSpacing: level === 0 ? '0.08em' : '0.005em',
            textTransform: level === 0 ? 'uppercase' : 'none',
            background: 'transparent',
            transition: 'color 0.15s ease',
            minHeight: '44px',
            cursor: 'pointer',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span>{item.label}</span>
          <ChevronIcon open={opened} />
        </UnstyledButton>
        {opened && (
          <Box
            style={{
              paddingLeft: level === 0 ? 0 : '0.75rem',
              borderLeft: level === 0 ? 'none' : '1px solid var(--surface-border)',
              marginLeft: level === 0 ? 0 : '0.75rem',
              marginBottom: level === 0 ? '0.75rem' : '0.25rem',
            }}
          >
            {item.items.map((sub: any, i: number) => (
              <SidebarItem key={i} item={sub} level={level + 1} onClose={onClose} />
            ))}
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Link
      to={item.href}
      style={{ textDecoration: 'none', display: 'block' }}
      onClick={() => {
        window.scrollTo(0, 0);
        onClose();
      }}
    >
      <Box
        style={{
          padding: '0.475rem 0.75rem',
          borderRadius: 5,
          marginBottom: 2,
          fontSize: '0.855rem',
          fontWeight: isActive ? 550 : 430,
          color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
          background: isActive ? 'rgba(var(--brand-primary-rgb), 0.1)' : 'transparent',
          transition: 'all 0.15s ease',
          lineHeight: 1.45,
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {item.label}
      </Box>
    </Link>
  );
}

export default function MobileDocNav() {
  const [opened, { open, close }] = useDisclosure(false);
  const sidebar = useDocsSidebar();
  const { colorMode, setColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const [drawerSize, setDrawerSize] = useState(300);
  useEffect(() => {
    setDrawerSize(Math.min(320, window.innerWidth * 0.85));
  }, []);

  if (!sidebar || !sidebar.items) return null;

  return (
    <>
      <Portal>
        <Box
          style={{
            position: 'fixed',
            bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px) + 52px + 0.5rem)',
            right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
            zIndex: 9999,
            pointerEvents: 'auto',
          }}
        >
          <UnstyledButton
            onClick={() => setColorMode(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: isDark ? 'rgba(21,20,16,0.55)' : 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: isDark ? '1px solid rgba(200,169,110,0.15)' : '1px solid rgba(139,105,20,0.12)',
              boxShadow: isDark
                ? '0 8px 32px rgba(0,0,0,0.45)'
                : '0 8px 32px rgba(0,0,0,0.08)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              touchAction: 'manipulation',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {isDark ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </UnstyledButton>
        </Box>
        <Box
          style={{
            position: 'fixed',
            bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
            right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
            zIndex: 9999,
            pointerEvents: 'auto',
          }}
        >
          <UnstyledButton
            onClick={open}
            aria-label="Abrir índice de la documentación"
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: isDark ? 'rgba(21,20,16,0.55)' : 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: isDark ? '1px solid rgba(200,169,110,0.15)' : '1px solid rgba(139,105,20,0.12)',
              boxShadow: isDark
                ? '0 8px 32px rgba(0,0,0,0.45)'
                : '0 8px 32px rgba(0,0,0,0.08)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
            }}
          >
            <MenuIcon />
          </UnstyledButton>
        </Box>
      </Portal>

      <Drawer
        opened={opened}
        onClose={close}
        position="left"
        size={drawerSize}
        withCloseButton={true}
        lockScroll={false}
        trapFocus={false}
        zIndex={10000}
        title={
          <Group gap="xs" align="center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: 'var(--brand-primary)', flexShrink: 0 }}
            >
              <rect
                x="2"
                y="2"
                width="6"
                height="14"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M10 5H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M10 9H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M10 13H13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <Text
              fw={400}
              size="lg"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              Contenido
            </Text>
          </Group>
        }
        styles={{
          root: {
            '--drawer-size': `${drawerSize}px`,
          },
          header: {
            backgroundColor: isDark ? '#151410' : '#FFFFFF',
            borderBottom: `1px solid var(--surface-border-subtle)`,
            padding: '1rem 1.25rem',
            minHeight: '3.5rem',
          },
          body: {
            padding: 0,
            backgroundColor: isDark ? '#151410' : '#FFFFFF',
          },
          content: {
            backgroundColor: isDark ? '#151410' : '#FFFFFF',
            boxShadow: isDark
              ? '4px 0 40px rgba(0,0,0,0.7)'
              : '4px 0 40px rgba(0,0,0,0.12)',
          },
          close: {
            color: 'var(--text-tertiary)',
            borderRadius: 4,
            minWidth: '44px',
            minHeight: '44px',
          },
        }}
        overlayProps={{
          color: isDark ? '#000000' : '#0F0E0C',
          backgroundOpacity: isDark ? 0.7 : 0.45,
          blur: 2,
          zIndex: 9999,
        }}
      >
        <Box
          style={{
            height: 'calc(100vh - 3.5rem)',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '1rem',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {sidebar.items.map((item: any, idx: number) => (
            <SidebarItem key={idx} item={item} level={0} onClose={close} />
          ))}
          <Box style={{ height: 'env(safe-area-inset-bottom, 1rem)', minHeight: '1rem' }} />
        </Box>
      </Drawer>
    </>
  );
}
