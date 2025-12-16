import app from "./app.js";
import connectDB from "./database/index.js";
import dotenv from "dotenv"

const PORT = process.env.PORT ?? 5000

dotenv.config({
    path: "./.env",
})

connectDB()
    .then(() => app.listen(PORT, () => console.log(`SERVER: ${PORT}`)))
    .catch((error) => {
        console.log(`Server failed | Error: ${error}`);
    })