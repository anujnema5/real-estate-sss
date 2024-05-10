import { Router } from "express";
import { getSomething } from "./dev.services";

const router: Router = Router();

router.get('/', getSomething)

export default router.use('/dev', router)