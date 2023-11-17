import express, { Router } from 'express';
import { BaseController } from '../../../core/interfaces/controllers/BaseController';
import TwitchLiveStreamCuratedController from '../controllers/TwitchLiveStreamsCuratedController';
import TwitchLiveStreamCuratedService from '../../../core/domain/twitch/services/TwitchLiveStreamCurated';

class TwitchLiveStreamsCuratedRoutes {
    private router: Router;
    private twitchLiveStreamCuratedController: BaseController;

    constructor(twitchLiveStreamCuratedService: TwitchLiveStreamCuratedService) {
        this.router = express.Router();
        this.twitchLiveStreamCuratedController = TwitchLiveStreamCuratedController(twitchLiveStreamCuratedService);
        this.initializeRoutes();
    }

    private adaptRoute(controller: BaseController) {
        return (req: express.Request, res: express.Response) => {
            controller.handleRequest(req, res);
        }
    }

    private initializeRoutes() { 
        this.router.get('/twitch-curated', this.adaptRoute(this.twitchLiveStreamCuratedController));
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default TwitchLiveStreamsCuratedRoutes;