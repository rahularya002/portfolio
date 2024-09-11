import React from 'react';
import { motion } from 'framer-motion';
import CardDemo2 from '../components/blocks/cards-demo-1'; // Import CardDemo2 component

const sliderCards = [
  { id: 1, title: 'Short Films', description: 'Create compelling short films' },
  // { id: 2, title: 'Commercials', description: 'Produce engaging commercials' },
  // { id: 3, title: 'Music Videos', description: 'Craft visually stunning music videos' },
  // { id: 4, title: 'Documentaries', description: 'Tell powerful stories through documentaries' },
];

const MediaProductionSlider = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex space-x-6 overflow-x-auto py-6 px-4 max-w-full">
        {sliderCards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-64 h-80 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <CardDemo2 title={card.title} description={card.description} /> // Use CardDemo2 here
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MediaProductionSlider;