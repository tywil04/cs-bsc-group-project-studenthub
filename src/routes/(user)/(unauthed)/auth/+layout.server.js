import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
    if (event.locals.currentUser) {
        throw redirect(307, "/home")
    }
}