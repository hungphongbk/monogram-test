import MainLayout from "../src/layout/main";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

const FollowingPage = () => {
  return (
    <MainLayout>
      <h1 className="text-2xl font-extrabold text-gray-700">
        People you follow
      </h1>
    </MainLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(FollowingPage);
