import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import mainLayout from "../src/layout/main";
import { afterLogin } from "../src/utils/ssr";
import PostTweet from "../src/components/post-tweet";
import styles from "../styles/Home.module.scss";
import FollowOthers from "../src/components/follow-others";

const Home = () => {
  return (
    <>
      <h1 className="text-2xl font-extrabold text-gray-700">Your feed</h1>
      <div className={styles.Main}>
        <div>
          <PostTweet />
        </div>
        <FollowOthers />
      </div>
    </>
  );
};

Home.getLayout = mainLayout;

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(afterLogin);

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);
