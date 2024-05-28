import { Router } from "express";
import { getSomething } from "./dev.services";
import { rateLimiter } from "@/middlewares/redis.middleware";
import { use } from "@/utils/responses/api.use";

const router: Router = Router();

router.get('/', getSomething)

export default router;