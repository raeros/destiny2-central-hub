import { BungieProfile } from "../models/bungieProfile";
//import { BaseService } from '../../../interfaces/services/BaseService';


class BungieProfileService {
    getBungieProfile(membershipType: number, membershipId: string): BungieProfile {

        const bungieProfile: BungieProfile = { profiles: [] }; // mock data for return

        // make a request to the bungie.net api
        // returning a bungieProfile for whoever requested
        
        return bungieProfile;
    }
}