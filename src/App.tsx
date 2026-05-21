import { useState } from 'react';
import { Section } from '@/data';
import { Navbar, Footer } from '@/components/layout';
import {
  HomePage,
  MatchesPage,
  TournamentsPage,
  StandingsPage,
  TeamsPage,
  PlayersPage,
  StreamsPage,
  NewsPage,
  AboutPage,
  ContactPage,
} from '@/components/pages';

export default function App() {
  const [section, setSection] = useState<Section>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderSection = () => {
    switch (section) {
      case 'home': return <HomePage onNav={setSection} />;
      case 'matches': return <MatchesPage />;
      case 'tournaments': return <TournamentsPage />;
      case 'standings': return <StandingsPage />;
      case 'teams': return <TeamsPage />;
      case 'players': return <PlayersPage />;
      case 'streams': return <StreamsPage />;
      case 'news': return <NewsPage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
    }
  };

  return (
    <div className="min-h-screen grid-lines">
      <Navbar active={section} onNav={s => { setSection(s); setMobileOpen(false); }} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="animate-fade-in">
          {renderSection()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
