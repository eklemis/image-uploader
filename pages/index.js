import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Screen from "../components/screen";
import { useEffect, useState } from "react";
import { style } from "@mui/system";

export default function Home() {
	// 0: start screen, 1: uploading screen, 2: result screen
	const [activeScreen, setActiveScreen] = useState(0);

	const [progress, setProgress] = useState(25);

	const [uploadedImg, setUploadedImg] = useState("/uploads/image-uploaded.png");
	const [imageUrl, setImageUrl] = useState("");
	useEffect(() => {
		setImageUrl(window.location.origin + uploadedImg);
	}, [uploadedImg]);

	const uploadToClient = async (event) => {
		if (event.target.files && event.target.files[0]) {
			setProgress(0);
			const i = event.target.files[0];
			console.log(event.target.files[0]);
			setProgress(25);
			setActiveScreen(1);
			const result = await uploadToServer(i);
			setProgress(80);
			console.log(result);
			setUploadedImg(result.fileUrl);
			setProgress(100);
			setActiveScreen(2);
		}
	};

	const uploadToServer = async (imageFile) => {
		const body = new FormData();
		body.append("file", imageFile);
		const response = await fetch("/api/upload", {
			method: "POST",
			body,
		});
		return response.json();
	};

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
									src="/clip-1406.png"
									alt="Drag & Drop your image here"
									width={114}
									height={89}
								/>
								<figcaption className={styles["figure-caption"]}>
									Drag & Drop your image here
								</figcaption>
							</figure>
						</div>
						<p className={styles["ordinary-text"]}>Or</p>
						<input
							type="file"
							name="imageFile"
							id="imageFile"
							accept="image/*"
							className={styles["btn__upload"]}
							onChange={uploadToClient}
						/>
						<label htmlFor="imageFile">Choose file</label>
					</Screen>
				)}
				{activeScreen === 1 && (
					<Screen>
						<div className={styles["progress-holder"]}>
							<h1 className={styles.title}>Uploading...</h1>
							<progress
								className={styles.progress}
								value={progress}
								max="100"
							></progress>
						</div>
					</Screen>
				)}
				{activeScreen === 2 && (
					<Screen>
						<Image
							src="/check.svg"
							alt="success icon"
							width={35}
							height={35}
						></Image>
						<h1 className={styles.title}>Uploaded Successfully!</h1>
						<div className={styles["image-holder"]}>
							<Image
								src={uploadedImg}
								alt="Uploaded image"
								width="100%"
								height="100%"
								className={styles["uploaded-image"]}
							></Image>
						</div>
						<div className={styles["link-holder"]}>
							<p className={styles["link-text"]}>{imageUrl}</p>
							<button className={styles["btn__copy"]}>Copy Link</button>
						</div>
					</Screen>
				)}
			</main>
		</div>
	);
}
