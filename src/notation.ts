import type { Square } from 'chess.js';
import { useCallback } from 'react';
import { useChessboardProps } from './context/props-context/hooks';

import type { Vector } from './types';

const useReversePiecePosition = () => {
  const { pieceSize, flippedBoard } = useChessboardProps();

  const toTranslation = useCallback(
    (to: Square) => {
      'worklet';
      const tokens = to.split('');
      const col = tokens[0];
      const row = tokens[1];
      if (!col || !row) {
        throw new Error('Invalid notation: ' + to);
      }
      const indexes = {
        x: col.charCodeAt(0) - 'a'.charCodeAt(0),
        y: parseInt(row, 10) - 1,
      };
      
      // Flip coordinates if needed
      const displayX = flippedBoard ? 7 - indexes.x : indexes.x;
      const displayY = flippedBoard ? 7 - indexes.y : indexes.y;
      
      return {
        x: displayX * pieceSize,
        y: 7 * pieceSize - displayY * pieceSize,
      };
    },
    [pieceSize, flippedBoard]
  );

  const toPosition = useCallback(
    ({ x, y }: Vector) => {
      'worklet';
      const col = String.fromCharCode(97 + Math.round(x / pieceSize));
      const row = `${8 - Math.round(y / pieceSize)}`;
      const square = `${col}${row}` as Square;
      
      if (flippedBoard) {
        // Flip the square notation
        const tokens = square.split('');
        const col = tokens[0];
        const row = tokens[1];
        const newCol = String.fromCharCode(97 + (7 - (col.charCodeAt(0) - 'a'.charCodeAt(0))));
        const newRow = `${8 - (parseInt(row, 10) - 1)}`;
        return `${newCol}${newRow}` as Square;
      }
      
      return square;
    },
    [pieceSize, flippedBoard]
  );

  return { toPosition, toTranslation };
};

export { useReversePiecePosition };
