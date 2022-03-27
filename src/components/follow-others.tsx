import useSWR, { useSWRConfig } from "swr";
import { useAuthContext } from "../utils/authContext";
import { User } from "@prisma/client";
import Avatar from "./avatar";
import Button from "./button";
import { useCallback } from "react";
import clsx from "clsx";

type UserWithFollow = User & {
  followByMe: boolean;
};
const fetcher = (url: string): Promise<UserWithFollow[]> =>
  fetch(url).then((res) => res.json());

type FollowOthersProps = {
  onFollowed?: () => Promise<void>;
  columns?: number;
  className?: string;
};
export default function FollowOthers(props: FollowOthersProps): JSX.Element {
  const user = useAuthContext();
  const { data } = useSWR("/api/follow/others", fetcher),
    { mutate } = useSWRConfig();

  const doFollow = useCallback(
    async (user: UserWithFollow) => {
      await fetch(
        user.followByMe ? "/api/follow/do-unfollow" : "/api/follow/do-follow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user.id }),
        }
      );
      await mutate("/api/follow/others");
      await props.onFollowed?.();
    },
    [mutate, props]
  );

  return (
    <div
      className={clsx(
        `grid grid-cols-${props.columns ?? 1} divide-y mt-3`,
        props.className
      )}
    >
      {data?.map((u, index) => (
        <div
          key={u.id}
          className={clsx(
            "pt-5 pb-6 flex gap-4 items-center",
            index === 0 && "border-t"
          )}
        >
          <Avatar src={u.image!} />
          <div className="flex-1">
            <div className="text-sm font-medium">{u.displayName}</div>
            <div className="text-sm text-gray-500">@{u.name}</div>
          </div>
          <Button size={"small"} rounded onClick={() => doFollow(u)}>
            {u.followByMe ? "Unfollow" : "Follow"}
          </Button>
        </div>
      ))}
    </div>
  );
}
