import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { X, ChevronRight } from "lucide-react";
import {
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import "./PortfolioSection.css";

Modal.setAppElement("#root");

interface Project {
  id: string;
  url: string;
  image: string;
  title: string;
  description: string;
  canPreview: boolean;
}

const GAP = 20;
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };
const VELOCITY_THRESHOLD = 500;

// â”€â”€ Carousel Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface CardProps {
  project: Project;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  centerOffset: number;
  x: ReturnType<typeof useMotionValue<number>>;
  transition: object;
  onOpen: (p: Project, e: React.MouseEvent) => void;
  visitLabel: string;
}

function ProjectCard({
  project,
  index,
  itemWidth,
  trackItemOffset,
  centerOffset,
  x,
  transition,
  onOpen,
  visitLabel,
}: CardProps) {
  const range = [
    -(index + 1) * trackItemOffset + centerOffset,
    -index * trackItemOffset + centerOffset,
    -(index - 1) * trackItemOffset + centerOffset,
  ];
  const rotateY = useTransform(x, range, [5, 0, -5], { clamp: false });

  return (
    <motion.div
      className="pf-card"
      style={{ width: itemWidth, rotateY }}
      transition={transition}
    >
      <div className="pf-card__image-wrap">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="pf-card__image"
          draggable={false}
        />
      </div>
      <div className="pf-card__body">
        <h3 className="pf-card__title">{project.title}</h3>
        <p className="pf-card__desc">{project.description}</p>
        <a
          href={project.url}
          target={project.canPreview ? "_self" : "_blank"}
          rel={project.canPreview ? "" : "noopener noreferrer"}
          onClick={(e) => onOpen(project, e)}
          className="pf-card__cta"
          draggable={false}
        >
          {visitLabel} <ChevronRight size={15} />
        </a>
      </div>
    </motion.div>
  );
}

