import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
    if (event.locals.currentStaff) {
        return { currentStaff: event.locals.currentStaff }
    } else {
        throw redirect(307, "/staff/auth/signin");
    }
}