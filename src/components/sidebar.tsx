import styles from "./sidebar.module.scss";

type SidebarProps = {};
export default function Sidebar(props: SidebarProps): JSX.Element {
  return (
    <div>
      <div className={styles.Sidebar}></div>
    </div>
  );
}
