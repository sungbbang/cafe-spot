import { LuUserRound } from 'react-icons/lu';

function UserIcon({ className }: { className?: string }) {
  return (
    <LuUserRound
      className={`bg-primary rounded-full text-white ${className}`}
    />
  );
}

export default UserIcon;
