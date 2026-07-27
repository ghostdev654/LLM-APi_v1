import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import chatRouter from "./chat.js";
import completionRouter from "./completion.js";
import embeddingsRouter from "./embeddings.js";
import adminRouter from "./admin.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(completionRouter);
router.use(embeddingsRouter);
router.use(adminRouter);

export default router;
