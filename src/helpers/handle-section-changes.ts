import { ProjectBoardData } from '@/lib/http/types/project';
import { SectionData } from '@/lib/http/types/section';

export function updateSectionInBoard(
  state: ProjectBoardData,
  data: SectionData,
) {
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
) {
  return {
    ...state,
    sections: state.sections.filter(section => section.id !== data.id),
  };
}
