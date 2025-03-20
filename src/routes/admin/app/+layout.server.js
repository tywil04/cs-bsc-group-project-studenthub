import { redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma.js"
import { SessionType } from "@prisma/client";

export const load = async (event) => {
    try {
        const sessionToken = event.cookies.get("session-token");
        const session = await prisma.session.findUnique({
            include: {
                staff: true,
            },
            where: {
                token: sessionToken,
                type: SessionType.staff
            }
        })
        
        return {
            currentStaff: session.staff
        }
    } catch {
        throw redirect(307, "/admin/auth/signin");
    }
}