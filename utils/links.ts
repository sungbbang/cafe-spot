type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: '/', label: '홈' },
  { href: '/favorites', label: '즐겨찾기' },
  { href: '/cafes/register', label: '카페 등록' },
  { href: '/map', label: '카페 지도' },
  { href: '/my-cafes', label: '내 등록카페' },
  { href: '/profile', label: '프로필' },
];
