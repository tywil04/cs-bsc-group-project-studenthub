import { fail, redirect } from "@sveltejs/kit";
import { hash, argon2id } from "argon2";
import prisma from "$lib/server/prisma";

export const load = (event) => {
    
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const errors = {}

        const firstName = data.get("firstName").trim();
        if (firstName.length === 0) {
            errors.firstName = "First Name is required"
        }

        const lastName = data.get("lastName").trim();
        if (lastName.length === 0) {
            errors.lastName = "Last Name is required"
        }

        const usernameRegex = /^[a-zA-Z0-9\_]+$/gm // only letters, numbers and underscore
        const username = data.get("username").trim();
        if (username.length === 0) {
            errors.username = "Username is required"
        } else if (username.length < 8) {
            errors.username = "Username is too short - it must be at least 8 characters long"
        } else if (username.length > 64) {
            errors.username = "Username is too long - it must be at most 64 characters long"
        } else if (!usernameRegex.test(username) || username.startsWith("_") || username.endsWith("_")) {
            errors.username = "Username contains invalid characters - it must only contain uppercase and lowercase letters, numbers and _'s provided they are not at the start or end"
        }

        const email = data.get("email").trim();
        if (email.length === 0) {
            errors.email = "Personal Email is required"
        }

        const passwordRegex = /^[a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\:\;\"\'\<\>\?\\\/\|\,\.\~]+$/gm // letters, numbers and special characters
        const password = data.get("password");
        if (password.length === 0) {
            errors.password = "Password is required"
        } else if (password.length < 8) {
            errors.password = "Password is too short - it must be at least 8 characters long"
        } else if (password.length > 64) {
            errors.password = "Password is too long - it must be at most 64 characters long"
        } else if (!passwordRegex.test(password)) {
            errors.password = "Password contains invalid characters - it must only contain uppercase and lowercase letters, numbers, and special characters"
        }

        const studentEmail = data.get("studentEmail").trim();
        if (studentEmail.length === 0) {
            errors.studentEmail = "Student Email is required"
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, { success: false, errors: errors });
        }

        const hashedPassword = await hash(password, {
            type: argon2id,
            timeCost: 2,
            memoryCost: 2 ** 19, // in kb
            parallelism: 1,
            hashLength: 32, // 32 bytes/256 bit
        });

        await prisma.user.create({
            data: {
                firstName,
                lastName,
                username,
                email,
                password: hashedPassword,
                studentEmail,
            },
        });

        return redirect(307, "/auth/signin");
    }
}