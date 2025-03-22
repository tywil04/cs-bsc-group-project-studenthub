import { redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
import { SessionType } from "@prisma/client";

export const load = async (event) => {
    let session = null;
    try {
        const sessionToken = event.cookies.get("session-token");
        session = await prisma.session.findUnique({
            include: {
                user: true,
            },
            where: {
                token: sessionToken,
                type: SessionType.user,
            }
        })
    } catch {}

    if (session?.user) {
        throw redirect(307, "/feed")
    }
}