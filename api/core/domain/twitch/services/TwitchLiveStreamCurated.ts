import httpClient, { httpClientConfig } from "../../../utils/httpClient";
import TwitchBuilder from "../builder/TwitchBuilder";
import { ITwitch } from "../models/Twitch";
import { ITwitchLiveStreamers } from "../models/TwitchLiveStreamers";
import { ITwitchStreamerInformation } from "../models/TwitchStreamerInformation";
import TwitchStreamerInformation from "./TwitchLiveStreamInformation";

class TwitchLiveStreamCurated {

    private twitchConfig: httpClientConfig;
    private twitchHttpHelper: httpClient;

    constructor(twitchConfig: httpClientConfig) {
        this.twitchConfig = twitchConfig;
        this.twitchHttpHelper = new httpClient(this.twitchConfig);
    }

    async getList(query: object): Promise<ITwitch[]> {
        // set custom query for login parameter.
        const streamersLoginNames = this.setQueryString(query, 'login');
        // get information about the streamers
        const twitchLiveStreamCuratedList: ITwitchStreamerInformation[] = await this.getStreamersUserInformation(streamersLoginNames);

        // set params for the request. Only returning live streams and only the first 5.
        this.setCustomParams({
            "first": 5,
            "type": 'live'
        });

        // set custom query for 'user_login' parameter.
        const streamersUserLoginNames = this.setQueryString(query, 'user_login');
        const twitchStreamersList: ITwitchLiveStreamers[] = await this.getTwitchStreamersList(streamersUserLoginNames);
        const twitchLiveStreamCuratedListBuilded = this.buildTwitchList(twitchStreamersList, twitchLiveStreamCuratedList, query);

        return twitchLiveStreamCuratedListBuilded;
        
    }

    private async getStreamersUserInformation(streamersLoginNames: string): Promise<ITwitchStreamerInformation[]>{
        const twitchLiveStreamInformationervice = new TwitchStreamerInformation(this.twitchConfig);
        const twitchLiveStreamCuratedList: ITwitchStreamerInformation[] = await twitchLiveStreamInformationervice.getStreamersUserInformation(streamersLoginNames);
        return twitchLiveStreamCuratedList;
    }

    private async getTwitchStreamersList(streamersUserLoginNames: string): Promise<ITwitchLiveStreamers[]> {
        const twitchStreamersList: ITwitchLiveStreamers[] = await this.twitchHttpHelper.get(`/streams?${streamersUserLoginNames}`);
        return twitchStreamersList;
    };

    private buildTwitchList(twitchStreamersList: ITwitchLiveStreamers[], twitchLiveStreamCuratedList: ITwitchStreamerInformation[], query: object): ITwitch[] {
        const twitchLiveStreamCuratedListBuilded: ITwitch[] = new TwitchBuilder(twitchStreamersList, twitchLiveStreamCuratedList)
                                                                    .setStreamers()
                                                                    .setStreamersProfilePicture()
                                                                    .checkIfCuratedStreamerAreOffline(query)
                                                                    .build();

        return twitchLiveStreamCuratedListBuilded;
    }

    private setCustomParams(params: any) {
        this.twitchHttpHelper.setParams(params);
        return this;
    }

    private setQueryString(query: object, type: string) {
        let streamersUserLoginNamesQuery: any = query;
        if(Array.isArray(streamersUserLoginNamesQuery['login'])){
            streamersUserLoginNamesQuery = streamersUserLoginNamesQuery['login'].map((streamer: string) => `${type}=${streamer}`).join('&');
        } else {
            streamersUserLoginNamesQuery = `${type}=${streamersUserLoginNamesQuery.login}`;
        }

        return streamersUserLoginNamesQuery.toLocaleLowerCase();
    }
}

export default TwitchLiveStreamCurated;
