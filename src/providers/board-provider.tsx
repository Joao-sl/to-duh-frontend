'use client';

import { useReducer } from 'react';
import { BoardContext } from '@/contexts/board-context';
import { type ProjectBoardData } from '@/lib/http/types/project';
import { boardReducer } from '@/reducers/board-reducer';

type BoardProviderProps = {
  children: React.ReactNode;
  initialData: ProjectBoardData;
};

export function BoardProvider({ children, initialData }: BoardProviderProps) {
  const [board, dispatch] = useReducer(boardReducer, initialData);

  return (
    <BoardContext.Provider value={{ board, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}
