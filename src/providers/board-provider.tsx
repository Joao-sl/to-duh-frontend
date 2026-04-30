'use client';

import { useState } from 'react';
import { BoardContext } from '@/contexts/board-context';
import { type ProjectBoardData } from '@/lib/http/types/project';

type BoardProviderProps = {
  children: React.ReactNode;
  boardData: ProjectBoardData;
};

export function BoardProvider({ children, boardData }: BoardProviderProps) {
  const [board, setBoard] = useState<ProjectBoardData>(boardData);

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
}
