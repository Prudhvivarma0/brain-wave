import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    {params}: {params: {postId: string}}
) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const post = await db.post.delete({
            where: {
                id: params.postId
            },
            
        });
        return NextResponse.json(post);
    } catch (error){
        console.log("[POST_ID_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}