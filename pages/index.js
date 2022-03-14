import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Screen from "../components/screen";
import { useState } from "react";

export default function Home() {
	// 0: start screen, 1: uploading screen, 2: result screen
	const [activeScreen, setActiveScreen] = useState(0);
	return (
		<div className={styles.container}>
			<Head>
				<title>Image Uploader</title>
				<meta name="description" content="Image file uploader" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				{activeScreen === 0 && (
					<Screen>
						<h1 className={styles.title}>Upload your image</h1>
						<p className={styles.label}>File should be Jpeg, Png,...</p>
						<div className={styles["figure-holder"]}>
							<figure className={styles.figure}>
								<Image
									src="/add_to_photos_black_24dp.svg"
									alt="Trulli"
									width={114}
									height={89}
								/>
								<figcaption className={styles["figure-caption"]}>
									Drag & Drop your image here
								</figcaption>
							</figure>
						</div>
						<p className={styles["ordinary-text"]}>Or</p>
						<button className={styles.btn}>Choose file</button>
					</Screen>
				)}
			</main>
		</div>
	);
}
