import prisma from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    const accomodationPosts = await prisma.accomodationPost.findMany({
        orderBy: [
            {
                postedAt: "desc"
            }
        ]
    })

    return {
        accomodationPosts
    }
}

export const actions = {
    create: async ({ request, locals }) => {
        const data = await request.formData();

        const errors = {}

        const description = data.get("description").trim()
        if (description.length === 0) {
            errors.description = "Description is required"
        } else if (description.length > 256) {
            errors.description = "Description cannot be more than 256 characters long"
        }

        const location = data.get("location").trim()
        if (location.length === 0) {
            errors.location = "Location is required"
        } else if (location.length > 64) {
            errors.location = "Location cannot be more than 64 characters long"
        }

        const price = data.get("price").trim()
        if (price.length === 0) {
            errors.price = "Price is required"
        } else if (price.length > 64) {
            errors.price = "Price cannot be more than 64 characters long"
        }
        
        const url = data.get("url").trim()
        if (url.length === 0) {
            errors.url = "URL is required"
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, { success: false, errors: errors });
        }

        await prisma.accomodationPost.create({
            data: {
                description,
                location, 
                price,
                url,
                authorId: locals.currentStaff.id
            }
        })
    }
}