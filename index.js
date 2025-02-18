import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { addAdminDefault } from "./src/user/user.controller.js"
import { addCategoryDefault } from "./src/category/category.controller.js"

config()
initServer()
addAdminDefault()
addCategoryDefault()