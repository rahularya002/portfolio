import React from 'react';
import { motion } from 'framer-motion';
import CardDemo2 from '../components/blocks/cards-demo-1'; // Import CardDemo2 component

const sliderCards = [
  { id: 1, title: 'Short Films', description: 'Create compelling short films', videoUrl: 'https://www.youtube.com/embed/7RJ_0m2SQO8?si=Fzo6XqLd45dfksJA' },
  { id: 2, title: 'Commercials', description: 'Produce engaging commercials', videoUrl: 'https://www.youtube.com/embed/IM3I8GeJoP4?si=ZOz5Ey24-2iUlNQP' },
  { id: 3, title: 'Music Videos', description: 'Craft visually stunning music videos', videoUrl: 'https://www.youtube.com/embed/BI10VmbVYsk?si=1eMwBvvf24e5W5v7' },
  { id: 4, title: 'Documentaries', description: 'Tell powerful stories through documentaries', videoUrl: 'https://www.youtube.com/embed/5q-tuf4ZQtw?si=_j1UiXmjrp3WV399' },
];

const Card = React.memo(function Card({ card }: { card: { id: number; title: string; description: string; videoUrl: string } }) {
  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-shrink-0 w-80 h-96 bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="w-full h-56">
        <iframe
          width="100%"
          height="100%"
          src={card.videoUrl}
          title={card.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
        <p className="text-sm text-gray-600">{card.description}</p>
      </div>
    </motion.div>
  );
});

const MediaProductionSlider = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex space-x-6 overflow-x-auto py-6 px-4 max-w-full">
        {sliderCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default MediaProductionSlider;
