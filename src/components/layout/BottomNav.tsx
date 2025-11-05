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
  ChevronDown,
} from "lucide-react";
import i18n from "../../i18n";
import "./BottomNav.css";

const BottomNav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navItemsRow1 = [
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
    { id: "contact", icon: Mail, label: t("nav.contact"), href: "#contact" },
  ];

  const navItemsRow2 = [
    {
      id: "services",
      icon: Receipt,
      label: t("nav.services"),
      href: `/${i18n.language}/services-rates`,
      isPage: true,
    },
  ];

  // Update body class when bottom nav expands/collapses
  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.remove("bottomnav-expanded");
    } else {
      document.body.classList.add("bottomnav-expanded");
    }
  }, [isCollapsed]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "technology", "pricing", "process", "contact"];
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
    href: string,
    isPage?: boolean
  ) => {
    e.preventDefault();
    if (isPage) {
      navigate(href);
      setIsCollapsed(true);
    } else {
      // Check if we're on the landing page
      const isOnLandingPage =
        location.pathname === `/${i18n.language}` ||
        location.pathname === `/en` ||
        location.pathname === `/it` ||
        location.pathname === `/ro`;

      if (!isOnLandingPage) {
        // Navigate to landing page with hash, then scroll after navigation
        navigate(`/${i18n.language}${href}`);
        setIsCollapsed(true);
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
          setIsCollapsed(true); // Collapse after clicking
        }
      }
    }
  };

  return (
    <nav className={`bottom-nav ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button
        className="bottom-nav-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Show navigation" : "Hide navigation"}
      >
        <span className="toggle-text">MENU</span>
        <ChevronDown
          size={14}
          className={`toggle-icon ${isCollapsed ? "rotated" : ""}`}
        />
      </button>

      <div className="bottom-nav-container">
        <div className="bottom-nav-row">
          {navItemsRow1.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`bottom-nav-item ${isActive ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-label={item.label}
              >
                <div className="nav-icon-wrapper">
                  <Icon
                    className="nav-icon"
                    size={22}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {isActive && <div className="active-indicator" />}
                </div>
                <span className="nav-label">{item.label}</span>
              </a>
            );
          })}
        </div>
        <div className="bottom-nav-row bottom-nav-row-2">
          {navItemsRow2.map((item) => {
            const Icon = item.icon;
            const isActive = item.isPage
              ? location.pathname.includes("services-rates")
              : false;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`bottom-nav-item ${isActive ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, item.href, item.isPage)}
                aria-label={item.label}
              >
                <div className="nav-icon-wrapper">
                  <Icon
                    className="nav-icon"
                    size={22}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {isActive && <div className="active-indicator" />}
                </div>
                <span className="nav-label">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
