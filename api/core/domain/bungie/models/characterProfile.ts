interface EquipmentActive {
    hash: string;
    name: string;
    imagePath: string;
}

interface Character {
    characterClassName: string;
    characterEmblemPath: string;
    characterBackgroundPath: string;
    characterId: string;
    equipmentsActive: EquipmentActive[]
}

export interface CharacterProfile {
    characters: Character[]
}