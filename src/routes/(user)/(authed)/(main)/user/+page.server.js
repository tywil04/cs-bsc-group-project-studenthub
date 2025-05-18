import { fail } from "@sveltejs/kit"
import prisma from "$lib/server/prisma"
import { ImageType, UserRelationType } from "@prisma/client"

export const actions = {
    profile: async ({ request, locals }) => {
        const data = await request.formData();

        const errors = {}

        const images = Array.from(data.getAll("images"))
        if (images.length > 1) {
            errors.images = "Cannot have more than 1 picture"
        }
        const image = images?.[0]

        const aboutMe = data.get("aboutMe").trim()
        if (aboutMe.length === 0) {
            errors.aboutMe = "About me is required"
        } else if (aboutMe.length > 128) {
            errors.aboutMe = "About me cannot be more than 128 characters long"
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, { success: false, errors: errors });
        }

        if (!!image) {
            const buffer = Buffer.from(await image.arrayBuffer());
            const bytes = new Uint8Array(buffer);

            await prisma.user.update({
                where: {
                    id: locals.currentUser.id
                },
                data: {
                    profileAboutMe: aboutMe, 
                    images: {
                        create: [
                            {
                                data: bytes, 
                                mimeType: image.type,
                                type: ImageType.profile
                            }
                        ]
                    }
                }
            })
        } else {
            await prisma.user.update({
                where: {
                    id: locals.currentUser.id
                },
                data: {
                    profileAboutMe: aboutMe, 
                }
            })
        }
    }
}