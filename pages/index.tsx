import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import mainLayout from "../src/layout/main";

const Home = () => {
  return (
    <>
      <h1 className="text-2xl font-extrabold text-gray-700">Your feed</h1>
    </>
  );
};

Home.getLayout = mainLayout;

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);
