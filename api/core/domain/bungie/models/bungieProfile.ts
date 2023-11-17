// When we authorize the website to use our bungie credentials we'll get a few information to use.
// more specifically, we will get our membershipType and also our bungie profileId.
// with this information we can check if the bungie account has a Destiny profile linked.
// Now, we will return a fixed membershipType and bungie profile (my in this case) to get things working properly.


// we are going to use env to set this values without leaking
export interface BungieProfile {
    profiles: LinkedProfile[];
    // there is other information that comes from the api but we wont need them.
}

interface LinkedProfile {
    dateLastPlayed: string;
    isOverridden: boolean;
    isCrossSavePrimary: boolean;
    crossSaveOverride: number;
    // not using the information in the field applicabvleMembershipTypes.. for now..
    isPublic: boolean;
    membershipType: number;
    membershipId: string;   
    displayName: string;
    bungieGlobalDisplayName: string;
    bungieGlobalDisplayNameCode: number;
}