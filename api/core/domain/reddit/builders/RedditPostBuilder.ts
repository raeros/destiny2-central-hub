import { RedditPost, RedditPostContent } from "../models/RedditPost";

interface PostContentType {
    contentType: string;
    t: string; // filter by time in case of top posts
}

class RedditPostBuilder {

    private redditPosts: RedditPost;
    private redditPostsList: RedditPostContent[];

    constructor(redditPosts: RedditPost){
        this.redditPosts = redditPosts;
        this.redditPostsList = [];
    }

    setPostsContent(contentTypeConfig: PostContentType){
        this.redditPosts.children.forEach((post) => {
            this.redditPostsList.push({
                reddit_content_type: contentTypeConfig.contentType,
                reddit_content_type_time: contentTypeConfig.t != "" ? contentTypeConfig.t : contentTypeConfig.contentType,
                score: post.data.score,
                title: post.data.title,
                ups: post.data.ups,
                downs: post.data.downs,
                upvote_ratio: post.data.upvote_ratio,
                stickied: post.data.stickied,
                author: post.data.author,
                author_flair_text: post.data.author_flair_text,
                created: post.data.created,
                created_utc: post.data.created_utc,
                id: post.data.id,
                likes: post.data.likes,
                num_comments: post.data.num_comments,
                spoiler: post.data.spoiler,
                subreddit: post.data.subreddit,
                subreddit_id: post.data.subreddit_id,
                subreddit_name_prefixed: post.data.subreddit_name_prefixed,
                total_awards_received: post.data.total_awards_received,
                url: post.data.url
            });
        });

        return this;
    }

    build(): RedditPostContent[] {
        return this.redditPostsList;
    }
}

export default RedditPostBuilder;
