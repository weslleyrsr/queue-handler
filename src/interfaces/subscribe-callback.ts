import { Consumer, KafkaMessage } from 'kafkajs'


export default interface SubscribeCallback {
    (topic: string, partition: number, message: KafkaMessage, consumer: Consumer, heartbeat: () => Promise<void> ): any;
}