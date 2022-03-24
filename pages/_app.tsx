import "../styles/globals.css";
import type { AppProps } from "next/app";
import initAuth from "../src/initAuth";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { User } from "@prisma/client";
import { AuthProvider } from "../src/utils/authContext";

initAuth();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page),
    user = pageProps.user as unknown as User | undefined;

  return (
    <AuthProvider user={user}>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  );
}

export default MyApp;
