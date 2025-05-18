import prisma from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    const dealPosts = await prisma.dealPost.findMany({
        orderBy: [
            {
                postedAt: "desc"
            }
        ]
    })

    return {
        dealPosts
    }
}

export const actions = {
    create: async ({ request, locals }) => {
        const data = await request.formData();

        const errors = {}

        const offer = data.get("offer").trim()
        if (offer.length === 0) {
            errors.offer = "Offer is required"
        } else if (offer.length > 256) {
            errors.offer = "Offer cannot be more than 256 characters long"
        }

        const url = data.get("url").trim()
        if (url.length === 0) {
            errors.url = "URL is required"
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, { success: false, errors: errors });
        }

        await prisma.dealPost.create({
            data: {
                offer,
                url,
                authorId: locals.currentStaff.id
            }
        })
    }
}