import { Router } from "express";

const router : Router = Router()

router.get('/:propertyId') // GET ALL REVIEW
router.post('/:propertyId/add') // Add Review to property
router.delete('/:propertyId/delete') // DELETE REVIEW VIA PROPERTY ID
router.patch('/:propertyId') // EDIT YOUR REVIEW

export default router;