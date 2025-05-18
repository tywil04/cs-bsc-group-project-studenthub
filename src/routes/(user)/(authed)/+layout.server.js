import { UserEmailStatus, UserStudentStatus } from "@prisma/client";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals, request }) => {
    if (locals.currentUser) {
        const url = new URL(request.url)
        if (!url.pathname.startsWith("/auth")) {
            // dont redirect away from authenticated auth pages ever when logged in
            if (locals.currentUser.emailStatus === UserEmailStatus.unverified) {
                throw redirect(307, "/auth/challenge/email")
            } else if (locals.currentUser.studentStatus === UserStudentStatus.unverified) {
                throw redirect(307, "/auth/challenge/studentEmail")
            }
        }

        return { currentUser: locals.currentUser }
    } else {
        throw redirect(307, "/auth/signin");
    }
}