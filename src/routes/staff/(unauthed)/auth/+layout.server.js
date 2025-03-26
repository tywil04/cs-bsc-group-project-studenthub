import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
    if (event.locals.currentStaff) {
        throw redirect(307, "/staff/dashboard");
    }
}