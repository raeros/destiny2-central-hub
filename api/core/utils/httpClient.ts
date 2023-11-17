import axios from 'axios';

export interface httpClientConfig {
    baseURL: string;
    timeout: number;
    headers: any;
    params: any;
}

export default class httpClient { 
    private config: httpClientConfig;

    constructor(config: httpClientConfig) {
        this.config = config;
    }

    public async get(url: string): Promise<any> {
        const response = await axios.get(url, this.config);
        // twitch api returns the data inside the data property. lol
        if(response.data.data){
            return response.data.data;
        } else {
            // bungie api returns the data inside the Response property. lol
            return response.data;
        }
    }

    public setParams(params: any){
        this.config.params = params;
    }
}