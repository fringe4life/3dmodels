import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import type { AvatarProps } from "../types";

const Avatar = ({ user }: AvatarProps) => {
  if (!user) {
    return null;
  }
  if (user.image) {
    return (
      <Image
        alt={user.name ?? "User avatar"}
        className="block-full inline-full object-cover"
        height={32}
        sizes="32px"
        src={user.image}
        width={32}
      />
    );
  }
  return <FaUserCircle className="inline-full block-full text-gray-700" />;
};

export { Avatar };
