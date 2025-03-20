import { redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma.js"
import { SessionType } from "@prisma/client";

export const load = async (event) => {
    try {
        const sessionToken = event.cookies.get("session-token");
        await prisma.session.delete({
            where: {
                token: sessionToken,
                type: SessionType.staff,
            }   
        })
    } catch {}

    throw redirect(307, "/admin/auth/signin")
}