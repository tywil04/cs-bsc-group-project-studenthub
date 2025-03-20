import { redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma.js"
import { SessionType } from "@prisma/client";

export const load = async (event) => {
    let session = null;
    try {
        const sessionToken = event.cookies.get("session-token");
        session = await prisma.session.findUnique({
            include: {
                staff: true,
            },
            where: {
                token: sessionToken,
                type: SessionType.staff,
            }
        })
    } catch {}

    if (session?.staff) {
        throw redirect(307, "/admin/app")
    }
}