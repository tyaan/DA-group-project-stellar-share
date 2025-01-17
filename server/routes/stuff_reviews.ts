import { Router } from 'express'
import * as db from '../db/stuff_reviews'


const router = Router()

// Routes for stuff reviews go here

router.get('/:stuffId', async (req, res) => {

  const stuffId = Number(req.params.stuffId)

  try {
    const stuffReviews = await db.getReviewsByStuffId(stuffId)
    res.json(stuffReviews)
  } catch (err) {
    console.error('Error fetching reviews:', err)
    res.sendStatus(500)
  }
})

router.get('/user/:userId', async (req, res) => {

  const userId = Number(req.params.userId)

  try {
    const stuffReviews = await db.getAllReviewsOnUserStuff(userId)
    res.json(stuffReviews)
  } catch (err) {
    console.error('Error fetching reviews:', err)
    res.sendStatus(500)
  }
})


router.post('/', async (req, res) => {

    try {
        const newReview = await db.createStuffReview(req.body)
        res.status(201).json({
            message: 'New Stuff Review created',
            ...newReview
          });

    } catch (error) {

        console.error('Error creating record:', error);
        res.status(500).json({ error: 'Failed to create record' })
    }
})

export default router

