import { useState } from 'react';
import { BookingAndSpotlightSection } from './components/BookingAndSpotlightSection';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { CraftShowcase } from './components/CraftShowcase';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PackagesSection } from './components/PackagesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PackageId } from './data/studioData';

export default function App() {
  const [selectedPackageId, setSelectedPackageId] = useState<PackageId>('premium');

  function handleSelectPackageAndScroll(packageId: PackageId) {
    setSelectedPackageId(packageId);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#1E1E1E]">
      <Header />
      <main>
        <HeroSection onSelectOfferPackage={handleSelectPackageAndScroll} />
        <CraftShowcase />
        <PackagesSection
          selectedPackageId={selectedPackageId}
          onSelectPackage={handleSelectPackageAndScroll}
        />
        <ComparisonMatrix
          selectedPackageId={selectedPackageId}
          onSelectPackage={handleSelectPackageAndScroll}
        />
        <TestimonialsSection />
        <BookingAndSpotlightSection
          selectedPackageId={selectedPackageId}
          onChangePackage={setSelectedPackageId}
        />
      </main>
      <Footer />
    </div>
  );
}
