import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { addAdminDefault } from "./src/user/user.controller.js"

config()
initServer()
addAdminDefault()