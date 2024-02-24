import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Posting to prisma
export async function POST(req: Request) {
    try {
        const {description, imageUrl} = await req.json();
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorised", {status: 401});
        }
        const post = await db.post.create({
            data: {
                profileId: profile.id,
                imageURL:imageUrl,
                description:description
            }
        });

        return NextResponse.json(post);

    } catch (error) {
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}





