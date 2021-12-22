import Backendless from "backendless";
import {PostService} from "./post.service.js";

export default class VoteService {

    voteStore = Backendless.Data.of("Votes");
    userStore = Backendless.Data.of("Users")
    postService = new PostService();

    async registerVote(postId, userId, polarity) {
        const voteObjInDB = await this.checkUserVote(userId, postId);
        const post = await this.postService.retrievePost(postId)
        const authorId = post.author.objectId;

        if (voteObjInDB.length > 0) {
            return await this.changeVote(voteObjInDB[0], polarity, authorId)
        }

        const vote = await this.voteStore.save({polarity: polarity});
        await this.voteStore.setRelation(vote, "user", [{objectId: userId}]);
        await this.voteStore.setRelation(vote, "post", [{objectId: postId}])

        const user = await this.userStore.findById(authorId);
        const interpret = polarity ? 1 : -1;
        user.karmaPoints += interpret;

        await this.userStore.save(user);
    }

    async changeVote(voteObj, newPolarity, authorId) {
        if (voteObj.polarity !== newPolarity) {
            voteObj.polarity = newPolarity;
            await this.voteStore.save(voteObj);

            const user = await this.userStore.findById(authorId);
            const interpret = newPolarity ? 2 : -2;
            user.karmaPoints += interpret;

            await this.userStore.save(user);
        }
    }

    async checkUserVote(userId, postId) {
        const clause = `user = '${userId}' and post = '${postId}'`
        const query = Backendless.DataQueryBuilder.create().setWhereClause(clause).setRelated(["post", "user"]);

        return await this.voteStore.find(query);
    }

    async getPostVotesCount(postId) {
        const clause = `post = '${postId}'`
        const query = Backendless.DataQueryBuilder.create().setWhereClause(clause)

        const votes = await this.voteStore.find(query);

        return votes.reduce((acc, curr) => {
            const interpret = curr.polarity ? 1 : -1;

            return acc + interpret;
        }, 0)
    }

}