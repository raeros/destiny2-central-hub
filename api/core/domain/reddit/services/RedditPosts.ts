import httpClient, { httpClientConfig } from "../../../utils/httpClient";
import { RedditPost, RedditPostContent } from "../models/RedditPost";
import RedditPostBuilder from "../builders/RedditPostBuilder";

interface PostContentType {
    contentType: string;
    t: string; // filter by time in case of top posts
}

class RedditPostsService {

    private redditConfig: httpClientConfig;
    private redditHttpHelper: httpClient;
    private redditContentTypeConfig: PostContentType;

    constructor(redditConfig: httpClientConfig){
        this.redditConfig = redditConfig;
        this.redditHttpHelper = new httpClient(this.redditConfig);
        this.redditContentTypeConfig = {
            contentType: "",
            t: ""
        };
    }

    async getPostsByContentType(typeConfig: PostContentType): Promise<RedditPostContent[]>{

        this.redditContentTypeConfig = typeConfig;

        this.setCustomParams({
            "g": "GLOBAL",
            "limit": 5
        });

        const redditHotPosts: RedditPost = await this.getPosts();
        const redditHotPostsBuilded: RedditPostContent[] = new RedditPostBuilder(redditHotPosts).setPostsContent(this.redditContentTypeConfig).build();

        return redditHotPostsBuilded;
    }

    private async getPosts(): Promise<RedditPost>{
            const redditHotPosts = await this.redditHttpHelper.get(`/r/destinythegame/${this.redditContentTypeConfig.contentType}.json`);
            return redditHotPosts;
    }

    private setCustomParams(params: any){
        if(this.checkIfContentTypeIsTopAndHasTimeParam()){
            params.t = this.redditContentTypeConfig.t == "" ? "all" : this.redditContentTypeConfig.t;
            console.log("content type of reddit posts: top", params);
        }
        this.redditConfig.params = params;
        return this;
    }

    private checkIfContentTypeIsTopAndHasTimeParam(): boolean {
        return this.redditContentTypeConfig.contentType == "top";
    }

}

export default RedditPostsService;
