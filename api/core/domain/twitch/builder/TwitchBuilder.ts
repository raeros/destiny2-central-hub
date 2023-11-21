import { ITwitchLiveStreamers } from "../models/TwitchLiveStreamers";
import { ITwitchStreamerInformation } from "../models/TwitchStreamerInformation";
import { ITwitch } from "../models/Twitch";

class TwitchBuilder {

    private twitchLiveStreamers: ITwitchLiveStreamers[];
    private twitchStreamersInformation: ITwitchStreamerInformation[];
    private twitchList!: ITwitch[];

    constructor(twitchLiveStreamers: ITwitchLiveStreamers[], twitchStreamersInformation: ITwitchStreamerInformation[]){
        this.twitchLiveStreamers = twitchLiveStreamers;
        this.twitchStreamersInformation = twitchStreamersInformation;
        this.twitchList = [];
    }

    setStreamers() {
        this.twitchLiveStreamers.forEach((streamer: ITwitchLiveStreamers) => { 
            this.twitchList.push({
                gameName: streamer.game_name,
                userLogin: streamer.user_login,
                title: streamer.title,
                thumbnailUrl: streamer.thumbnail_url ? this.setThumbnailImageSize(streamer.thumbnail_url) : '',
                profilePictureUrl: '',
                type: streamer.type ? streamer.type : 'offline',
                idUser: streamer.user_id,
                userName: streamer.user_name,
                viewerCount: streamer.viewer_count
            });

        });

        return this;
    }

    setStreamersProfilePicture() {      
        this.twitchList.forEach((streamer: ITwitch) => {
            const streamerInformation = this.twitchStreamersInformation.find((streamerInformation: ITwitchStreamerInformation) => streamerInformation.id == streamer.idUser);
            streamer.profilePictureUrl = streamerInformation && streamerInformation.profile_image_url ? streamerInformation.profile_image_url : '';
        });

        return this;

    }

    checkIfCuratedStreamerAreOffline(params: any) {
        if(Array.isArray(params['login'])) {
            params['login'].forEach((streamerName: string) => {            
                const streamer = this.findStreamerByLogin(streamerName);
                if(!streamer) {
                    this.addOfflineStreamer(streamerName);
                }
            });
        } else {                    
            const streamer = this.findStreamerByLogin(params['login']);
            if(!streamer) {
                this.addOfflineStreamer(params['login']);
            }
        }
       
        return this;
    }
    
    private findStreamerByLogin(streamerName: string): ITwitch | undefined {
        return this.twitchList.find((streamer: ITwitch) => streamer.userLogin == streamerName);
    }
    
    private addOfflineStreamer(streamerName: string) {
        const streamerInformation = this.findStreamerInformationByDisplayName(streamerName);
        const streamerOffline = this.createOfflineStreamer(streamerName, streamerInformation);
        this.twitchList.push(streamerOffline);
    }
    
    private findStreamerInformationByDisplayName(streamerName: string): ITwitchStreamerInformation | undefined {
        return this.twitchStreamersInformation.find((streamerInformation: ITwitchStreamerInformation) => streamerInformation.display_name.toLocaleLowerCase() == streamerName);
    }
    
    private createOfflineStreamer(streamerName: string, streamerInformation?: ITwitchStreamerInformation): ITwitch {
        return {
            gameName: streamerInformation?.display_name || '',
            userLogin: streamerName,
            title: '',
            thumbnailUrl: streamerInformation?.offline_image_url || '',
            profilePictureUrl: streamerInformation?.profile_image_url || '',
            type: 'offline',
            idUser: streamerInformation?.id || '',
            userName: streamerName,
            viewerCount: 0
        };
    }   

    private setThumbnailImageSize(imageUrl: string) {
        return imageUrl.replace('{width}x{height}', '440x248');
    }

    build(): ITwitch[] {
        return this.twitchList;
    }
    
}

export default TwitchBuilder;