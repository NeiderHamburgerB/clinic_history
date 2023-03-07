import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'

@Injectable()
export class SnsService {

    private sns: AWS.SNS

    constructor(private readonly configuration: ConfigService) {
        this.sns = this.setup()
    }

    private setup = () => {
        return new AWS.SNS({
            accessKeyId: this.configuration.get<string>('AWS_ACCESS'),
            secretAccessKey: this.configuration.get<string>('AWS_SECRET'),
            region: 'us-east-1'
        })
    }

    send = async (Message: string, PhoneNumber: string): Promise<string> => {
        let { MessageId } = await this.sns.publish({ Message, PhoneNumber }).promise()
        return Promise.resolve(MessageId)
        
    }

}
