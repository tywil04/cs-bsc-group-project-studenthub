import prisma from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    const announcements = await prisma.announcement.findMany({
        orderBy: [
            {
                postedAt: "desc"
            }
        ]
    })

    return {
        announcements
    }
}

export const actions = {
    create: async ({ request, locals }) => {
        const data = await request.formData();

        const errors = {}

        const title = data.get("title").trim()
        if (title.length === 0) {
            errors.title = "Title is required"
        } else if (title.length > 128) {
            errors.title = "Title cannot be more than 128 characters long"
        }

        const content = data.get("content").trim()
        if (content.length === 0) {
            errors.content = "Content is required"
        } else if (content.length > 1024) {
            errors.content = "Content cannot be more than 1024 characters long"
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, { success: false, errors: errors });
        }

        await prisma.announcement.create({
            data: {
                title,
                content,
                authorId: locals.currentStaff.id
            }
        })
    }
}