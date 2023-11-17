import { Request, Response } from 'express';
import { BaseController } from '../../../core/interfaces/controllers/BaseController';
import TwitchLiveStreamCuratedService from '../../../core/domain/twitch/services/TwitchLiveStreamCurated';

class TwitchLiveStreamsCuratedController implements BaseController {
    
    constructor(private twitchLiveStreamCuratedService: TwitchLiveStreamCuratedService){}

    // this is a abstract method. Maybe we need in the future create a new method. For now this is enough.
    async handleRequest(req: Request, res: Response): Promise<void> {
       try {
            const query = req.query;
            const twitchLiveStreamCurated = await this.twitchLiveStreamCuratedService.getList(query);

            res.json(twitchLiveStreamCurated);
       } catch (error) {
              console.log(error);
              res.status(500).send('An error ocurred while processing this request.');   
       }
    }
}

export default (twitchLiveStreamCuratedService: TwitchLiveStreamCuratedService) =>  new TwitchLiveStreamsCuratedController(twitchLiveStreamCuratedService);