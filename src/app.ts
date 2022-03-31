import dotenv from 'dotenv'
dotenv.config()

import express, { Express } from 'express'
import bodyParser from 'body-parser'
import QueueRouter from './routes/queue-router'

const app: Express = express()
const port = process.env.PORT


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(QueueRouter)

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})