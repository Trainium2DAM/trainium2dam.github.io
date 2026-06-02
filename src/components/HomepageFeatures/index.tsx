import '@mantine/core/styles.css';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import {
  MantineProvider,
  createTheme,
  Container,
  Card,
  Text,
  Title,
  Button,
  Group,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Box,
  rem,
} from '@mantine/core';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import {
  IconShieldLock,
  IconCalendarEvent,
  IconSalad,
  IconBarbell,
  IconChartLine,
  IconCrown,
  IconArrowRight,
  IconBook2,
} from '@tabler/icons-react';
import styles from './styles.module.css';

const getMantineTheme = (colorScheme: 'light' | 'dark') => createTheme({
  colors: {
    brand: [
      '#E8F2FF',
      '#D0E4FF',
      '#B9D6FF',
      '#9BC6FF',
      '#82B1FF',
      '#64B5F6',
      '#448AFF',
      '#2C6FE0',
      '#1565C0',
      '#0B3D91',
    ] as unknown as [string, string, string, string, string, string, string, string, string, string],
  },
  defaultRadius: 'xs',
  primaryColor: 'brand',
  primaryShade: colorScheme === 'dark' ? 5 : 8,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '700',
  },
  respectReducedMotion: true,
});

const FEATURES = [
  {
    icon: IconShieldLock,
    title: 'Gestión de Usuarios',
    description:
      'Autenticación completa con inicio de sesión, registro y recuperación de contraseña. Datos protegidos con encriptación avanzada.',
  },
  {
    icon: IconCalendarEvent,
    title: 'Reserva de Máquinas',
    description:
      'Reserva en tiempo real. Consulta disponibilidad, evita esperas y optimiza cada sesión de entrenamiento.',
  },
  {
    icon: IconSalad,
    title: 'Planes Nutricionales',
    description:
      'Dietas adaptadas a cada objetivo: pérdida de peso, volumen o mantenimiento. Seguimiento de macros incluido.',
  },
  {
    icon: IconBarbell,
    title: 'Catálogo de Máquinas',
    description:
      'Catálogo completo con instrucciones, grupos musculares trabajados y tutoriales de ejercicio integrados.',
  },
  {
    icon: IconChartLine,
    title: 'Seguimiento Físico',
    description:
      'Registra peso, IMC y medidas. Visualiza el progreso con gráficas y estadísticas detalladas a lo largo del tiempo.',
  },
  {
    icon: IconCrown,
    title: 'Acceso Premium',
    description:
      'Planes personalizados, seguimiento ilimitado y soporte prioritario. Múltiples métodos de pago integrados.',
  },
];

const ROTATING_WORDS = ['Gestiona', 'Controla', 'Entrena', 'Evoluciona'];

const STATS = [
  { value: '+500', label: 'Gimnasios' },
  { value: '+50K', label: 'Usuarios activos' },
  { value: '99%', label: 'Satisfacción' },
];

const LOGOS = [
  { src: '/img/logo1.png', alt: 'IES Las Espeñetas' },
  { src: '/img/logo2.png', alt: 'GVA' },
  { src: '/img/logo3.jpg', alt: 'Ministerio de Educación' },
  { src: '/img/logo4.jpg', alt: 'Fondo Social Europeo' },
];

const FIGMA_DEMO_URL =
  'https://www.figma.com/proto/YQUh2PjGERs5XyI8eptJOg/Sin-t%C3%ADtulo?node-id=2-78&p=f&t=HnjvqdZfC36TMILu-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A78&show-proto-sidebar=1';

