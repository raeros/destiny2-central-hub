import express, { Router } from 'express';
import { BaseController } from '../../../core/interfaces/controllers/BaseController';
import TwitchLiveStreamsController from '../controllers/TwitchLiveStreamsController';
import TwitchLiveStreamsService from '../../../core/domain/twitch/services/TwitchLiveStreams';

class TwitchLiveStreamsRoutes {
    private router: Router;
    private twitchLiveStreamsController: BaseController;

    constructor(twitchLiveStreamsService: TwitchLiveStreamsService) {
        this.router = express.Router();
        this.twitchLiveStreamsController = TwitchLiveStreamsController(twitchLiveStreamsService);
        this.initializeRoutes();
    }

    private adaptRoute(controller: BaseController) {
        return (req: express.Request, res: express.Response) => {
            controller.handleRequest(req, res);
        }
    }

    private initializeRoutes() { 
        this.router.get('/twitch-top-five', this.adaptRoute(this.twitchLiveStreamsController));
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default TwitchLiveStreamsRoutes;