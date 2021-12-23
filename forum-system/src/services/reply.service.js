import Backendless from "backendless";

export class ReplyService {
    replyStore = Backendless.Data.of("Replies");

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
        try {
            const query = Backendless.DataQueryBuilder.create().setRelated(["author", "post"]);
            return await this.replyStore.findById(replyId, query);
        } catch (e) {
            return null;
        }

    }
}
