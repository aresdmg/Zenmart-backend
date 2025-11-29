import app from "./app";
import connectDB from "./database";
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