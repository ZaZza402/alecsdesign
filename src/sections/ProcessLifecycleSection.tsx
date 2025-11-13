import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageCircle,
  Lightbulb,
  FileText,
  CheckCircle,
  Rocket,
  Search,
  Palette,
  PenTool,
  Code,
  TestTube,
} from "lucide-react";
import "./ProcessLifecycleSection.css";

gsap.registerPlugin(ScrollTrigger);

const ProcessLifecycleSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const processTimelineRef = useRef<HTMLDivElement>(null);
  const lifecycleTimelineRef = useRef<HTMLDivElement>(null);
  const reactIconRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<SVGPathElement>(null);

  const processSteps = [
    { key: "step1", icon: MessageCircle, color: "blue" },
    { key: "step2", icon: Lightbulb, color: "green" },
    { key: "step3", icon: FileText, color: "purple" },
    { key: "step4", icon: CheckCircle, color: "orange" },
    { key: "step5", icon: Rocket, color: "pink" },
  ];

  const lifecyclePhases = [
    { key: "phase1", icon: Search, color: "blue" },
    { key: "phase2", icon: FileText, color: "indigo" },
    { key: "phase3", icon: Palette, color: "purple" },
    { key: "phase4", icon: PenTool, color: "pink" },
    { key: "phase5", icon: Code, color: "orange" },
    { key: "phase6", icon: TestTube, color: "green" },
    { key: "phase7", icon: Rocket, color: "cyan" },
  ];

  useEffect(() => {
    if (!processTimelineRef.current || !lifecycleTimelineRef.current || !inView)
      return;

    const ctx = gsap.context(() => {
      if (!reactIconRef.current || !trailRef.current || !sectionRef.current)
        return;

      const allItems = [
        ...processTimelineRef.current!.querySelectorAll(".timeline-item"),
        ...lifecycleTimelineRef.current!.querySelectorAll(".timeline-item"),
      ];

      if (allItems.length === 0) return;

      const firstItem = allItems[0] as HTMLElement;
      const lastItem = allItems[allItems.length - 1] as HTMLElement;
      const iconLeftPosition = 40;

      // Build trail path
      const sectionRect = sectionRef.current!.getBoundingClientRect();
      const itemPositions: number[] = [];

      allItems.forEach((item) => {
        const itemEl = item as HTMLElement;
        const itemRect = itemEl.getBoundingClientRect();
        const relativeY =
          itemRect.top - sectionRect.top + itemEl.offsetHeight / 2;
        itemPositions.push(relativeY);
      });

      let pathData = `M ${iconLeftPosition} ${itemPositions[0]}`;
      itemPositions.forEach((y) => {
        pathData += ` L ${iconLeftPosition} ${y}`;
      });

      trailRef.current.setAttribute("d", pathData);
      const pathLength = trailRef.current.getTotalLength();

      gsap.set(trailRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Icon fixed at screen center
      gsap.set(reactIconRef.current, {
        position: "fixed",
        left: iconLeftPosition,
        top: "50vh",
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        zIndex: 1001,
      });

      // Continuous rotation while scrolling through content
      gsap.to(reactIconRef.current, {
        rotation: 720,
        ease: "none",
        scrollTrigger: {
          trigger: firstItem,
          start: "top center",
          endTrigger: lastItem,
          end: "bottom center",
          scrub: 0.5,
        },
      });

      // Trail drawing animation
      gsap.to(trailRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: firstItem,
          start: "top center",
          endTrigger: lastItem,
          end: "bottom center",
          scrub: 0.5,
        },
      });

      // Show/hide based on scroll position
      ScrollTrigger.create({
        trigger: firstItem,
        start: "top center",
        endTrigger: lastItem,
        end: "bottom center",
        onEnter: () => gsap.set(reactIconRef.current, { opacity: 1 }),
        onLeave: () => gsap.set(reactIconRef.current, { opacity: 0 }),
        onEnterBack: () => gsap.set(reactIconRef.current, { opacity: 1 }),
        onLeaveBack: () => gsap.set(reactIconRef.current, { opacity: 0 }),
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [inView]);

  return (
    <>
      {/* Spinning React Icon - Fixed at screen center, outside container */}
      <img
        ref={reactIconRef}
        src="/Stack Icons/React.svg"
        alt="React"
        className="timeline-react-icon"
      />

      <section
        className="process-lifecycle-section"
        ref={(el) => {
          ref(el);
          if (el)
            (sectionRef as React.MutableRefObject<HTMLElement | null>).current =
              el;
        }}
      >
        <div
          className={`process-lifecycle-container ${
            inView ? "animate-in" : ""
          }`}
        >
          {/* SVG Trail - Only visible in this section */}
          <svg className="timeline-trail-svg">
            <defs>
              <linearGradient
                id="trailGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="1" />
                <stop offset="100%" stopColor="#059669" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              ref={trailRef}
              stroke="url(#trailGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="process-lifecycle-header">
            <h2 className="process-lifecycle-title">
              {t("processLifecycle.title")}
            </h2>
            <p className="process-lifecycle-subtitle">
              {t("processLifecycle.subtitle")}
            </p>
          </div>

          {/* Wrapped timeline content - Contact Me to Launch */}
          <div className="timeline-animation-wrapper">
            {/* Process Timeline */}
            <div className="section-divider">
              <h3 className="timeline-section-title">
                {t("processLifecycle.tabs.process")}
              </h3>
            </div>

            <div className="process-timeline" ref={processTimelineRef}>
              {processSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.key} className="timeline-item">
                    <div className="timeline-content">
                      <div className="timeline-title-wrapper">
                        <Icon
                          className={`timeline-title-icon icon-${step.color}`}
                          size={28}
                          strokeWidth={2.5}
                        />
                        <h3 className="timeline-title">
                          {t(`process.${step.key}.title`)}
                        </h3>
                      </div>
                      <p className="timeline-description">
                        {t(`process.${step.key}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Lifecycle Timeline */}
            <div className="section-divider">
              <h3 className="timeline-section-title">
                {t("processLifecycle.tabs.lifecycle")}
              </h3>
            </div>

            <div className="process-timeline" ref={lifecycleTimelineRef}>
              {lifecyclePhases.map((phase) => {
                const Icon = phase.icon;
                return (
                  <div key={phase.key} className="timeline-item">
                    <div className="timeline-content">
                      <div className="timeline-title-wrapper">
                        <Icon
                          className={`timeline-title-icon icon-${phase.color}`}
                          size={28}
                          strokeWidth={2.5}
                        />
                        <h4 className="timeline-title">
                          {t(`developmentLifecycle.${phase.key}.title`)}
                        </h4>
                      </div>
                      <p className="timeline-description">
                        {t(`developmentLifecycle.${phase.key}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcessLifecycleSection;
