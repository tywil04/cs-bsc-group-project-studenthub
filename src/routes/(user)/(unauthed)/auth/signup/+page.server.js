import { fail, redirect } from "@sveltejs/kit";
import { hash, argon2id } from "argon2";
import prisma from "$lib/server/prisma";
import * as crypto from 'crypto';
import { CourseLevel, CourseStatus } from "@prisma/client";

export const load = async () => {
    const universities = await prisma.university.findMany()

    const courseLevels = Object.values(CourseLevel).map((courseLevel) => ({
        label: courseLevel.charAt(0).toUpperCase() + courseLevel.slice(1),
        value: courseLevel,
    }))

    return { universities, courseLevels }
}

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const errors = {}

        const firstName = data.get("firstName").trim();
        if (firstName.length === 0) {
            errors.firstName = "First name is required"
        }

        const lastName = data.get("lastName").trim();
        if (lastName.length === 0) {
            errors.lastName = "Last name is required"
        }

        const usernameRegex = /^[a-zA-Z0-9\_]+$/gm // only letters, numbers and underscore
        const username = data.get("username").trim();
        if (username.length === 0) {
            errors.username = "Username is required"
        } else if (username.length < 6) {
            errors.username = "Username is too short - it must be at least 6 characters long"
        } else if (username.length > 64) {
            errors.username = "Username is too long - it must be at most 64 characters long"
        } else if (!usernameRegex.test(username) || username.startsWith("_") || username.endsWith("_")) {
            errors.username = "Username contains invalid characters - it must only contain uppercase and lowercase letters, numbers and '_''s provided they are not at the start or end"
        }

        const email = data.get("email").trim();
        if (email.length === 0) {
            errors.email = "Personal email is required"
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

        const passwordConfirmation = data.get("passwordConfirmation");
        if (passwordConfirmation !== password) {
            errors.passwordConfirmation = "Password confirmation doesn't match password"
        }

        const studentEmail = data.get("studentEmail").trim();
        if (studentEmail.length === 0) {
            errors.studentEmail = "Student email is required"
        } else if (!studentEmail.endsWith(".ac.uk") && !studentEmail.endsWith(".university")) {
            // not a student email address 
            errors.studentEmail = "Student email is invalid"
        }

        const currentUniversityId = data.get("currentUniversityId");
        if (currentUniversityId.length === 0) {
            errors.currentUniversityId = "Current university is required"
        }
        try {
            const university = await prisma.university.findUnique({ where: { id: currentUniversityId }})
            if (!studentEmail.endsWith(university.domain)) {
                errors.studentEmail = "Student email is not from your current university"
            }
        } catch (error) {
            errors.currentUniversityId = "Current university is invalid"
        }

        const currentCourse = data.get("currentCourse");
        if (currentCourse.length === 0) {
            errors.currentUniversityId = "Current course is required"
        }

        const currentCourseLevel = data.get("currentCourseLevel");
        if (currentCourse.length === 0) {
            errors.currentCourseLevel = "Course level is required"
        } else if (!Object.values(CourseLevel).includes(currentCourseLevel)) {
            errors.currentCourseLevel = "Course level is invalid"
        }

        let currentCourseStart = data.get("currentCourseStart");
        if (currentCourseStart.length === 0) {
            errors.currentCourseStart = "Course start is required"
        }
        currentCourseStart = new Date(currentCourseStart);
        if (currentCourseStart > new Date()) {
            errors.currentCourseStart = "Course start cannot be in the future"
        }

        let currentCourseEnd = data.get("currentCourseEnd");
        if (currentCourseEnd.length === 0) {
            errors.currentCourseEnd = "Course end is required"
        }
        currentCourseEnd = new Date(currentCourseEnd);
        if (currentCourseEnd < new Date()) {
            errors.currentCourseEnd = "Course start cannot be in the past"
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

        const sessionToken = crypto.randomBytes(32).toString("hex");

        try {
            await prisma.$transaction(async (prisma) => {
                const user = await prisma.user.create({
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        password: hashedPassword,
                        studentEmail,
                        courses: {
                            create: [
                                {
                                    universityId: currentUniversityId,
                                    name: currentCourse,
                                    level: currentCourseLevel,
                                    startDate: currentCourseStart,
                                    endDate: currentCourseEnd,
                                    status: CourseStatus.active,
                                },
                            ],
                        }
                    },
                });
    
                const session = await prisma.session.create({
                    data: {
                        token: sessionToken,
                        userId: user.id,
                    }
                })
            })
        } catch (error) {
            if (error.code === "P2002") {
                switch (error.meta.target) {
                    case "User_username_key":
                        errors.username = "Username is already in use, please use a different username"; 
                        break;   
                    case "User_email_key": 
                        errors.email = "Personal email is already in use, please use a different personal email"; 
                        break;
                    case "User_studentEmail_key":
                        errors.studentEmail = "Student email is already in use, please use a different student email";
                        break
                    default:
                        errors.overall = "An unknown error has occured"
                }                
                return fail(400, { success: false, errors: errors });
            } else {
                throw error
            }
        }

        cookies.set("session-token", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 2592000000, // 30 days in ms
            path: "/",
        })

        return redirect(307, "/auth/challenge/email");
    }
}