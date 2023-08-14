import "dotenv/config";
import { app } from "./src/app";

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
	console.log(
		`🚀::Server connection successful  |  http://localhost:${PORT}`
	);
});
