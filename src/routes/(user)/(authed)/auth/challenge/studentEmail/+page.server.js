import { fail, redirect } from "@sveltejs/kit";
import { hash, argon2id } from "argon2";
import prisma from "$lib/server/prisma";
import { EmailChallengeStatus, EmailChallengeType, UserEmailStatus, UserStudentStatus } from "@prisma/client";
import nodemailer from "$lib/server/nodemailer";
import { generateRandomString } from "$lib/server/utils";

export const load = async (event) => {
    if (event.locals.currentUser.studentStatus == UserStudentStatus.verified) {
        throw redirect(307, "/home");
    }

    const emailChallenge = await prisma.emailChallenge.findFirst({
        where: {
            userId: event.locals.currentUser.id,
            expires: {
                gt: new Date(Date.now()), // find records where expires is greater than the current time, which means not expired
            },
            type: EmailChallengeType.studentEmail,
            status: EmailChallengeStatus.incomplete,
        },
    });
    if (emailChallenge == null) {
        const code = generateRandomString(6);

        await prisma.emailChallenge.create({
            data: {
                userId: event.locals.currentUser.id,
                code: code,
                expires: new Date(Date.now() + 15 * 60 * 1000), // in 15 minutes time,
                type: EmailChallengeType.studentEmail,
                status: EmailChallengeStatus.incomplete,
            }
        });

        await nodemailer.sendMail({
            from: '"StudentHub" <no-reply@studenthub.co.uk>',
            to: event.locals.currentUser.studentEmail,
            subject: "Your StudentHub verification code",
            text: `Hi ${event.locals.currentUser.firstName},\n\nYour StudentHub verification code is: ${code}\n\nUse this code to verify your student email address.`,
        });
    }
}

export const actions = {
    verify: async (event) => {
        const data = await event.request.formData();

        const code = data.get("code").trim();
        if (code.length === 0) {
            return fail(400, { success: false, errors: { code: "Code is required" } });
        }

        const emailChallenge = await prisma.emailChallenge.findFirst({
            where: {
                userId: event.locals.currentUser.id,
                expires: {
                    gt: new Date(Date.now()), // find records where expires is greater than the current time, which means not expired
                },
                type: EmailChallengeType.studentEmail,
                status: EmailChallengeStatus.incomplete,
            },
        });

        if (code !== emailChallenge.code) {
            return fail(400, { success: false, errors: { code: "Code is incorrect" } });
        }

        await prisma.user.update({
            where: {
                id: event.locals.currentUser.id,
            },
            data: {
                studentStatus: UserStudentStatus.verified,
            }
        });

        await prisma.emailChallenge.update({
            where: {
                id: emailChallenge.id,
            },
            data: {
                status: EmailChallengeStatus.successful,
            }
        })

        return redirect(307, "/home");
    },

    resendEmail: async (event) => {
        const emailChallenge = await prisma.emailChallenge.findFirst({
            where: {
                userId: event.locals.currentUser.id,
                expires: {
                    gt: new Date(Date.now()), // find records where expires is greater than the current time, which means not expired
                },
                type: EmailChallengeType.studentEmail,
                status: EmailChallengeStatus.incomplete,
            },
        });

        await prisma.emailChallenge.update({
            where: {
                id: emailChallenge.id,
            },
            data: {
                status: EmailChallengeStatus.failed,
            }
        });

        return redirect(307, "/auth/challenge/studentEmail");
    }
}