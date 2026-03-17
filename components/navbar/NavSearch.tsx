import { Input } from '../ui/input';

function NavSearch() {
  return (
    <Input
      type='search'
      placeholder='검색어를 입력하세요.'
      className='h-9 max-w-xs'
    />
  );
}

export default NavSearch;
