import React, { useState } from 'react';
import { X, Wifi, Wind, Coffee, Tv, Car, Waves, Star, CheckCircle } from 'lucide-react';
import { Villa, BookingForm } from '../types';

interface VillaDetailsProps {
  villa: Villa;
  onClose: () => void;
}

export const VillaDetails: React.FC<VillaDetailsProps> = ({ villa, onClose }) => {
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success'>('idle');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('success');
    // Simulate API call
    setTimeout(() => {
      setBookingStatus('idle');
      onClose();
    }, 2500);
  };

  const getAmenityIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'wifi': return <Wifi size={18} />;
      case 'climatisation': return <Wind size={18} />;
      case 'petit-déjeuner': return <Coffee size={18} />;
      case 'tv': return <Tv size={18} />;
      case 'parking': return <Car size={18} />;
      case 'piscine': return <Waves size={18} />;
      default: return <CheckCircle size={18} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-slate-800 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left Side: Images & Info */}
        <div className="md:w-3/5 p-0">
          <div className="h-64 md:h-96 w-full relative">
            <img src={villa.image} alt={villa.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20">
              <h2 className="text-3xl font-bold text-white mb-1">{villa.name}</h2>
              <div className="flex items-center gap-2 text-white/90">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span>{villa.rating} ({villa.reviews} avis)</span>
                <span>•</span>
                <span>{villa.location}</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">À propos de ce logement</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              {villa.description}
            </p>

            <h3 className="text-lg font-bold text-slate-900 mb-4">Équipements</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {villa.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-600">
                  <span className="text-teal-600">{getAmenityIcon(amenity)}</span>
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="md:w-2/5 border-l border-slate-100 bg-slate-50 p-6 md:p-8 flex flex-col">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-3xl font-bold text-teal-700">{villa.price}€</span>
                <span className="text-slate-500"> / nuit</span>
              </div>
            </div>

            {bookingStatus === 'success' ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg flex flex-col items-center justify-center text-center py-10">
                <CheckCircle size={48} className="mb-4 text-green-500" />
                <h4 className="font-bold text-lg mb-2">Demande envoyée !</h4>
                <p className="text-sm">Notre équipe vous recontactera sous 24h pour finaliser votre séjour.</p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Dates</label>
                  <input type="text" placeholder="Arrivée - Départ" className="w-full p-3 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Voyageurs</label>
                  <select className="w-full p-3 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all">
                    {[...Array(villa.guests)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1} personne{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>{villa.price}€ x 7 nuits</span>
                    <span>{villa.price * 7}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais de ménage</span>
                    <span>150€</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold text-base pt-2 border-t border-slate-100 mt-2">
                    <span>Total</span>
                    <span>{villa.price * 7 + 150}€</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-teal-600/20 mt-4"
                >
                  Réserver maintenant
                </button>
                <p className="text-center text-xs text-slate-400 mt-2">Aucun débit immédiat</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
