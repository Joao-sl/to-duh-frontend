import { cn } from '@/utils/cn';
import { Kbd, KbdGroup } from '../ui/kbd';
import { IconSearch, IconX } from '@tabler/icons-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';

type SearchHeaderProps = {
  searchTerm: string;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
};

function SearchHeader({
  searchTerm,
  searchInputRef,
  onSearchChange,
  onClearSearch,
}: SearchHeaderProps) {
  return (
    <header className='flex flex-col gap-6 mb-6'>
      <h1 className='font-bold text-2xl'>My Projects</h1>

      <label htmlFor='project-search' className='sr-only'>
        Search for project
      </label>

      <InputGroup>
        <InputGroupInput
          id='project-search'
          placeholder='Search for project title'
          value={searchTerm}
          onChange={onSearchChange}
          ref={searchInputRef}
        />

        <InputGroupAddon>
          <IconSearch />
        </InputGroupAddon>

        <InputGroupAddon align='inline-end'>
          <InputGroupButton
            variant='link'
            aria-label='Clear input'
            onClick={onClearSearch}
            disabled={!searchTerm}
            className={cn(
              'hover:text-muted-foreground hover:[&_svg]:scale-125 [&_svg]:transition-all',
              { hidden: !searchTerm },
            )}
          >
            <IconX aria-hidden />
          </InputGroupButton>
        </InputGroupAddon>

        <InputGroupAddon align='inline-end'>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>F</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>
    </header>
  );
}

export { SearchHeader };
