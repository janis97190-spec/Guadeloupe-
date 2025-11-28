import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VillaCard } from './components/VillaCard';
import { VillaDetails } from './components/VillaDetails';
import { AIConcierge } from './components/AIConcierge';
import { Villa } from './types';
import { Utensils, Waves, Sun, Ship } from 'lucide-react';

// Mock Data
const MOCK_VILLAS: Villa[] = [
  {
    id: '1',
    name: 'Villa Colibri',
    location: 'Saint-François, Grande-Terre',
    price: 350,
    rating: 4.9,
    reviews: 42,
    bedrooms: 3,
    guests: 6,
    image: 'https://picsum.photos/seed/villa1/800/600',
    description: "Nichée sur les hauteurs de Saint-François, la Villa Colibri offre une vue imprenable sur le lagon. Cette propriété moderne dispose d'une piscine à débordement et d'un accès rapide au golf international. Idéale pour les familles cherchant calme et luxe.",
    amenities: ['Wifi', 'Climatisation', 'Piscine', 'Parking', 'TV', 'Cuisine équipée'],
    coordinates: { lat: 16.25, lng: -61.27 }
  },
  {
    id: '2',
    name: 'Domaine du Lagon',
    location: 'Sainte-Anne, Grande-Terre',
    price: 520,
    rating: 5.0,
    reviews: 18,
    bedrooms: 5,
    guests: 10,
    image: 'https://picsum.photos/seed/villa2/800/600',
    description: "Une villa d'exception les pieds dans l'eau. Accès direct à la plage de la Caravelle. Le Domaine du Lagon allie architecture créole traditionnelle et confort ultra-moderne. Service de ménage inclus.",
    amenities: ['Wifi', 'Climatisation', 'Piscine', 'Parking', 'Petit-déjeuner', 'Accès plage'],
    coordinates: { lat: 16.23, lng: -61.38 }
  },
  {
    id: '3',
    name: 'Refuge Tropical',
    location: 'Deshaies, Basse-Terre',
    price: 280,
    rating: 4.7,
    reviews: 56,
    bedrooms: 2,
    guests: 4,
    image: 'https://picsum.photos/seed/villa3/800/600',
    description: "Entourée par la forêt tropicale luxuriante de Basse-Terre, cette villa écologique en bois offre une déconnexion totale. Proche de la plage de Grande Anse. Profitez du chant des oiseaux et des couchers de soleil spectaculaires.",
    amenities: ['Wifi', 'Parking', 'Jardin', 'Hamac', 'Barbecue'],
    coordinates: { lat: 16.30, lng: -61.79 }
  },
  {
    id: '4',
    name: 'Villa Zen',
    location: 'Le Gosier, Grande-Terre',
    price: 410,
    rating: 4.8,
    reviews: 30,
    bedrooms: 4,
    guests: 8,
    image: 'https://picsum.photos/seed/villa4/800/600',
    description: "Située au cœur de l'île, la Villa Zen est parfaite pour rayonner. Design épuré, jacuzzi privé et grande terrasse ventilée. À 10 minutes de la marina et des restaurants.",
    amenities: ['Wifi', 'Climatisation', 'Jacuzzi', 'Parking', 'TV', 'Lave-linge'],
    coordinates: { lat: 16.20, lng: -61.49 }
  },
   {
    id: '5',
    name: 'Bungalow des Alizés',
    location: 'Saint-François, Grande-Terre',
    price: 190,
    rating: 4.6,
    reviews: 84,
    bedrooms: 1,
    guests: 2,
    image: 'https://picsum.photos/seed/villa5/800/600',
    description: "Un cocon romantique pour les couples. Ce bungalow de charme offre intimité et confort. Piscine partagée dans la résidence sécurisée. Proche de la Pointe des Châteaux.",
    amenities: ['Wifi', 'Climatisation', 'Piscine', 'Parking', 'Kitchenette'],
    coordinates: { lat: 16.25, lng: -61.25 }
  },
   {
    id: '6',
    name: 'Manoir de la Soufrière',
    location: 'Saint-Claude, Basse-Terre',
    price: 600,
    rating: 4.9,
    reviews: 12,
    bedrooms: 6,
    guests: 12,
    image: 'https://picsum.photos/seed/villa6/800/600',
    description: "Une demeure historique rénovée au pied du volcan. Climat frais, parc arboré de 2 hectares. Idéal pour les grands groupes et les amateurs de randonnée. Prestations haut de gamme.",
    amenities: ['Wifi', 'Piscine chauffée', 'Parking', 'Jardin immense', 'Cheminée'],
    coordinates: { lat: 16.03, lng: -61.70 }
  }
];

