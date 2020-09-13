import React from 'react';

const squareLength = 12;

interface LegendSquareProps {
  color: string;
}

const LegendSquare = ({ color }: LegendSquareProps) => (
  <svg
    className="mr-1 align-middle d-inline-block"
    width={squareLength}
    height={squareLength}
    viewBox={`0 0 ${squareLength} ${squareLength}`}
  >
    <rect fill={color} width={squareLength} height={squareLength} />
  </svg>
);

export default LegendSquare;
