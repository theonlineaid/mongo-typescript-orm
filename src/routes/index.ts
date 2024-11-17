import { Router } from "express";
import AuthRouter from "./AuthRouter";


const RootRouter = Router();

RootRouter.use("/auth", AuthRouter)

export default RootRouter;