import express, { Request, Response } from 'express'
import KafkaHelper from '../helpers/kafka.js'
KafkaHelper.connect();

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
})

router.post('/message/send', async (req: Request, res: Response) => {
	try {
		res.status(200).send(
			await KafkaHelper.sendMessage(req.body.topic, req.body.message)
		)
	} catch (error) {
		res.status(500).send(error)
	}
})

export default router