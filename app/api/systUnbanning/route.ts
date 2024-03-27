// Import necessary modules and functions
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        // Extract the profile ID from the request body or parameters
        const { profileId } = await req.json();

        // Check if the profile ID is provided
        if (!profileId) {
            return new NextResponse("Profile ID is missing", { status: 400 });
        }

        // Update the profile in the database to set isBanned to false
        const updatedProfile = await db.profile.update({
            where: { id: profileId },
            data: { isBanned: false } // Set isBanned to false to unban the user
        });

        // Return a success response with the updated profile
        return NextResponse.json(updatedProfile);
    } catch (error) {
        console.error("[UNBAN_PROFILE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
