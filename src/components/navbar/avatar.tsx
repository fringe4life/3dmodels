import { css } from "@styled-system/css";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import type { User } from "@/lib/auth/auth-types";
import type { Maybe } from "@/types";

interface AvatarProps {
  user: Maybe<Pick<Partial<User>, "name" | "image">>;
}

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
  return (
    <FaUserCircle
      aria-hidden="true"
      className={css({
        blockSize: "full",
        color: "text.secondary",
        inlineSize: "full",
      })}
    />
  );
};

export { Avatar };
