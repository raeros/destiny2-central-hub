import httpClient from "../../../utils/httpClient";
import { httpClientConfig } from "../../../utils/httpClient";
import TwitchBuilder from "../builder/TwitchBuilder";
import { ITwitch } from "../models/Twitch";
import { ITwitchLiveStreamers } from "../models/TwitchLiveStreamers";
import { ITwitchStreamerInformation } from "../models/TwitchStreamerInformation";
import TwitchStreamerInformation from "./TwitchLiveStreamInformation";

class TwitchLiveStreams {

    private twitchHttpHelper: httpClient;
    private twitchConfig: httpClientConfig;

    constructor(twitchConfig: httpClientConfig) {
        this.twitchConfig = twitchConfig;
        this.twitchHttpHelper = new httpClient(this.twitchConfig);
    }

    async getTopFive(): Promise<ITwitch[]> {

        this.setCustomParams({
            "game_id": '497057',
            "type": 'live',
            "first": '5'
        });

        const twitchStreamersList: ITwitchLiveStreamers[] = await this.getTwitchStreamersList();
        const streamersInformation: ITwitchStreamerInformation[] = await this.getStreamersUserInformation(twitchStreamersList);
        const buildTwitchTopFive: ITwitch[] = this.buildTwitchTopFive(twitchStreamersList, streamersInformation);

        this.setDefaultParams();

        return buildTwitchTopFive;

    }

    private async getStreamersUserInformation(twitchStreamersList: ITwitchLiveStreamers[]): Promise<ITwitchStreamerInformation[]> {
        const twitchLiveStreamInformationervice = new TwitchStreamerInformation(this.twitchConfig);
        return twitchLiveStreamInformationervice.getStreamersInformation(twitchStreamersList);
    }

    private async getTwitchStreamersList(): Promise<ITwitchLiveStreamers[]> {
        const twitchStreamersList: ITwitchLiveStreamers[] = await this.twitchHttpHelper.get('/streams');
        return twitchStreamersList;
    }

    private buildTwitchTopFive(twitchStreamersList: ITwitchLiveStreamers[], streamersInformation: ITwitchStreamerInformation[]): ITwitch[] {
        const topFiveStreamers: ITwitch[] = new TwitchBuilder(twitchStreamersList, streamersInformation)
                                                    .setStreamers()
                                                    .setStreamersProfilePicture()
                                                    .build();
        return topFiveStreamers;
    }


    private setCustomParams(params: any) {
        this.twitchHttpHelper.setParams(params);
        return this;
    }

    private setDefaultParams() {
        this.twitchHttpHelper.setParams({});
        return this;
    }
}

export default TwitchLiveStreams;
