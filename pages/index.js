import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Screen from "../components/screen";
import Progress from "../components/progress";
import Footer from "../components/footer";
import { useEffect, useState } from "react";

export default function Home() {
	// 0: start screen, 1: uploading screen, 2: result screen
	const [activeScreen, setActiveScreen] = useState(0);

	const [uploadedImg, setUploadedImg] = useState("/uploads/image-uploaded.png");
	const [imageUrl, setImageUrl] = useState("");

	const [showMsg, setShowMsg] = useState(false);
	useEffect(() => {
		setImageUrl(uploadedImg);
	}, [uploadedImg]);

	const uploadToClient = async (event) => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];
			setActiveScreen(1);
			setImageUrl(URL.createObjectURL(i));
			const result = await uploadToServer(i);
			console.log(result);
			setUploadedImg(result.apiResp.display_url);
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

	function copyClipboard() {
		navigator.clipboard.writeText(imageUrl);
		setShowMsg(true);
		setTimeout(() => {
			setShowMsg(false);
		}, 1500);
	}
	async function dropHandler(ev) {
		console.log("File(s) dropped");
		ev.preventDefault();
		if (ev.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			if (ev.dataTransfer.items[0].kind === "file") {
				var file = ev.dataTransfer.items[0].getAsFile();
				setActiveScreen(1);
				setImageUrl(URL.createObjectURL(file));
				const result = await uploadToServer(file);
				console.log(result);
				setUploadedImg(result.apiResp.display_url);
				setActiveScreen(2);
			}
		} else {
			console.log("file[0].name = " + ev.dataTransfer.files[0].name);
			const i = ev.dataTransfer.files[0];
			setActiveScreen(1);
			setImageUrl(URL.createObjectURL(i));
			const result = await uploadToServer(i);
			console.log(result);
			setUploadedImg(result.apiResp.display_url);
			setActiveScreen(2);
		}
	}
	function dragOverHandler(ev) {
		console.log("File(s) in drop zone");

		// Prevent default behavior (Prevent file from being opened)
		ev.preventDefault();
	}
	return (
		<div className={styles.container}>
			<Head>
				<title>Image Uploader</title>
				<meta name="description" content="Image file uploader" />
				<link rel="icon" href="/icon.png" />
			</Head>

			<main className={styles.main}>
				{activeScreen === 0 && (
					<Screen>
						<h1 className={styles.title}>Upload your image</h1>
						<p className={styles.label}>File should be Jpeg, Png,...</p>
						<div
							className={styles["figure-holder"]}
							id="drop_zone"
							onDrop={dropHandler}
							onDragOver={dragOverHandler}
						>
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
							<Progress />
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
								className={styles["uploaded-image"]}
								layout="fill"
							></Image>
						</div>
						<div className={styles["link-holder"]}>
							{showMsg && (
								<span className={styles["copied-msg"]}>Link copied!</span>
							)}
							<p className={styles["link-text"]}>{imageUrl}</p>
							<button className={styles["btn__copy"]} onClick={copyClipboard}>
								Copy Link
							</button>
						</div>
					</Screen>
				)}
			</main>
			<Footer />
		</div>
	);
}
export async function getStaticProps() {
	console.log(process.env);
	return {
		props: {
			data: "",
		},
	};
}
