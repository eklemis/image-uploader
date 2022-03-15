import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
import { nanoid } from "nanoid";

var mv = require("mv");

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	console.log("Request received!");
	const data = await new Promise((resolve, reject) => {
		const form = new IncomingForm();

		form.parse(req, (err, fields, files) => {
			if (err) return reject(err);
			console.log(fields, files);
			console.log(files.file.filepath);
			const oldPath = files.file.filepath;
			console.log(`Old path: ${oldPath}`);
			const ext = files.file.originalFilename.split(".").pop();
			const newFileName = nanoid() + "." + ext;
			const newPath = `./public/uploads/${newFileName}`;
			console.log(`new path:${newPath}`);
			const newUrl = "/uploads/" + newFileName;
			mv(oldPath, newPath, function (err) {});
			res.status(200).json({ message: "success", fileUrl: newUrl });
		});
	});
}
