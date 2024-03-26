import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Posting to prisma
export async function POST(req: Request) {
    try {
        const {userNamee,name,content} = await req.json();
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorised", {status: 401});
        }
        const report = await db.userReport.create({
            data: {
                id:uuidv4(),
                reportee:userNamee,
                reporter:name,
                content:content
            }
        });

        return NextResponse.json(report);

    } catch (error) {
        console.log("REPORTS_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}





