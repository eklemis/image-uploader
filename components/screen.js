import styles from "./screen.module.css";

export default function Screen(props) {
	return <section className={styles["main"]}>{props.children}</section>;
}
