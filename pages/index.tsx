import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import MainLayout from "../src/layout/main";
import { afterLogin } from "../src/utils/ssr";
import PostTweet from "../src/components/post-tweet";
import styles from "../styles/Home.module.scss";
import FollowOthers from "../src/components/follow-others";
import useSWR, { useSWRConfig } from "swr";
import { useAuthContext } from "../src/utils/authContext";
import { Post, User } from "@prisma/client";
import Avatar from "../src/components/avatar";

type PostDto = Post & { author: User };
const fetcher = (url: string, token: string): Promise<PostDto[]> =>
  fetch(url, {
    headers: {
      Authorization: token,
    },
  }).then((r) => r.json());

const Home = () => {
  const user = useAuthContext();
  const { data } = useSWR(["/api/post", user.idToken], fetcher);
  const { mutate } = useSWRConfig();
  return (
    <MainLayout>
      <h1 className="text-2xl font-extrabold text-gray-700">Your feed</h1>
      <div className={styles.Main}>
        <div>
          <PostTweet onPosted={() => mutate(["/api/post", user.idToken])} />
          <div className="flex gap-6 flex-col">
            {data?.map((post) => (
              <div key={post.id} className="flex gap-3">
                <Avatar src={post.author.image!} className="shrink-0" />
                <div className="flex gap-1 flex-col">
                  <div>
                    <span className="text-sm font-medium mr-1.5">
                      {post.author.displayName}
                    </span>
                    <span className="text-sm text-gray-500">
                      @{post.author.name}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">{post.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <FollowOthers />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(afterLogin);

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);
