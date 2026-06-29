import { type ProjectBoardData } from '@/lib/http/types/project';
import { type SectionData } from '@/lib/http/types/section';

export function addSectionInBoard(
  state: ProjectBoardData,
  data: SectionData,
): ProjectBoardData {
  return {
    ...state,
    sections: [...state.sections, { tasks: [], ...data }],
  };
}

export function updateSectionInBoard(
  state: ProjectBoardData,
  data: SectionData,
): ProjectBoardData {
  return {
    ...state,
    sections: state.sections.map(state =>
      state.id === data.id ? { ...state, ...data } : state,
    ),
  };
}

export function removeSectionFormBoard(
  state: ProjectBoardData,
  data: Pick<SectionData, 'id'>,
): ProjectBoardData {
  return {
    ...state,
    sections: state.sections.filter(section => section.id !== data.id),
  };
}
