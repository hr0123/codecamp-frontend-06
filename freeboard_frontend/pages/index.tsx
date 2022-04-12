import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const onClickMoveToLogin = () => {
    router.push("/login");
  };
  return (
    <>
      <div className={styles.landing} onClick={onClickMoveToLogin} />
    </>
  );
}
