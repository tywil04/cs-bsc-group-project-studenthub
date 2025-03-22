import { fail, redirect } from "@sveltejs/kit";
import { verify } from "argon2";
import prisma from "$lib/server/prisma";
import crypto from "node:crypto"
import { SessionType } from "@prisma/client";

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const username = data.get("username").trim();
        const password = data.get("password");

        const staff = await prisma.staff.findUnique({ where: { username } })
        if (staff == null) {
            return fail(400, { 
                success: false, 
                errors: { 
                    username: "No staff member found with this username" 
                }
            })
        }

        if (!(await verify(staff.password, password))) {
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
                staffId: staff.id,
                type: SessionType.staff,
            }
        })

        cookies.set("session-token", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 28800000, // 8 hours in ms
            path: "/",
        })

        return redirect(307, "/staff/dashboard");
    }
}