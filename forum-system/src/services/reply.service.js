import Backendless from "backendless";

export class ReplyService {
    replyStore = Backendless.Data.of("Replies");

    constructor() {
    }

    async createReply(postId, userId, content) {
        const reply = {
            content: content
        };

        const newReply = await this.replyStore.save(reply);
        await this.replyStore.setRelation(newReply, "author", [{objectId: userId}]);
        await this.replyStore.setRelation(newReply, "post", [{objectId: postId}]);

        return newReply.objectId;
    }

    async editReply(replyId, newContent) {
        const reply = await this.getReplyById(replyId);
        reply.content = newContent;

        await this.replyStore.save(reply)
    }

    async getReplyById(replyId) {
        const query = Backendless.DataQueryBuilder.create().setRelated(["author", "post"]);
        return this.replyStore.findById(replyId, query);
    }
}
