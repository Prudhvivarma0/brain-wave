// Import necessary modules and functions
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { redirectToSignIn } from "@clerk/nextjs";
export async function POST(req: Request) {
    try {
        // Extract the profile ID from the request body or parameters
         // Convert the Request object to a NextRequest object
         const nextReq = new NextRequest(req.url, req);
         const { headers } = nextReq;
        const host = headers.get('host') || 'localhost:3000'; // Replace with your actual host

        const { profileId } = await req.json();

        // Check if the profile ID is provided
        if (!profileId) {
            return new NextResponse("Profile ID is missing", { status: 400 });
        }

         // Get the user ID from the request
         const { userId } = getAuth(nextReq);

        // Update the profile in the database to set isBanned to true
        const updatedProfile = await db.profile.update({
            where: { id: profileId },
            data: { isBanned: true }
        });


            // Construct the absolute URL for redirection
        const redirectUrl = `${headers.get('x-forwarded-proto') || 'http'}://${host}/banned?userId=${userId}`;
        // Return a success response with the updated profile
        return NextResponse.json(updatedProfile);
       // return NextResponse.redirect(redirectUrl);

    } catch (error) {
        console.error("[BAN_PROFILE_ERROR]", error);
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    } 
}