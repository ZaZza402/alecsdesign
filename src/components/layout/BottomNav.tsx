import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Home,
  Code2,
  // Briefcase,
  DollarSign,
  Settings,
  Mail,
  ChevronDown,
} from "lucide-react";
import "./BottomNav.css";

const BottomNav = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("home");
  const [isCollapsed, setIsCollapsed] = useState(true);

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
    { id: "contact", icon: Mail, label: t("nav.contact"), href: "#contact" },
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
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsCollapsed(true); // Collapse after clicking
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
        {navItems.map((item) => {
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
    </nav>
  );
};

export default BottomNav;
