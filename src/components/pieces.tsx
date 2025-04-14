import React from 'react';
import { useChessboardProps } from '../context/props-context/hooks';

import { useBoard } from '../context/board-context/hooks';
import { usePieceRefs } from '../context/board-refs-context/hooks';

import Piece from './piece';
import { useReversePiecePosition } from '../notation';

const Pieces = React.memo(() => {
  const board = useBoard();
  const refs = usePieceRefs();
  const { pieceSize, flippedBoard } = useChessboardProps();
  const { toPosition } = useReversePiecePosition();

  return (
    <>
      {board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            // Calculate flipped coordinates for piece positions
            const displayX = flippedBoard ? 7 - x : x;
            const displayY = flippedBoard ? 7 - y : y;
            
            const square = toPosition({
              x: displayX * pieceSize,
              y: displayY * pieceSize,
            });

            return (
              <Piece
                ref={refs?.current?.[square]}
                key={`${x}-${y}`}
                id={`${piece.color}${piece.type}` as const}
                startPosition={{ x: displayX, y: displayY }}
                square={square}
                size={pieceSize}
              />
            );
          }
          return null;
        })
      )}
    </>
  );
});

export { Pieces };
