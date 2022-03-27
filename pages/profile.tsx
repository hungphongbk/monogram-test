import mainLayout from "../src/layout/main";
import MainLayout from "../src/layout/main";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Input from "../src/components/input";
import Button from "../src/components/button";
import { useCallback } from "react";

const ProfilePage = () => {
  const handleUpdated = useCallback(() => {}, []);
  return (
    <MainLayout>
      <h1 className="text-2xl font-extrabold text-gray-700 mb-7">
        Your profile
      </h1>
      <div className="w-2/3 flex gap-y-6 flex-col">
        <div className="grid grid-cols-2 gap-4">
          <Input label={"First name"} />
          <Input label={"Last name"} />
        </div>
        <Input className="w-2/3" label={"Your handle (username)"} />
        <Input className="w-2/3" label={"Email Address"} />
        <Button
          variant={"contained"}
          size={"large"}
          onClick={handleUpdated}
          className={"self-start"}
        >
          Update info
        </Button>
      </div>
    </MainLayout>
  );
};

ProfilePage.getLayout = mainLayout;

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(ProfilePage);
