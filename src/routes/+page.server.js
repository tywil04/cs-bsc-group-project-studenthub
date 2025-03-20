import prisma from '$lib/server/prisma.js';

export async function load({ params }) {
	return { 
        message: "Loaded Data"
    }
}