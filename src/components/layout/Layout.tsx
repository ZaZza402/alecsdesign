import Sidebar from "./Sidebar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import MetallicBackground from "../ui/backgrounds/MetallicBackground";
import CookieBanner from "../ui/CookieBanner";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Global metallic background */}
      <MetallicBackground />

      <Sidebar />
      <BottomNav />

      {/* Main content */}
      <main className="relative">{children}</main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
