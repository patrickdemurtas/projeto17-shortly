import { Router } from "express";
import { shortenedUrl } from "../controllers/shortenedUrlController.js";
import { shortenedUrlValidation } from "../middlewares/shortenValid.js";
import { authRoutesValidation } from "../middlewares/authUserValid.js";
import { getUrlsById } from "../controllers/getUrlsController.js";
import { redirectToUrl } from "../controllers/redirectUrl.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', authRoutesValidation, shortenedUrlValidation, shortenedUrl);

urlRouter.get('/urls/:id', getUrlsById);
urlRouter.get('/urls/open/:shortUrl', redirectToUrl);

export default urlRouter;