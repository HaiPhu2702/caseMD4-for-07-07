import { Request, Response, Router } from "express";
import tagController from "../controller/tag-controller";

export const tagRoute = Router();
tagRoute.get('', tagController.getAll)
// tagRoute.get('/delete', (req : Request, res : Response) => {console.log('bug')});
tagRoute.post('/delete', tagController.deleteTag);