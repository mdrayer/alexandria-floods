import React from 'react';

const squareLength = 12;

interface LegendSquareProps {
  color: string;
}

const LegendSquare = ({ color }: LegendSquareProps) => (
  <svg
    className="mr-1"
    width={squareLength}
    height={squareLength}
    viewBox={`0 0 ${squareLength} ${squareLength}`}
    style={{
      display: 'inline-block',
      verticalAlign: 'middle',
    }}
  >
    <rect fill={color} width={squareLength} height={squareLength} />
  </svg>
);

export default LegendSquare;
