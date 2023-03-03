import { Router } from "express";
import { shortenedUrl } from "../controllers/shortenedUrlController.js";
import { shortenedUrlValidation } from "../middlewares/shortenValid.js";
import { authRoutesValidation } from "../middlewares/authUserValid.js";
import { getUrlsById } from "../controllers/getUrlsController.js";
import { redirectToUrl } from "../controllers/redirectUrlController.js";
import { deleteUrlValidation } from "../middlewares/deleteUrlValid.js";
import { deleteUrlById } from "../controllers/deleteUrlController.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', authRoutesValidation, shortenedUrlValidation, shortenedUrl);

urlRouter.get('/urls/:id', getUrlsById);
urlRouter.get('/urls/open/:shortUrl', redirectToUrl);



urlRouter.delete('/urls/:id', authRoutesValidation, deleteUrlValidation, deleteUrlById)

export default urlRouter;