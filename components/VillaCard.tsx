import React from 'react';
import { Star, Users, BedDouble, MapPin } from 'lucide-react';
import { Villa } from '../types';

interface VillaCardProps {
  villa: Villa;
  onClick: (villa: Villa) => void;
}

export const VillaCard: React.FC<VillaCardProps> = ({ villa, onClick }) => {
  return (
    <div 
      onClick={() => onClick(villa)}
      className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={villa.image} 
          alt={villa.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-slate-800">{villa.rating}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
            {villa.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
          <MapPin size={14} />
          <span>{villa.location}</span>
        </div>

        <div className="flex items-center gap-4 text-slate-600 text-sm mb-4">
          <div className="flex items-center gap-1">
            <BedDouble size={16} />
            <span>{villa.bedrooms} Chb.</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{villa.guests} Pers.</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <span className="text-lg font-bold text-teal-700">{villa.price}€</span>
            <span className="text-slate-400 text-sm"> / nuit</span>
          </div>
          <button className="text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors">
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );
};
