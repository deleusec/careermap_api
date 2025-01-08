import { Router } from "express";
import entitiesRouter from './entities.route'
import categoriesRouter from './categories.route'
import roadmapsRouter from './roadmaps.route'

const router = Router()

router.use('/entities', entitiesRouter)
router.use('/categories', categoriesRouter)
router.use('/roadmaps', roadmapsRouter)

export default router;
