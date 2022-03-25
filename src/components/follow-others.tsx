import useSWR from "swr";
import { useAuthContext } from "../utils/authContext";
import { User } from "@prisma/client";

const fetcher = (url: string, token: string): Promise<User[]> =>
  fetch(url, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json());

type FollowOthersProps = {};
export default function FollowOthers(props: FollowOthersProps): JSX.Element {
  const user = useAuthContext();
  const { data } = useSWR(["/api/follow/others", user.idToken], fetcher);
  return (
    <div>
      <h3 className="text-lg font-extrabold text-gray-700">Follow Others</h3>
      <div className="grid grid-cols-1 divide-y border-t mt-3">
        {data?.map((u) => (
          <div key={u.id} className="pt-5 pb-6">
            {u.displayName}
          </div>
        ))}
      </div>
    </div>
  );
}
