import {Pool} from "pg"
import "dotenv/config"

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "hans",
    port: 5432,
    max: 10, // Adjust as needed
    idleTimeoutMillis: 30000, // Close idle connections after 30s
})

export default pool