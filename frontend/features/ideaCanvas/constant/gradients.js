// Color gradients for idea cards
export const cardGradients = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-purple-500',
    'from-green-500 to-blue-500',
    'from-yellow-500 to-orange-500',
    'from-pink-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-cyan-500',
    'from-orange-500 to-red-500'
  ];
  
  export const getRandomGradient = (index) => {
    return cardGradients[index % cardGradients.length];
  };