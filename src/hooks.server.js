import prisma from "$lib/server/prisma";
import { SessionType } from "@prisma/client";

export const handle = async ({ event, resolve }) => {
    const sessionToken = event.cookies.get("session-token");
    if (sessionToken != null) {
        const session = await prisma.session.findUnique({
            include: {
                user: true,
                staff: true,
            },
            where: {
                token: sessionToken,
            }
        });
    
        if (session?.type === SessionType.user) {
            event.locals.currentUser = session.user;
        } else if (session?.type === SessionType.staff) {
            event.locals.currentStaff = session.staff;
        }
    }

    const response = await resolve(event);
    return response;
}