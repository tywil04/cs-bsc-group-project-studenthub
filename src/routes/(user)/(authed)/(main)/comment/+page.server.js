import { fail, redirect } from "@sveltejs/kit";
import { hash, argon2id } from "argon2";
import prisma from "$lib/server/prisma";
import { CommentType, ImageType } from "@prisma/client";

export const actions = {
    create: async({ request, locals }) => {
        const data = await request.formData();

        const errors = {}

        const content = data.get("content").trim()
        if (content.length === 0) {
            errors.content = "Content is required"
        } else if (content.length > 128) {
            errors.content = "Content cannot be more than 128 characters long"
        }

        const postId = data.get("postId")

        const commentId = data.get("commentId")

        if (postId == null && commentId == null) {
            errors.postId = "A postId or commentId is required"
            errors.commentId = errors.postId
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, { success: false, errors: errors });
        }

        let type 
        if (postId != "") {
            type = CommentType.post
        } else if (commentId != "") {
            type = CommentType.comment
        }

        const { comment } = await prisma.$transaction(async (prisma) => {
            const comment = await prisma.comment.create({
                data: {
                    content: content,
                    authorId: locals.currentUser.id,
                    type,
                    postId,
                    parentCommentId: commentId,
                }
            })
            return { comment }
        })

        return redirect(307, `/comment/${comment.id}`);
    }
}