import React from 'react';
import { motion } from 'framer-motion';

const sliderCards = [
  { id: 1, title: 'Short Films', description: 'Create compelling short films', video: '/videos/Vito X.mp4' },
  { id: 2, title: 'Commercials', description: 'Produce engaging commercials', video: '/videos/3 films.mp4' },
  { id: 3, title: 'Music Videos', description: 'Craft visually stunning music videos', video: '/videos/PizzA.mp4' },
  { id: 4, title: 'Documentaries', description: 'Tell powerful stories through documentaries', video: '/videos/THE DREAM.mp4' },
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
            <div className="w-full h-56 bg-gray-200">
              <video
                className="w-full h-full object-cover"
                src={card.video}
                controls
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-2">{card.title}</h3>
              <p className="text-xs">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MediaProductionSlider;