import { fail, redirect } from "@sveltejs/kit";
import { verify } from "argon2";
import prisma from "$lib/server/prisma";
import crypto from "node:crypto"

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const username = data.get("username")
        const password = data.get("password").trim();

        let user = null
        try {
            user = await prisma.user.findUnique({
                where: {
                    username,
                }
            })
        } catch (error) {
            return fail(400, { 
                success: false, 
                errors: { 
                    username: "No user found with this username" 
                }
            })
        }

        if (!(await verify(user.password, password))) {
            // passwords don't match
            return fail(400, {
                success: false,
                errors: {
                    password: "Incorrect password or username"
                }
            })
        }

        const sessionToken = crypto.randomBytes(32).toString("hex");
        const session = await prisma.session.create({
            data: {
                token: sessionToken,
                userId: user.id,
            }
        })

        cookies.set("session-token", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 2592000000, // 30 days in ms
            path: "/",
        })

        return redirect(307, "/app");
    }
}