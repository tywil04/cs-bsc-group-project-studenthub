import { error } from "@sveltejs/kit"
import prisma from "$lib/server/prisma"

export const GET = async({ params }) => {
    try {
        const image = await prisma.image.findUniqueOrThrow({ where: { id: params.id } })

        return new Response(image.data, {
            status: 200,
            headers: {
                "Content-Type": image.mimeType,
                "Content-Length": image.data.length
            }
        })
    } catch (_) {
        error(400, "Image not found")
    }
}