function HeroSection() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let cancelled = false;
    let wordInterval: ReturnType<typeof setInterval>;
    let wordIndex = 0;
    let ctx: any;

    (async () => {
      const gsapMod = await import('gsap');
      const gsap = (gsapMod as any).default ?? gsapMod;
      if (cancelled) return;

      ctx = gsap.context(() => {
        const targets = [
          badgeRef.current,
          titleRef.current,
          subtitleRef.current,
          descRef.current,
          buttonsRef.current,
          statsRef.current,
        ].filter(Boolean);

        gsap.set(targets, { opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.98 });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.15,
          onComplete: () => {
             gsap.set(targets, { clearProps: 'transform,filter' });
          }
        });
      }, containerRef);

      wordInterval = setInterval(() => {
        if (cancelled || !wordRef.current) return;
        gsap.to(wordRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.22,
          ease: 'power2.in',
          onComplete: () => {
            if (cancelled || !wordRef.current) return;
            wordIndex = (wordIndex + 1) % ROTATING_WORDS.length;
            wordRef.current.textContent = ROTATING_WORDS[wordIndex];
            gsap.fromTo(
              wordRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
            );
          },
        });
      }, 2400);
    })();

    return () => {
      cancelled = true;
      clearInterval(wordInterval);
      ctx?.revert();
    };
  }, []);

  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(13,71,161,0.12)';
  const dividerColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(13,71,161,0.1)';

  return (
    <Box
      ref={containerRef}
      py={{ base: '4rem', sm: '7rem' }}
      style={{
        background: isDark
          ? 'linear-gradient(160deg, #000000 0%, #050505 55%, #0A0A0A 100%)'
          : 'linear-gradient(160deg, #F0F4FF 0%, #FFFFFF 55%, #E3ECFA 100%)',
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <Container size="md">
        <Stack align="center" gap={0}>
          <Box
            ref={badgeRef}
            bg={isDark ? 'var(--mantine-color-brand-9)' : 'var(--mantine-color-brand-1)'}
            bd={`1px solid ${isDark ? 'var(--mantine-color-brand-6)' : 'var(--mantine-color-brand-3)'}`}
            px="md"
            py={5}
            mb="2.25rem"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              borderRadius: 4,
            }}
          >
            <Box
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: isDark ? 'var(--mantine-color-brand-4)' : 'var(--mantine-color-brand-8)',
                flexShrink: 0,
              }}
            />
            <Text
              size="xs"
              fw={500}
              style={{ letterSpacing: '0.07em', textTransform: 'uppercase' }}
              c={isDark ? 'brand.3' : 'brand.8'}
            >
              Plataforma de gestión deportiva
            </Text>
          </Box>

          <Title
            ref={titleRef}
            order={1}
            mb="1.25rem"
            c={isDark ? 'white' : 'black'}
            style={{
              fontSize: 'clamp(2.2rem, 12vw, 6.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            Trainium
          </Title>

          <Box ref={subtitleRef} mb="1.75rem" ta="center">
            <Text
              component="span"
              c={isDark ? 'dimmed' : 'dimmed'}
              style={{
                fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
                fontWeight: 500,
              }}
            >
              Tu gimnasio,{' '}
            </Text>
            <Text
              component="span"
              ref={wordRef}
              c={isDark ? 'brand.3' : 'brand.8'}
              style={{
                fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
                fontWeight: 700,
                display: 'inline-block',
              }}
            >
              {ROTATING_WORDS[0]}
            </Text>
          </Box>

          <Box ref={descRef} mb="2.5rem" ta="center">
            <Text
              ta="center"
              maw={500}
              c={isDark ? 'dimmed' : 'dimmed'}
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                margin: '0 auto',
              }}
            >
              La plataforma todo en uno para la gestión inteligente de gimnasios.
              Tecnología moderna con un diseño pensado para resultados reales.
            </Text>
          </Box>

          <Group ref={buttonsRef} gap="sm" justify="center" className={styles.btnGroup} style={{ marginBottom: '4.5rem' }}>
            <Button
              component="a"
              href={FIGMA_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              color="brand"
              rightSection={<IconArrowRight size={15} stroke={2.5} />}
              style={{ fontWeight: 600, letterSpacing: '-0.01em' }}
            >
              Solicitar Demo
            </Button>
            <Button
              component={Link as any}
              to="/docs/"
              variant="subtle"
              size="md"
              color={isDark ? 'gray' : 'dark'}
              leftSection={<IconBook2 size={15} stroke={1.75} />}
              style={{
                fontWeight: 500,
                color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(8,8,16,0.55)',
              }}
            >
              Documentación
            </Button>
          </Group>

          <Box
            ref={statsRef}
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              borderRadius: 4,
              border: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
              overflow: 'hidden',
            }}
          >
            {STATS.map((s, i) => (
              <Box
                key={i}
                px={{ base: '1rem', sm: '2.25rem' }}
                py="1.25rem"
                style={{
                  textAlign: 'center',
                  flex: '1 1 0',
                  borderRight: i < STATS.length - 1 ? `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}` : 'none',
                }}
              >
                <Text
                  c={isDark ? 'white' : 'black'}
                  style={{
                    fontSize: 'clamp(1.1rem, 4vw, 1.65rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: 4,
                    display: 'block',
                  }}
                >
                  {s.value}
                </Text>
                <Text
                  size="xs"
                  c={isDark ? 'dimmed' : 'dimmed'}
                  style={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    fontWeight: 500,
                    fontSize: 'clamp(0.6rem, 1.8vw, 0.75rem)',
                  }}
                >
                  {s.label}
                </Text>
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

function FeaturesSection() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    let ctx: any;

    (async () => {
      const gsapMod = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = (gsapMod as any).default ?? gsapMod;
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      ctx = gsap.context(() => {
        const cards = cardsRef.current.filter(Boolean);
        gsap.set(cards, { opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.98 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: 'power3.out',
              onComplete: () => {
                gsap.set(cards, { clearProps: 'transform,filter' });
              }
            });
          },
        });
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <Box
      component="section"
      ref={sectionRef as any}
      bg={isDark ? 'var(--mantine-color-dark-8)' : 'var(--mantine-color-gray-0)'}
      style={{
        borderTop: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
        borderBottom: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
        padding: '3rem 0',
      }}
    >
      <Container size="lg">
        <Stack align="center" gap={rem(10)} mb={rem(52)}>
          <Text
            size="xs"
            fw={600}
            tt="uppercase"
            c={isDark ? 'brand.3' : 'brand.8'}
            style={{ letterSpacing: '0.1em' }}
          >
            Características
          </Text>
          <Title
            order={2}
            ta="center"
            c={isDark ? 'white' : 'black'}
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
          >
            Todo en una sola plataforma
          </Title>
          <Text
            ta="center"
            maw={480}
            c={isDark ? 'dimmed' : 'dimmed'}
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
            }}
          >
            Herramientas diseñadas para simplificar cada aspecto de la gestión
            de tu centro deportivo.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {FEATURES.map((feature, i) => (
            <Card
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el as any;
              }}
              padding={{ base: 'md', sm: 'lg', md: 'xl' }}
              radius="xs"
              bg={isDark ? 'var(--mantine-color-dark-6)' : 'white'}
              bd={`1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`}
              className={styles.featureCard}
            >
              <ThemeIcon size={44} color="brand" variant="light" radius="xs" mb="1rem">
                <feature.icon size={21} stroke={1.75} />
              </ThemeIcon>
              <Text
                fw={600}
                size="sm"
                c={isDark ? 'white' : 'black'}
                mb="0.5rem"
                style={{
                  letterSpacing: '-0.01em',
                }}
              >
                {feature.title}
              </Text>
              <Text
                size="sm"
                lh={1.65}
                c={isDark ? 'dimmed' : 'dimmed'}
              >
                {feature.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

function LogosSection() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const sectionRef = useRef<HTMLElement>(null);
  const logosRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    let ctx: any;

    (async () => {
      const gsapMod = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = (gsapMod as any).default ?? gsapMod;
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      ctx = gsap.context(() => {
        const logos = logosRef.current.filter(Boolean);
        gsap.set(logos, { opacity: 0, filter: 'blur(4px)', scale: 0.95 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(logos, {
              opacity: 0.5,
              filter: 'blur(0px)',
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              onComplete: () => {
                gsap.set(logos, { clearProps: 'filter,opacity,transform' });
              }
            });
          },
        });
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <Box
      component="section"
      ref={sectionRef as any}
      bg={isDark ? 'var(--mantine-color-dark-9)' : 'var(--mantine-color-gray-0)'}
      style={{
        borderBottom: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
        padding: '2.75rem 0',
      }}
    >
      <Container size="lg">
        <Text
          ta="center"
          size="xs"
          fw={500}
          tt="uppercase"
          c={isDark ? 'dimmed' : 'dimmed'}
          mb="1.5rem"
          style={{ letterSpacing: '0.1em' }}
        >
          Respaldado por
        </Text>
        <Group justify="center" align="center" gap="3rem" wrap="wrap">
          {LOGOS.map((logo, i) => (
            <img
              key={i}
              ref={(el) => {
                logosRef.current[i] = el;
              }}
              src={logo.src}
              alt={logo.alt}
              className={styles.logoImg}
              loading="lazy"
            />
          ))}
        </Group>
      </Container>
    </Box>
  );
}

function CallToAction() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let ctx: any;

    (async () => {
      const gsapMod = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = (gsapMod as any).default ?? gsapMod;
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      ctx = gsap.context(() => {
        if (!innerRef.current) return;
        const children = Array.from(innerRef.current.children);
        gsap.set(children, { opacity: 0, y: 24, filter: 'blur(5px)', scale: 0.98 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(children, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
              onComplete: () => {
                gsap.set(children, { clearProps: 'transform,filter' });
              }
            });
          },
        });
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <Box
      component="section"
      ref={sectionRef as any}
      bg={isDark ? '#000000' : '#F0F4FF'}
      py={{ base: '4rem', sm: '5rem' }}
    >
      <Container size="sm">
        <Stack ref={innerRef} align="center" gap="xl">
          <Title
            order={2}
            ta="center"
            c={isDark ? 'white' : 'black'}
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            ¿Listo para transformar tu gimnasio?
          </Title>
          <Text
            ta="center"
            c={isDark ? 'dimmed' : 'dimmed'}
            style={{ fontSize: '1.1rem', maxWidth: 500 }}
          >
            Únete a cientos de centros deportivos que ya confían en Trainium
            para gestionar sus operaciones diarias.
          </Text>
          <Group justify="center" className={styles.btnGroup}>
            <Button
              component="a"
              href={FIGMA_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              color="brand"
              rightSection={<IconArrowRight size={16} stroke={2.5} />}
              style={{ fontWeight: 600 }}
            >
              Solicitar Demo
            </Button>
            <Button
              component={Link as any}
              to="/docs/"
              variant="outline"
              size="lg"
              color={isDark ? 'brand' : 'brand'}
              leftSection={<IconBook2 size={16} stroke={1.75} />}
            >
              Ver Documentación
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}

export default function HomepageFeatures(): ReactNode {
  const { colorMode } = useColorMode();
  const theme = getMantineTheme(colorMode === 'dark' ? 'dark' : 'light');

  return (
    <MantineProvider theme={theme} forceColorScheme={colorMode === 'dark' ? 'dark' : 'light'}>
      <HeroSection />
      <FeaturesSection />
      <LogosSection />
      <CallToAction />
    </MantineProvider>
  );
}