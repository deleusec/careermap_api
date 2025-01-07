import { Router } from "express";
import roadmapsRouter from './roadmaps.route'

const router = Router()

router.use('/roadmaps', roadmapsRouter)

export default router;