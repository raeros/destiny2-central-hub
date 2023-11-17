import { Request, Response } from 'express';
import { BaseController } from '../../../core/interfaces/controllers/BaseController';
import TwitchLiveStreamsService from '../../../core/domain/twitch/services/TwitchLiveStreams';

class TwitchLiveStreamsController implements BaseController {
    
    constructor(private twitchLiveStreamService: TwitchLiveStreamsService){}

    // this is a abstract method. Maybe we need in the future create a new method. For now this is enough.
    async handleRequest(req: Request, res: Response): Promise<void> {
       try {
            
            const twitchLiveStreamTopFive = await this.twitchLiveStreamService.getTopFive();

            res.json(twitchLiveStreamTopFive);
       } catch (error) {
              console.log(error);
              res.status(500).send('An error ocurred while processing this request.');   
       }
    }
}

export default (twitchLiveStreamService: TwitchLiveStreamsService) =>  new TwitchLiveStreamsController(twitchLiveStreamService);