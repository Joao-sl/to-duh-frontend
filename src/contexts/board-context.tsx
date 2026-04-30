import { ProjectBoardData } from '@/lib/http/types/project';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type BoardContextValue = {
  board: ProjectBoardData;
  setBoard: Dispatch<SetStateAction<ProjectBoardData>>;
};

export const BoardContext = createContext<BoardContextValue | undefined>(
  undefined,
);

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error('useBoardContext must be use within BoardProvider');
  }

  return context;
};
