import {Router, Response, Request} from "express";
import {getContainers, addContainer} from "../controllers/todos";

const router: Router = Router();

router.get('/', getContainers);
router.post('/', addContainer);

export default router;