const App: React.FC = () => {
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'Grande-Terre' | 'Basse-Terre'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleHeroSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory('all');
    // Smooth scroll to villas section
    const element = document.getElementById('villas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredVillas = MOCK_VILLAS.filter(v => {
    const matchesCategory = activeCategory === 'all' || v.location.includes(activeCategory);
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onOpenConcierge={() => setIsConciergeOpen(!isConciergeOpen)} />
      
      <main className="flex-grow">
        <Hero onSearch={handleHeroSearch} />

        {/* Filters Section */}
        <section id="villas" className="container mx-auto px-4 py-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Nos Villas Coup de Cœur</h2>
              {searchQuery && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-slate-500">
                    Résultats pour "{searchQuery}"
                  </span>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-teal-600 font-medium hover:underline"
                  >
                    Effacer la recherche
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Tout voir
              </button>
              <button 
                onClick={() => setActiveCategory('Grande-Terre')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeCategory === 'Grande-Terre' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Grande-Terre
              </button>
              <button 
                onClick={() => setActiveCategory('Basse-Terre')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeCategory === 'Basse-Terre' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Basse-Terre
              </button>
            </div>
          </div>

          {/* Grid */}
          {filteredVillas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVillas.map(villa => (
                <VillaCard 
                  key={villa.id} 
                  villa={villa} 
                  onClick={setSelectedVilla} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-xl">
              <p className="text-slate-500 text-lg">Aucune villa ne correspond à votre recherche.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                className="mt-4 text-teal-600 font-medium hover:text-teal-800"
              >
                Voir toutes les villas
              </button>
            </div>
          )}
        </section>

        {/* Experiences Section */}
        <section id="experiences" className="bg-slate-50 py-16 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Expériences Uniques</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Au-delà de l'hébergement, nous créons des souvenirs inoubliables. 
                Laissez notre conciergerie organiser vos activités.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mb-4">
                  <Utensils size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Chef à Domicile</h3>
                <p className="text-slate-500 mb-4">Savourez la gastronomie créole préparée dans votre villa par nos chefs partenaires.</p>
                <button className="text-teal-600 font-medium text-sm hover:underline">Réserver un chef</button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
                  <Ship size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Excursion Catamaran</h3>
                <p className="text-slate-500 mb-4">Découvrez les îlets de la Petite-Terre ou les Saintes lors d'une journée en mer privée.</p>
                <button className="text-blue-600 font-medium text-sm hover:underline">Voir les excursions</button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center mb-4">
                  <Sun size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Bien-être & Spa</h3>
                <p className="text-slate-500 mb-4">Massages relaxants et soins du corps directement sur la terrasse de votre villa.</p>
                <button className="text-orange-600 font-medium text-sm hover:underline">Menu des soins</button>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props Section */}
        <section id="about" className="bg-teal-900 text-white py-16 scroll-mt-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Pourquoi choisir GuadaVillas ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-16 h-16 bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">💎</div>
                <h3 className="text-xl font-bold mb-2">Qualité Garantie</h3>
                <p className="text-teal-100">Chaque villa est visitée et vérifiée par nos experts locaux.</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🌴</div>
                <h3 className="text-xl font-bold mb-2">Expertise Locale</h3>
                <p className="text-teal-100">Une équipe basée en Guadeloupe pour vous assister 7j/7.</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔒</div>
                <h3 className="text-xl font-bold mb-2">Paiement Sécurisé</h3>
                <p className="text-teal-100">Réservez en toute tranquillité avec notre plateforme sécurisée.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 scroll-mt-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-4">GuadaVillas</h4>
            <p className="text-sm">La référence de la location de prestige en Guadeloupe depuis 2015.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleHeroSearch('Saint-François')} className="hover:text-white text-left">Saint-François</button></li>
              <li><button onClick={() => handleHeroSearch('Sainte-Anne')} className="hover:text-white text-left">Sainte-Anne</button></li>
              <li><button onClick={() => handleHeroSearch('Deshaies')} className="hover:text-white text-left">Deshaies</button></li>
              <li><button onClick={() => handleHeroSearch('Le Gosier')} className="hover:text-white text-left">Le Gosier</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-white">Conditions générales</a></li>
              <li><a href="#" className="hover:text-white">Politique de confidentialité</a></li>
            </ul>
          </div>
           <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>+590 690 12 34 56</li>
              <li>bonjour@guadavillas.gp</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} GuadaVillas. Tous droits réservés.
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedVilla && (
        <VillaDetails 
          villa={selectedVilla} 
          onClose={() => setSelectedVilla(null)} 
        />
      )}

      {/* AI Assistant */}
      <AIConcierge 
        isOpen={isConciergeOpen} 
        onClose={() => setIsConciergeOpen(!isConciergeOpen)} 
      />
    </div>
  );
};

export default App;