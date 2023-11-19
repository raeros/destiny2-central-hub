export interface RedditPost {
    after: string;
    dist: number;
    modHash: any;
    geo_filter: any;
    before: any;
    children: RedditPostChildren[]
}

export interface RedditPostContent {
    reddit_content_type: string;
    reddit_content_type_time: string;
    url: string;
    created_utc: number;
    created: number; // 
    num_comments: string;
    author: string;
    id: string;
    subreddit_id: string;
    author_flair_text: string; // lol. this field can have some funny stuff.
    spoiler: boolean; // maybe this is a important field. TODO: see if it would be cool to "blur" spoiler content on the frontend dashboard.
    likes: any; // this counts as upvote???
    score: number; // i think this counts as the score of the post. Upvotes vs DownVotes
    ups: number; //  number of up votes it received.
    downs: number // number of down votes
    upvote_ratio: number;
    total_awards_received: number; // maybe this can be usefull to display?
    subreddit_name_prefixed: string; // example: r/DestinyTheGame
    subreddit: string; // example: DestinyTheGame
    title: string; // title of the post
    stickied: boolean; // i think this means if the post is highlighted/fix/stick in the subreddit page. aka the mods fixed this post at the top.
}

interface RedditPostChildren {
    kind: string;
    data: RedditPostContent
}