import { Router } from "express";
import { createdPublicationValidator, deletePublicationValidator, updatePublicationValidator } from "../middlewares/publication.validators.js";
import { addPublication, deletePublication, getPublication, updatePublication } from "./publication.controller.js";

const router = Router()

router.post("/addPublication", createdPublicationValidator, addPublication)
router.get("/", getPublication)
router.put("/updatePublication/:uid", updatePublicationValidator, updatePublication)
router.delete("/deletePublication/:uid", deletePublicationValidator, deletePublication)

export default router;