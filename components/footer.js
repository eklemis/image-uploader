import styles from "./footer.module.css";

export default function Footer() {
	return (
		<div className={styles.attribution}>
			<p>
				created by{" "}
				<a
					href="https://devchallenges.io/portfolio/eklemis"
					className={styles.user}
				>
					Eklemis
				</a>{" "}
				- <a href="https://devchallenges.io/">devChallenges.io</a>
			</p>
		</div>
	);
}
