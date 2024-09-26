import React from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';

const sliderCards = [
  { id: 1, videoUrl: 'https://www.youtube.com/watch?v=7RJ_0m2SQO8' },
  { id: 2, videoUrl: 'https://www.youtube.com/watch?v=IM3I8GeJoP4' },
  { id: 3, videoUrl: 'https://www.youtube.com/watch?v=BI10VmbVYsk' },
  { id: 4, videoUrl: 'https://www.youtube.com/watch?v=5q-tuf4ZQtw' },
  { id: 5, videoUrl: 'https://www.youtube.com/watch?v=ovv99xt4TeE' },
  { id: 6, videoUrl: 'https://www.youtube.com/watch?v=1OjQA50r4jI' },
  { id: 7, videoUrl: 'https://www.youtube.com/watch?v=wKbrRT2Jew8' },
  { id: 8, videoUrl: 'https://www.youtube.com/watch?v=Kb5AJ7Yinwc' },
];

const Card = React.memo(function Card({ card }: { card: { id: number; videoUrl: string } }) {
  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-shrink-0 w-80 h-56 bg-white rounded-lg shadow-md overflow-hidden"
    >
      <ReactPlayer
        url={card.videoUrl}
        width="100%"
        height="100%"
        controls={true}
        light={true}
        pip={true}
      />
    </motion.div>
  );
});

const MediaProductionSlider = () => {
  return (
    <div className="flex justify-center items-center h-full relative">
      <div className="flex space-x-6 overflow-x-auto py-6 px-4 max-w-full">
        {sliderCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MediaProductionSlider;
