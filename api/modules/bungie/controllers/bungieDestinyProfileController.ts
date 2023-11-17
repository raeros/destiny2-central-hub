import { Request, Response } from 'express';
import { BaseController } from '../../../core/interfaces/controllers/BaseController';
import BungieDestinyProfileService from '../../../core/domain/bungie/services/bungieDestinyProfileService';
import { CharacterProfile } from '../../../core/domain/bungie/models/characterProfile';

class BungieDestinyProfileController implements BaseController {
    
    constructor(private bungieDestinyProfileService: BungieDestinyProfileService){}

    async handleRequest(req: Request, res: Response): Promise<void> {
       try {
            const { membershipType, membershipId } = { membershipType: 3, membershipId: "4611686018471675616"};
            
            const bungieDestinyProfile: CharacterProfile = await this.bungieDestinyProfileService.getProfile(membershipType, membershipId);

            res.json(bungieDestinyProfile);
       } catch (error) {
              console.log(error);
              res.status(500).send('An error ocurred while processing this request.');   
       }
    }
}

export default (bungieDestinyProfileService: BungieDestinyProfileService) =>  new BungieDestinyProfileController(bungieDestinyProfileService);