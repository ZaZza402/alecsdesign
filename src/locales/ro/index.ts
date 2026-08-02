// Aggregates all Romanian translations into a single lazy-loadable chunk
import hero from "./sections/hero.json";
import howItWorks from "./sections/howItWorks.json";
import portfolio from "./sections/portfolio.json";
import services from "./sections/services.json";
import contact from "./sections/contact.json";
import comparison from "./sections/comparison.json";
import stats from "./sections/stats.json";
import notFound from "./pages/notFound.json";
import legal from "./pages/legal.json";
import portfolioPage from "./pages/portfolioPage.json";
import about from "./pages/about.json";
import faq from "./pages/faq.json";
import guideUi from "./pages/guideUi.json";
import nav from "./components/nav.json";
import footer from "./components/footer.json";
import cookies from "./components/cookies.json";
import common from "./components/common.json";
import seo from "./components/seo.json";
import floatingContact from "./floatingContact.json";
import guidesWebsiteCost from "./pages/guides/websiteCost.json";
import guidesGoogle from "./pages/guides/google.json";
import guidesWebsiteNeeds from "./pages/guides/websiteNeeds.json";

const translation = {
  hero,
  howItWorks,
  portfolio,
  services,
  contact,
  comparison,
  stats,
  notFound,
  legal,
  portfolioPage,
  about,
  faq,
  nav,
  footer,
  cookies,
  common,
  seo,
  ...floatingContact,
  guides: {
    websiteCost: guidesWebsiteCost,
    google: guidesGoogle,
    websiteNeeds: guidesWebsiteNeeds,
  },
  guideUi,
};

export default translation;
