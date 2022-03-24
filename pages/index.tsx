import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import mainLayout from "../src/layout/main";
import { afterLogin } from "../src/utils/ssr";
import PostTweet from "../src/components/post-tweet";

const Home = () => {
  return (
    <>
      <h1 className="text-2xl font-extrabold text-gray-700">Your feed</h1>
      <PostTweet />
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
