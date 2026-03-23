import { LuUserRound } from 'react-icons/lu';

function UserIcon({
  profileImage,
  className,
}: {
  profileImage?: string | null;
  className?: string;
}) {
  if (profileImage) {
    return (
      <img
        src={profileImage}
        className={`h-6 w-6 rounded-full object-cover ${className}`}
        alt='프로필 이미지'
      />
    );
  }

  return (
    <LuUserRound
      className={`bg-primary h-6 w-6 rounded-full text-white ${className}`}
    />
  );
}

export default UserIcon;
