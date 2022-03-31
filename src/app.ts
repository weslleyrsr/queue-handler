import dotenv from 'dotenv'
dotenv.config()

import express, { Express, Request, Response } from 'express'
import KafkaHelper from './helpers/kafka.js'
import bodyParser from 'body-parser'

KafkaHelper.connect();

const app: Express = express()
const port = process.env.PORT


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
})

app.post('/message/send', async (req: Request, res: Response) => {
	try {
		res.status(200).send(
			await KafkaHelper.sendMessage(req.body.topic, req.body.message)
		)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})