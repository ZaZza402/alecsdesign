import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Code2,
  // Briefcase,
  DollarSign,
  Settings,
  Receipt,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import i18n from "../../i18n";
import "./Sidebar.css";

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", icon: Home, label: t("nav.home"), href: "#home" },
    {
      id: "technology",
      icon: Code2,
      label: t("nav.technology"),
      href: "#technology",
    },
    // {
    //   id: "portfolio",
    //   icon: Briefcase,
    //   label: t("nav.portfolio"),
    //   href: "#portfolio",
    // },
    {
      id: "pricing",
      icon: DollarSign,
      label: t("nav.pricing"),
      href: "#pricing",
    },
    {
      id: "process",
      icon: Settings,
      label: t("nav.process"),
      href: "#process",
    },
    {
      id: "services",
      icon: Receipt,
      label: t("nav.services"),
      href: "#services",
    },
    { id: "contact", icon: Mail, label: t("nav.contact"), href: "#contact" },
  ];

  // Sidebar now uses absolute positioning overlay - no body class manipulation needed

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "technology",
        "portfolio",
        "pricing",
        "process",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // Check if we're on the landing page
    const isOnLandingPage =
      location.pathname === `/${i18n.language}` ||
      location.pathname === `/en` ||
      location.pathname === `/it` ||
      location.pathname === `/ro`;

    if (!isOnLandingPage) {
      // Navigate to landing page with hash, then scroll after navigation
      navigate(`/${i18n.language}${href}`);
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // We're on landing page, just scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-container">
        {/* Logo Section */}
        <div className="sidebar-logo">
          <div
            className={`sidebar-logo-wrapper ${isCollapsed ? "collapsed" : ""}`}
          >
            <img
              src="/logo/apple-touch-icon.png"
              alt="alecsdesign"
              className="sidebar-logo-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, item.href)}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="nav-item-icon">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                {!isCollapsed && (
                  <span className="nav-item-label">{item.label}</span>
                )}
                {isActive && <div className="active-indicator" />}
              </a>
            );
          })}
        </nav>

        {/* Language Switcher */}
        {!isCollapsed && (
          <div className="sidebar-language">
            <LanguageSwitcher />
          </div>
        )}
      </div>

      {/* Toggle Button - Outside container, attached to right edge */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
};

export default Sidebar;
