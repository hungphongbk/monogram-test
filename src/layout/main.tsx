import { PropsWithChildren, ReactElement } from "react";
import styles from "./main.module.scss";
import Sidebar from "../components/sidebar";

function MainLayout({ children }: PropsWithChildren<unknown>): JSX.Element {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className={styles.Content}>
        <main>
          <div className={styles.Main}>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function mainLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
}
