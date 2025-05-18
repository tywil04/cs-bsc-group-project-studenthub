import { fail, redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
import { ImageType } from "@prisma/client";

export const actions = {
    create: async({ request, locals }) => {
        const data = await request.formData();

        const errors = {}

        const content = data.get("content").trim()
        if (content.length === 0) {
            errors.content = "Content is required"
        } else if (content.length > 256) {
            errors.content = "Content cannot be more than 256 characters long"
        }

        const images = Array.from(data.getAll("images"))
        if (images.length > 4) {
            errors.images = "Cannot have more than 4 pictures"
        }

        const tagsRaw = data.get("tags") || "[]"
        const tags = JSON.parse(tagsRaw)
        if (tags.length > 5) {
            errors.tags = "Cannot have more than 5 tags"
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, { success: false, errors: errors });
        }

        const { post } = await prisma.$transaction(async (prisma) => {
            const imagesPrisma = []
            for (const image of images) {
                if (image.size === 0) {
                    continue
                }
                
                const buffer = Buffer.from(await image.arrayBuffer());
                const bytes = new Uint8Array(buffer);
                imagesPrisma.push({
                    type: ImageType.post,
                    data: bytes,
                    mimeType: image.type
                })
            }

            const existingTags = await prisma.tag.findMany({
                where: {
                    name: {
                        in: tags,
                    }
                }
            })
            const existingTagNames = existingTags.map((t) => t.name)

            const tagsPrisma = []
            for (const tag of existingTags) {
                tagsPrisma.push({
                    tag: {
                        connect: {
                            id: tag.id
                        }
                    }
                })
            }

            for (const tag of tags.filter((t) => !existingTagNames.includes(t))) {
                tagsPrisma.push({
                    tag: {
                        create: {
                            name: tag
                        }
                    }
                })
            }

            const post = await prisma.post.create({
                data: {
                    content: content,
                    images: {
                        create: imagesPrisma,
                    },
                    tags: {
                        create: tagsPrisma,
                    },
                    authorId: locals.currentUser.id,
                }
            })

            return { post }
        })

        return redirect(307, `/post/${post.id}`);
    }
}