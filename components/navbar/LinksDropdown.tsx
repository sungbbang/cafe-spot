import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { LuAlignLeft } from 'react-icons/lu';
import UserIcon from './UserIcon';
import { links } from '@/utils/links';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import SignOutMenuItem from './SignOutMenuItem';
import { fetchProfileImage } from '@/utils/actions';

async function LinksDropdown() {
  const profileImage = await fetchProfileImage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='flex h-9 w-24 justify-between gap-4 px-4'
        >
          <LuAlignLeft />
          <UserIcon profileImage={profileImage} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {links.map(link => (
          <DropdownMenuItem key={link.href}>
            <Link href={link.href} className='w-full'>
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <Separator />

        <SignOutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
