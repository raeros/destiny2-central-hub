import express, { Router } from 'express';
import { BaseController } from '../../../core/interfaces/controllers/BaseController';
import BungieDestinyProfileController from '../controllers/bungieDestinyProfileController';
import BungieDestinyProfileService from '../../../core/domain/bungie/services/bungieDestinyProfileService';

class BungieDestinyProfileRoutes {
    private router: Router;
    private bungieDestinyProfileController: BaseController;

    constructor(bungieDestinyProfileService: BungieDestinyProfileService) {
        this.router = express.Router();
        // This code means that the BungieDestinyProfileController will be instantiated with the BungieDestinyProfileService.
        // Making a simple dependency injection.
        this.bungieDestinyProfileController = BungieDestinyProfileController(bungieDestinyProfileService);
        this.initializeRoutes();
    }

    private adaptRoute(controller: BaseController) {
        return (req: express.Request, res: express.Response) => {
            controller.handleRequest(req, res);
        }
    }

    private initializeRoutes() { 
        this.router.get('/destiny-profile', this.adaptRoute(this.bungieDestinyProfileController));
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default BungieDestinyProfileRoutes;