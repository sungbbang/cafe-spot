import Link from 'next/link';
import { Button } from '../ui/button';
import { LuCoffee } from 'react-icons/lu';

function Logo() {
  return (
    <Button size='icon-lg' asChild>
      <Link href='/'>
        <LuCoffee />
      </Link>
    </Button>
  );
}

export default Logo;
