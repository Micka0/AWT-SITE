import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Why from "@/components/Why";
import Signup from "@/components/Signup";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { QuoteProvider } from "@/components/QuoteProvider";
import { company, siteUrl } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: siteUrl,
  slogan: company.tagline,
  description: company.description,
  email: company.email,
  telephone: `+${company.phoneDigits}`,
  address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
};

export default function Home() {
  return (
    <QuoteProvider>
      <Header />
      <Hero />
      <main className="wrap">
        <Stats />
        <Services />
        <Process />
        <Projects />
        <Why />
        <Signup />
      </main>
      <Contact />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </QuoteProvider>
  );
}
