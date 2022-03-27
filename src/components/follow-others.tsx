import useSWR, { useSWRConfig } from "swr";
import { useAuthContext } from "../utils/authContext";
import { User } from "@prisma/client";
import Avatar from "./avatar";
import Button from "./button";
import { useCallback } from "react";

type UserWithFollow = User & {
  followByMe: boolean;
};
const fetcher = (url: string): Promise<UserWithFollow[]> =>
  fetch(url).then((res) => res.json());

type FollowOthersProps = {};
export default function FollowOthers(props: FollowOthersProps): JSX.Element {
  const user = useAuthContext();
  const { data } = useSWR("/api/follow/others", fetcher),
    { mutate } = useSWRConfig();

  const doFollow = useCallback(
    async (user: UserWithFollow) => {
      await fetch("/api/follow/do-follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });
      await mutate("/api/follow/others");
    },
    [mutate]
  );

  return (
    <div>
      <h3 className="text-lg font-extrabold text-gray-700">Follow Others</h3>
      <div className="grid grid-cols-1 divide-y border-t mt-3">
        {data?.map((u) => (
          <div key={u.id} className="pt-5 pb-6 flex gap-4 items-center">
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
    </div>
  );
}
