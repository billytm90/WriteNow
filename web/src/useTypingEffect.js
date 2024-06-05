import { useState, useEffect } from 'react';

const useTypingEffect = (text, speed = 300) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset displayed text when the input text changes
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex += 1;
      if (currentIndex === text.length) {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayedText;
};

export default useTypingEffect;
