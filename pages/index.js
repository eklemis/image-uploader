import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Screen from "../components/screen";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Image Uploader</title>
				<meta name="description" content="Image file uploader" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Screen>
					<h1 className={styles.title}>
						Welcome to <a href="https://nextjs.org">Next.js!</a>
					</h1>
				</Screen>
			</main>
		</div>
	);
}
