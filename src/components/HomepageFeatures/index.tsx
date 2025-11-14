import type {ReactNode} from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Gestión de Usuarios Segura',
    image: '/img/auth-system.png',
    description: (
      <>
        Sistema completo de autenticación con inicio de sesión, registro y recuperación de contraseña. 
        Tus datos están protegidos con encriptación avanzada.
      </>
    ),
  },
  {
    title: 'Reserva de Máquinas',
    image: '/img/machine-booking.png',
    description: (
      <>
        Reserva tu máquina favorita en tiempo real. Consulta disponibilidad, 
        evita colas y optimiza tu tiempo de entrenamiento.
      </>
    ),
  },
  {
    title: 'Dietas Personalizadas',
    image: '/img/diet-plans.png',
    description: (
      <>
        Planes nutricionales adaptados a tus objetivos: pérdida de peso, ganancia muscular 
        o mantenimiento. Incluye recetas y seguimiento de macros.
      </>
    ),
  },
  {
    title: 'Selección de Máquinas',
    image: '/img/machines-catalog.png',
    description: (
      <>
        Catálogo completo de máquinas con instrucciones de uso, grupos musculares 
        trabajados y tutoriales en video integrados.
      </>
    ),
  },
  {
    title: 'Seguimiento Físico',
    image: '/img/progress-tracking.png',
    description: (
      <>
        Registra tu peso, IMC y medidas corporales. Visualiza tu progreso 
        con gráficos detallados y estadísticas evolutivas.
      </>
    ),
  },
  {
    title: 'Suscripción Premium',
    image: '/img/premium-subscription.png',
    description: (
      <>
        Desbloquea funciones avanzadas: planes personalizados, seguimiento ilimitado 
        y soporte prioritario. Múltiples métodos de pago integrados.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img 
          src={image} 
          className={styles.featureImage} 
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

// Componente HeroSection con animación de texto
function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const rotatingTexts = ['Gestiona', 'Controla', 'Entrena', 'Evoluciona'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
        setIsAnimating(true);
      }, 500); // Tiempo de pausa entre animaciones
    }, 2000); // Cambia cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.hero}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className={styles.heroContent}>
              <Heading as="h1" className={styles.heroTitle}>
                <span className={styles.rainiumText}>Rainium</span>
              </Heading>
              
              <div className={styles.animatedTextContainer}>
                <span className={styles.animatedTextStatic}>Tu Gimnasio, </span>
                <span 
                  className={clsx(
                    styles.animatedTextRotating,
                    isAnimating && styles.animatedTextVisible
                  )}
                >
                  {rotatingTexts[currentTextIndex]}
                </span>
              </div>

              <p className={styles.heroSubtitle}>
                La plataforma todo en uno para la gestión inteligente de gimnasios. 
                Combina tecnología avanzada con un diseño intuitivo para revolucionar 
                tu centro deportivo.
              </p>
              
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>+500</div>
                  <div className={styles.statLabel}>Gimnasios</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>+50K</div>
                  <div className={styles.statLabel}>Usuarios</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>99%</div>
                  <div className={styles.statLabel}>Satisfacción</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CallToAction() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className={styles.ctaContent}>
              <Heading as="h2">¿Listo para transformar tu gimnasio?</Heading>
              <p>
                Comienza hoy mismo con Rainium y lleva la gestión 
                de tu centro deportivo al siguiente nivel.
              </p>
              <div className={styles.ctaButtons}>
                <a 
                  href="https://www.figma.com/proto/YQUh2PjGERs5XyI8eptJOg/Sin-t%C3%ADtulo?node-id=2-78&p=f&t=HnjvqdZfC36TMILu-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A78&show-proto-sidebar=1" 
                  className={styles.ctaButtonPrimary}
                  target="_blank" 
                  rel="Figma test"
                >
                  Solicitar Demo
                </a>
                <Link 
                  to="/docs/intro" 
                  className={styles.ctaButtonSecondary}
                >
                  Ver Documentación
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      <HeroSection />
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            <div className="col col--12">
              <div className={styles.sectionHeader}>
                <Heading as="h2">Características Principales</Heading>
                <p>
                  Descubre cómo Rainium puede optimizar cada aspecto 
                  de la gestión de tu gimnasio
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Logos */}
      <section className={styles.logosSection}>
        <div className="container">
          <div className="row">
            <div className="col col--12">
              <div className={styles.logosContainer}>
                <img 
                  src="/img/logo1.png" 
                  alt="IES Las Espeñetas" 
                  className={styles.logoImage}
                  loading="lazy"
                />
                <img 
                  src="/img/logo2.png" 
                  alt="Logo GVA" 
                  className={styles.logoImage}
                  loading="lazy"
                />
                <img 
                  src="/img/logo3.jpg" 
                  alt="Ministerio de Educación" 
                  className={styles.logoImage}
                  loading="lazy"
                />
                <img 
                  src="/img/logo4.jpg" 
                  alt="Fondo Social Europeo" 
                  className={styles.logoImage}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}