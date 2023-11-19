import { Request, Response } from "express";
import { BaseController } from "../../../core/interfaces/controllers/BaseController";
import RedditPosts from "../../../core/domain/reddit/services/RedditPosts";

class RedditPostsController implements BaseController {


    constructor(private redditPostService: RedditPosts){}

    async handleRequest(req: Request, res: Response): Promise<void> {
        try {
            const contentTypeConfig = {
                contentType: req.query.contentType as string,
                t: req.query.t as string || ""
            };
            
            const redditPostsHot = await this.redditPostService.getPostsByContentType(contentTypeConfig);

            res.json(redditPostsHot);
       } catch (error) {
              console.log(error);
              res.status(500).send('An error ocurred while processing this request.');   
       }
    }
}

export default (redditPostService: RedditPosts) => new RedditPostsController(redditPostService);