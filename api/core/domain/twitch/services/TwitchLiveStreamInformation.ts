import httpClient, { httpClientConfig } from "../../../utils/httpClient";
import { ITwitchLiveStreamers } from "../models/TwitchLiveStreamers";
import { ITwitchStreamerInformation } from "../models/TwitchStreamerInformation";

class TwitchStreamerInformation {

    private twitchHttpHelper: httpClient;

    constructor(twitchConfig: httpClientConfig) {
        this.twitchHttpHelper = new httpClient(twitchConfig);
    }

    async getStreamersInformation(twitchLiveStreamers: ITwitchLiveStreamers[]): Promise<ITwitchStreamerInformation[]> {
        const twitchStreamersListLoginNames = twitchLiveStreamers.map((streamer: ITwitchLiveStreamers) => `login=${streamer.user_login}`).join('&');
        return await this.getStreamersUserInformation(twitchStreamersListLoginNames);
    }

    async getStreamersUserInformation(streamersUserLoginNames: string) {

        const twitchStreamersListInformation = await this.twitchHttpHelper.get(`/users?${streamersUserLoginNames}`);
        this.setDefaultParams();

        return twitchStreamersListInformation;

    }

    private setParams(params: any) {
        this.twitchHttpHelper.setParams(params);
        return this;
    }

    private setDefaultParams() {
        this.twitchHttpHelper.setParams({});
        return this;
    }
}

export default TwitchStreamerInformation;