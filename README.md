# queue-handler

I created this app as a study case on how to interact with an Apache Kafka queue with NodeJs and TypeScript

## Run locally
### Requirements
- Docker and docker compose
- NodeJs v14.17.6 or newer

### Kafka setup
- On the root directory run `docker-compose up -d` to start both `Zookeper` and `Kafka` containers.

### Install dependencies
- Run `npm i` command

### Build and start
- Run `npm run start` command
> This is recommended for development only

### Build
- Run `npm run build` or `tsc` to compile the TypeScript files into JavaScript at `/dist` directory
> You can configure your output JavaScript version, direction and other configs at the `tsconfig` file

### Serve
- Run `npm run server` or `node dist/app.js` to launch the server, **Build** step required.

## Environment setup
Create a `.env` file and set your variables:
- `PORT` - **required**
- `KAFKA_CLIENT_ID` - **required**
- `KAFKA_BROKERS` - **required**
- `KAFKA_TOPIC` - **required**