// load env file for the environment we are running in.
import path from 'path';
import { config as configDotEnv } from 'dotenv';
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;  
const fullPath = path.resolve(process.cwd(), envFile);
configDotEnv({ path: fullPath });

// imports
import express, { Application } from 'express';
import cors from 'cors';
import config from './config/index';
import { httpClientConfig } from './core/utils/httpClient';

// bungie imports
import BungieDestinyProfileService from './core/domain/bungie/services/bungieDestinyProfileService';
import BungieDestinyProfileRoutes from './modules/bungie/routes/bungieDestinyProfileRoutes';

// twitch imports
import TwitchLiveStreamsService from './core/domain/twitch/services/TwitchLiveStreams';
import TwitchLiveStreamCuratedService from './core/domain/twitch/services/TwitchLiveStreamCurated';
import TwitchLiveStreamsRoutes from './modules/twitch/routes/TwitchLiveStreamsRoutes';
import TwitchLiveStreamsCuratedRoutes from './modules/twitch/routes/TwitchLiveStreamsCuratedRoutes';
import { TwitchConfig } from './core/domain/twitch/http/twitchConfig';

// reddit imports
import RedditPostsService from './core/domain/reddit/services/RedditPosts';
import RedditPostsRoutes from './modules/reddit/routes/RedditPostsRoutes';
import { RedditConfig } from './core/domain/reddit/http/redditConfig';


class App {
    private app: Application;
    // bungie
    private bungieDestinyProfileService!: BungieDestinyProfileService; // ! post-fix expression to tell TypeScript that this property will be definitely assigned a value before it's used
    private bungieDestinyProfileRoutes!: BungieDestinyProfileRoutes; // ! post-fix expression to tell TypeScript that this property will be definitely assigned a value before it's used
    // twitch
    private twitchLiveStreamsService!: TwitchLiveStreamsService; // ! post-fix expression to tell TypeScript that this property will be definitely assigned a value before it's used
    private twitchLiveStreamsRoutes!: TwitchLiveStreamsRoutes; // ! post-fix expression to tell TypeScript that this property will be definitely assigned a value before it's used
    private twitchLiveStreamsCuratedRoutes!: TwitchLiveStreamsCuratedRoutes; // ! post-fix expression to tell TypeScript that this property will be definitely assigned a value before it's used
    private twitchLiveStreamCuratedService!: TwitchLiveStreamCuratedService; // ! post-fix expression to tell TypeScript that this property will be definitely assigned a value before it's used
    private twitchConfig!: httpClientConfig; // ! post-fix expression to tell TypeScript that this property will be definitely assigned a value before it's used
    // reddit
    private redditPostsService!: RedditPostsService; // ! post-fix expression to tell TypeScript that this property will be definitely assigned a value before it's used
    private redditPostsRoutes!: RedditPostsRoutes; // ! post-fix expression to tell TypeScript that this property will be definitely assigned a value before it's used
    private redditConfig!: httpClientConfig; // ! post-fix expression to tell TypeScript that this property will be definitely assigned a value before it's used

    constructor() {
        this.app = express();
        this.config();
        this.setHttpConfigServices();
        this.dependencyInjectionServices();
        this.routes();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));    
        this.app.use(cors());    
    }

    private setHttpConfigServices(): void {
        // TODO: make config for bungie http.
        this.twitchConfig = TwitchConfig;
        this.redditConfig = RedditConfig
    }

    private dependencyInjectionServices(): void {
        // bungie
        this.bungieDestinyProfileService = new BungieDestinyProfileService(); // TODO: change this code to use a bungie http config.
        this.bungieDestinyProfileRoutes = new BungieDestinyProfileRoutes(this.bungieDestinyProfileService);
        // twitch top five
        this.twitchLiveStreamsService = new TwitchLiveStreamsService(this.twitchConfig);
        this.twitchLiveStreamsRoutes = new TwitchLiveStreamsRoutes(this.twitchLiveStreamsService);
        // twitch curated
        this.twitchLiveStreamCuratedService = new TwitchLiveStreamCuratedService(this.twitchConfig);
        this.twitchLiveStreamsCuratedRoutes = new TwitchLiveStreamsCuratedRoutes(this.twitchLiveStreamCuratedService);
        // reddit
        this.redditPostsService = new RedditPostsService(this.redditConfig);
        this.redditPostsRoutes = new RedditPostsRoutes(this.redditPostsService);

    }

    private routes(): void {
        // TODO: we will need to move this config to a new file. For the "/api" having more than one route.
        // bungie info
        this.app.use("/api", this.bungieDestinyProfileRoutes.getRouter());
        // twitch top-five list
        this.app.use("/api", this.twitchLiveStreamsRoutes.getRouter());
        // twitch curated list
        this.app.use("/api", this.twitchLiveStreamsCuratedRoutes.getRouter());
        // reddit 
        this.app.use('/api', this.redditPostsRoutes.getRouter());
    }

    public start(port: string | number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

const app = new App();
const PORT = config.SERVER.PORT;

app.start(PORT);