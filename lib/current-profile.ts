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
        }
    });

    return profile;
}

