import { auth } from "@clerk/nextjs";
import { db } from "./db";

// Checks for current profile of user
export const currentProfile = async() => {
    const {userId} = auth();
    if (!userId) {
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        },
        select: {
            isBanned: true,
            id: true,
            name:true,
            userId: true,
            imageUrl: true,
            email: true,
            isAdmin: true,
            createdAt:true,
            updatedAt: true,
            servers: true,
            members: true,
            channels: true,
            posts: true
            // include other fields as needed
        }

    });

    return profile;
}

