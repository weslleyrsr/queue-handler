import { Kafka, Producer, RecordMetadata } from 'kafkajs'
let kafka: Kafka,
    producer: Producer,
    clientId: string,
    brokers: string[]

const KafkaHelper = {
    connect: () => {
        if (process.env.KAFKA_BROKERS) {
            brokers = process.env.KAFKA_BROKERS.split(",");
        } else {
            throw new Error("Environment variable KAFKA_BROKERS required to connect to the service")
        }
        
        if (process.env.KAFKA_CLIENT_ID) {
            clientId = process.env.KAFKA_CLIENT_ID
        } else {
            throw new Error("Environment variable KAFKA_CLIENT_ID required to connect to the service")
        }

        kafka = new Kafka({
            clientId: clientId,
            brokers: brokers,
        })

        producer = kafka.producer()
    },
    sendMessage: async function(topic: string, message: string): Promise<string> {
        await producer.connect()
    
        await producer.send({
            topic: topic,
            messages: [
              { value: message },
            ],
        })

        await producer.disconnect()
    
        return 'Message successfully posted'
    }
}

export default KafkaHelper