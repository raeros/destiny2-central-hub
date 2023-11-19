import express, { Router } from 'express';
import { BaseController } from '../../../core/interfaces/controllers/BaseController';
import RedditPostsService from '../../../core/domain/reddit/services/RedditPosts';
import RedditPostsController from '../controllers/RedditPostsController';

class RedditPostsRoutes {
    private router: Router;
    private redditPostControler: BaseController;

    constructor(redditPostsService: RedditPostsService) {
        this.router = express.Router();
        // This code means that the RedditPostsController will be instantiated with the redditPostsService.
        // Making a simple dependency injection.
        this.redditPostControler = RedditPostsController(redditPostsService);
        this.initializeRoutes();
    }

    private adaptRoute(controller: BaseController) {
        return (req: express.Request, res: express.Response) => {
            controller.handleRequest(req, res);
        }
    }

    private initializeRoutes() { 
        this.router.get('/reddit-posts', this.adaptRoute(this.redditPostControler));
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default RedditPostsRoutes;
