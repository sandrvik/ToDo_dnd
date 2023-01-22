import {Router, Response, Request} from "express";

const router: Router = Router();

const testMessage = "Server response";

const getTest = (req: Request, res: Response) => {
    try {
        res.status(200).json(testMessage);
    } catch (error) {
        throw error;
    }
}

router.get('/', getTest);

export default router;