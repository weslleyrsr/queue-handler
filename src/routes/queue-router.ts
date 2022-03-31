import express, { Request, Response } from 'express'
import KafkaHelper from '../helpers/kafka.js'
import SubscribeCallback from '../interfaces/subscribe-callback.js';

KafkaHelper.connect();

let topic: string;

if (process.env.KAFKA_TOPIC) {
	topic = process.env.KAFKA_TOPIC
} else {
	throw new Error("Environment variable KAFKA_TOPIC required to connect to the service")
}

let logMessage: SubscribeCallback = async (topic, partition, message, consumer, heartbeat) => {
	console.log(message.value?.toString())
	await consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }])
	await heartbeat()
	console.log('commited')
}

KafkaHelper.subscribe(
	topic,
	logMessage
)

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
})

router.post('/message/send', async (req: Request, res: Response) => {
	try {
		res.status(200).send(
			await KafkaHelper.sendMessage(topic, req.body.message)
		)
	} catch (error) {
		res.status(500).send(error)
	}
})

export default router