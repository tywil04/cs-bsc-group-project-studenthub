import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
    if (event.locals.currentUser) {
        return { currentUser: event.locals.currentUser }
    } else {
        throw redirect(307, "/auth/signin");
    }
}