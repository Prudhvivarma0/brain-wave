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

export async function GET(
    req: Request,
    {params}: {params: {postId: string}}
) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const post = await db.post.findUnique({
            where: {
                id: params.postId
            },
            select: {
                // Assuming 'likeCount' is a relation name defined in your schema
                likeCount: true
            }
        });
        return NextResponse.json(post);
    } catch (error){
        console.log("[POST_ID_LIKE]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
export async function POST(
    req: Request,
    {params}: {params: {postId: string, state: boolean}}
) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        // Parse the request body to get the isLiking value
        const { isLiking } = await req.json();

        const post = await db.post.update({
            where: {    
                id: params.postId
            },
            data: {
                likeCount: {
                    // Increment if the post is being liked, decrement if it's being unliked
                    increment: isLiking ? 1 : -1

                },
                liked: isLiking
            }
        });
        return NextResponse.json(post);
    } catch (error){
        console.log("[POST_ID_LIKE]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
