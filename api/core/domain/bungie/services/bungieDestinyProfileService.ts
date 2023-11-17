import { BaseService } from "../../../interfaces/services/BaseService";
import { BungieDestinyProfile } from "../models/bungieDestinyProfile";
import httpClient from '../../../utils/httpClient';
import { bungieConfig} from '../http/bungieConfig';
import BungieDestinyProfileBuilder from "../builders/bungieDestinyProfileBuilder";
import { CharacterProfile } from "../models/characterProfile";

class BungieDestinyProfileService implements BaseService<BungieDestinyProfile> {

    private bungieDestinyProfile!: BungieDestinyProfile;
    private bungieHttpClient: httpClient;

    constructor() {
        this.bungieHttpClient = new httpClient(bungieConfig);
    }

    execute(): BungieDestinyProfile {
        return this.bungieDestinyProfile;
    }

    async getProfile(membershipType: any, membershipId: any): Promise<CharacterProfile> {
        
        const bungieDestinyProfile = 
            await this.bungieHttpClient
                    .get(`/Destiny2/${membershipType}/Profile/${membershipId}/`)
                    .then((bungieData): BungieDestinyProfile => bungieData.Response);

        const character = 
            new BungieDestinyProfileBuilder(bungieDestinyProfile)
                    .setCharacters()
                    .setEquipment()
                    .build();

        return character;
        
    }


}

export default BungieDestinyProfileService;