// â”€â”€ Portfolio Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PortfolioSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const projects: Project[] = [
    {
      id: "immigration-agency",
      url: "https://www.puntomigrare.it",
      image: "/portfolio-assets/website-puntomigrare-mockup.webp",
      title: "Punto Migrare",
      description: t("portfolio.projects.immigration-agency.description"),
      canPreview: true,
    },
    {
      id: "psychologist",
      url: "https://www.popescumaria.ro",
      image: "/portfolio-assets/website-psiholog-mockup.webp",
      title: "Psiholog Portfolio",
      description: t("portfolio.projects.psychologist.description"),
      canPreview: false,
    },
    {
      id: "sartoria",
      url: "https://sartoria-viorel.vercel.app",
      image: "/portfolio-assets/website-sartoria-mockup.webp",
      title: "Sartoria Vio",
      description: t("portfolio.projects.sartoria.description"),
      canPreview: true,
    },
    {
      id: "restaurant",
      url: "https://ristorante13.alecsdesign.xyz",
      image: "/portfolio-assets/website-restaurant-mockup.webp",
      title: "Ristorante 13",
      description: t("portfolio.projects.restaurant.description"),
      canPreview: true,
    },
  ];

  // â”€â”€ Responsive sizing â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setContainerWidth(e.contentRect.width),
    );
    ro.observe(el);
    setContainerWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const itemWidth =
    containerWidth > 0
      ? containerWidth < 640
        ? containerWidth - 48
        : Math.min(Math.round(containerWidth * 0.72), 680)
      : 300;

  const centerOffset = Math.max(0, (containerWidth - itemWidth) / 2);
  const trackItemOffset = itemWidth + GAP;

  // â”€â”€ Loop clone list â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const itemsForRender = useMemo(
    () => [projects[projects.length - 1], ...projects, projects[0]],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects.length, i18n.language],
  );

  const [position, setPosition] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const x = useMotionValue(-trackItemOffset + centerOffset);

  // Sync x when dimensions change (resize / first paint)
  useEffect(() => {
    if (!isAnimating) {
      x.set(-position * trackItemOffset + centerOffset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackItemOffset, centerOffset]);

  // Autoplay (pause on hover)
  useEffect(() => {
    if (isHovered || itemsForRender.length <= 1) return;
    const id = setInterval(
      () => setPosition((p) => Math.min(p + 1, itemsForRender.length - 1)),
      3500,
    );
    return () => clearInterval(id);
  }, [isHovered, itemsForRender.length]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING;

  const handleAnimationComplete = () => {
    const last = itemsForRender.length - 1;
    if (position === last) {
      setIsJumping(true);
      setPosition(1);
      x.set(-1 * trackItemOffset + centerOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }
    if (position === 0) {
      setIsJumping(true);
      setPosition(projects.length);
      x.set(-projects.length * trackItemOffset + centerOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }
    setIsAnimating(false);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dir =
      info.offset.x < 0 || info.velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : info.offset.x > 0 || info.velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;
    if (dir === 0) return;
    setPosition((p) =>
      Math.max(0, Math.min(p + dir, itemsForRender.length - 1)),
    );
  };

  const activeIndex = (position - 1 + projects.length) % projects.length;

  // â”€â”€ Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const openPreview = (project: Project, e: React.MouseEvent) => {
    if (!project.canPreview) return;
    e.preventDefault();
    setCurrentUrl(project.url);
    setModalIsOpen(true);
    setIsLoading(true);
    document.body.style.overflow = "hidden";
  };

  const closePreview = () => {
    setModalIsOpen(false);
    setCurrentUrl("");
    document.body.style.overflow = "unset";
  };

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="portfolio-section__inner">
        {/* Header */}
        <div className="portfolio-section__header">
          <h2 className="portfolio-section__title" id="portfolio-heading">
            {t("portfolio.title")}
          </h2>
          <p className="portfolio-section__subtitle">
            {t("portfolio.subtitle")}
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="pf-carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="pf-carousel__track"
            drag={isAnimating ? false : "x"}
            dragConstraints={{
              left:
                -(trackItemOffset * (itemsForRender.length - 1)) + centerOffset,
              right: centerOffset,
            }}
            style={{
              gap: `${GAP}px`,
              perspective: 1200,
              perspectiveOrigin: `${containerWidth / 2}px 50%`,
              x,
            }}
            animate={{ x: -(position * trackItemOffset) + centerOffset }}
            transition={effectiveTransition}
            onDragEnd={handleDragEnd}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={handleAnimationComplete}
          >
            {itemsForRender.map((project, index) => (
              <ProjectCard
                key={`${project.id}-${index}`}
                project={project}
                index={index}
                itemWidth={itemWidth}
                trackItemOffset={trackItemOffset}
                centerOffset={centerOffset}
                x={x}
                transition={effectiveTransition}
                onOpen={openPreview}
                visitLabel={t("portfolio.visitWebsite")}
              />
            ))}
          </motion.div>

          {/* Dot indicators */}
          <div className="pf-carousel__dots">
            {projects.map((_, i) => (
              <motion.button
                key={i}
                className={`pf-dot${activeIndex === i ? " pf-dot--active" : ""}`}
                animate={{ scale: activeIndex === i ? 1.3 : 1 }}
                transition={{ duration: 0.15 }}
                onClick={() => setPosition(i + 1)}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="portfolio-footer">
          <button
            onClick={() =>
              navigate(
                i18n.language === "en"
                  ? "/portfolio"
                  : `/${i18n.language}/portfolio`,
              )
            }
            className="view-all-btn"
          >
            {t("portfolio.viewAllProjects")}
          </button>
        </div>
      </div>

      {/* Modal Preview */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closePreview}
        contentLabel="Website Preview"
        className="preview-modal"
        overlayClassName="preview-overlay"
        closeTimeoutMS={300}
      >
        <div className="browser-frame">
          <div className="browser-header">
            <div className="browser-title">
              {projects.find((p) => p.url === currentUrl)?.title ?? "Preview"}
            </div>
            <div className="browser-actions">
              <button
                onClick={closePreview}
                className="close-preview"
                title="Close preview"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="browser-content">
            {isLoading && (
              <div className="preview-loader">
                <div className="spinner" />
                <p>Loading preview...</p>
              </div>
            )}
            {currentUrl && (
              <iframe
                src={currentUrl}
                title="Website Preview"
                className="preview-iframe"
                onLoad={() => setIsLoading(false)}
              />
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default PortfolioSection;
