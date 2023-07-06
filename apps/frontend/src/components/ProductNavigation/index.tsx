'use client';
import { Button } from '@utrecht/component-library-react';
import React, { useState } from 'react';

export const ProductNavigation = ({ products }) => {
  const [selectedLetter, setSelectedLetter] = useState('');

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };
  const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().startsWith(selectedLetter.toLowerCase()),
  );

  return (
    <div>
      <h2>Product Navigation</h2>
      <div>
        {alphabet.map((letter) => (
          <Button
            appearance="subtle-button"
            key={letter}
            onClick={() => handleLetterClick(letter)}
            aria-pressed={selectedLetter === letter}
            style={{ fontWeight: selectedLetter === letter ? 'bold' : 'normal' }}
          >
            {letter}
          </Button>
        ))}
      </div>
      <div>
        {filteredProducts.map((product) => (
          <p key={product.id}>{product.name}</p>
        ))}
      </div>
    </div>
  );
};

export default ProductNavigation;
