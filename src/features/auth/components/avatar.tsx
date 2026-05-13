import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { css } from "../../../../styled-system/css";
import type { AvatarProps } from "../types";

const Avatar = ({ user }: AvatarProps) => {
  if (!user) {
    return null;
  }
  if (user.image) {
    return (
      <Image
        alt={user.name ?? "User avatar"}
        className={css({
          blockSize: "full",
          inlineSize: "full",
          objectFit: "cover",
        })}
        height={32}
        sizes="32px"
        src={user.image}
        width={32}
      />
    );
  }
  // "inline-full block-full text-gray-700"
  return (
    <FaUserCircle
      className={css({
        inlineSize: "full",
        blockSize: "full",
        color: "text.secondary",
      })}
    />
  );
};

export { Avatar };
