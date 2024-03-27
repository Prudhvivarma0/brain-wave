// getCurrentBanStatus.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function getBanStatus(req: NextApiRequest, res: NextApiResponse) {
    try {
        const profile = await currentProfile();
        const { profileId } = req.query;

        if (!profile) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!profileId) {
            return res.status(400).json({ error: 'Profile ID missing' });
        }

        // Fetch ban status from the database
        const user = await db.profile.findUnique({
            where: {
                id: profileId as string
            },
            select: {
                isBanned: true // Assuming 'isBanned' is the field representing ban status
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the ban status
        return res.status(200).json({ isBanned: user.isBanned });
    } catch (error) {
        console.error("[GET_BAN_STATUS_ERROR]", error);
        return res.status(500).json({ error: 'Internal Error' });
    }
}

// export default async function getCurrentBanStatus(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         if (req.method !== 'GET') {
//             return res.status(405).json({ error: 'Method Not Allowed' });
//         }

//         // Extract profileId from request parameters or query string
//         const { profileId } = req.query;

//         // Query the database to fetch ban status
//         const profile = await db.profile.findUnique({
//             where: { id: profileId as string },
//             select: { isBanned: true } // Assuming 'isBanned' is the field representing ban status
//         });

//         if (!profile) {
//             return res.status(404).json({ error: 'Profile not found' });
//         }

//         // Send ban status as response
//         res.status(200).json({ banStatus: profile.isBanned });
//     } catch (error) {
//         console.error('Error fetching ban status:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }
