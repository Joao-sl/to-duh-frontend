import { BoardAction } from '@/reducers/types/board';
import { ProjectBoardData } from '@/lib/http/types/project';
import { createContext, Dispatch, useContext } from 'react';

type BoardContextValue = {
  board: ProjectBoardData;
  dispatch: Dispatch<BoardAction>;
};

export const BoardContext = createContext<BoardContextValue | undefined>(
  undefined,
);

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error('useBoardContext must be used within BoardProvider');
  }

  return context;
};
