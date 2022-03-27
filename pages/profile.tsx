import MainLayout from "../src/layout/main";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Input from "../src/components/input";
import Button from "../src/components/button";
import { useAuthContext } from "../src/utils/authContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { afterLogin } from "../src/utils/ssr";

const ProfilePage = () => {
  const user = useAuthContext(),
    { register, handleSubmit } = useForm<User>({
      defaultValues: user,
    });

  const onSubmit: SubmitHandler<User> = async (values) => {
    console.log(values);
    await fetch(`/api/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-extrabold text-gray-700 mb-7">
        Your profile
      </h1>
      <div className="w-2/3 flex gap-y-6 flex-col">
        <div className="grid grid-cols-2 gap-4">
          <Input label={"First name"} {...register("displayName")} />
          <Input label={"Last name"} />
        </div>
        <Input
          className="w-2/3"
          label={"Your handle (username)"}
          {...register("name")}
        />
        <Input
          className="w-2/3"
          label={"Email Address"}
          disabled
          {...register("email")}
        />
        <Button
          variant={"contained"}
          size={"large"}
          onClick={handleSubmit(onSubmit)}
          className={"self-start"}
        >
          Update info
        </Button>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(afterLogin);

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(ProfilePage);
