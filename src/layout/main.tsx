import { PropsWithChildren } from "react";
import styles from "./main.module.scss";
import Sidebar from "../components/sidebar";
import { useAuthUser } from "next-firebase-auth";

export default function MainLayout({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  const user = useAuthUser();
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} />
      <div className={styles.Content}>
        <main>
          <div className={styles.Main}>{children}</div>
        </main>
      </div>
    </div>
  );
}
