import { BungieCharacterProfile } from "./bungieCharacterProfile";

export interface BungieDestinyProfile {
    characterEquipment: BungieCharacterEquipement;
    characters: BungieCharacterProfileData;
}

type BungieCharacterProfileData = {
    data: {
        [key: string]: BungieCharacterProfile
    }
};

type BungieCharacterEquipmentData = {
    [key: string]: any
}

interface BungieCharacterEquipement {
    data: BungieCharacterEquipmentData; // this is a weird object coming from the Bungie API. For now, this will be an object<any>.
    privacy: number;
}