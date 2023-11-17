import config from "../../../../config";
import fs from 'fs';
import path from 'path';

// models that are a representation from the bungie API. 
import { BungieDestinyProfile } from "../models/bungieDestinyProfile";

// model that represent what we want to return to the front-end user.
import { CharacterProfile } from "../models/characterProfile";

const destinyInventoryItemDefinition = path.join(__dirname, "../../../../data/manifest/DestinyInventoryItemLiteDefinition.json");

// TODO: create a enum file to store all the enums.
enum ClassType {
    Titan = 0,
    Hunter = 1,
    Warlock = 2,
    Unknown = 3
}

class BungieDestinyProfileBuilder {

    private bungieDestinyProfile: BungieDestinyProfile;
    private characterProfile: CharacterProfile;

    constructor(bungieDestinyProfile: BungieDestinyProfile) {
        this.bungieDestinyProfile = bungieDestinyProfile;       
        this.characterProfile = { characters: [] };
    }

    setCharacters() {
        for(const key in this.bungieDestinyProfile.characters.data){

            const character = this.bungieDestinyProfile.characters.data[key];
            
            this.characterProfile.characters.push({
                characterClassName: ClassType[character.classType].toString(),
                characterEmblemPath: `${config.BUNGIE.URL_ROOT}${character.emblemPath}`,
                characterBackgroundPath: `${config.BUNGIE.URL_ROOT}${character.emblemBackgroundPath}`,
                characterId: character.characterId,
                equipmentsActive: []
            });
            
        }

        return this;
    }

    // TODO: refactor this method to be more readable and maintainable.
    setEquipment() {
        // we need to set all the equipment for each character.
        // and then we need to find the information about each equipment in the JSON file at data/manifest/DestinyInventoryItemDefinition.json
        const data = fs.readFileSync(destinyInventoryItemDefinition, 'utf-8');
        const jsonData = JSON.parse(data);

        // iterate throw my list of characters
        this.characterProfile.characters.map((character) => { 
            const characterEquipment = this.bungieDestinyProfile.characterEquipment.data[character.characterId];
            
            characterEquipment.items.map((equipment: any) => {
                const equipmentInfo = {
                    hash: jsonData[equipment.itemHash] ? jsonData[equipment.itemHash].hash : 0,
                    name: jsonData[equipment.itemHash] ? jsonData[equipment.itemHash].name : 'Unknown',
                    imagePath: jsonData[equipment.itemHash] ? `${config.BUNGIE.URL_ROOT}${jsonData[equipment.itemHash].imagePath}` : 'Unknown'
                };
                
                character.equipmentsActive.push(equipmentInfo);

            })
            
        
        });
               
        return this;

    }

    build(): CharacterProfile {
        return this.characterProfile;
    }
}

export default BungieDestinyProfileBuilder;