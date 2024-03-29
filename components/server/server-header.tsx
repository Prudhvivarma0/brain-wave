"use client"

import { useModal } from "@/hooks/use-modal-store"
import { ServerWithMembersWithProfiles } from "@/types"
import { MemberRole } from "@prisma/client"
import { FileBarChart2, LogOut, MessageSquareWarning, Settings, Settings2, Text, Trash2, UserPlus2, Users2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { db } from "@/lib/db"
import { jsPDF } from "jspdf";
import { List } from "postcss/lib/list"

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles
    role?: MemberRole
    members?: string[];
    channel?: string[];
    profile?: string[];
}

export const ServerHeader = ({
    server,
    role,
    members,
    channel,
    profile
}: ServerHeaderProps) => {
    const { onOpen } = useModal();
    const isAdmin = role === MemberRole.ADMIN;
    const isMod = isAdmin || role === MemberRole.MODERATOR;

    const downloadPDF = () => {
        const doc = new jsPDF();
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        var splitText = doc.splitTextToSize(members ? members.join(', ') : '', 150);
        var splitChannel = doc.splitTextToSize(channel ? channel.join(', ') : '', 150);
        var splitProfile = doc.splitTextToSize(profile ? profile.join(', ') : '', 150);
        

        doc.setFontSize(30);
        doc.text("Brainwave", pageWidth / 2 + 10, 20, { align: 'center' });
        doc.addImage("https://utfs.io/f/fab438aa-8e7a-406a-9d1a-2ad9ddd349a0-1zbfv.png", 71, 8, 16, 16);
        doc.setDrawColor(128, 0, 128);
        doc.setLineWidth(1);
        doc.line(17, 28, 195, 28);
        doc.setFontSize(20);
        doc.text(server.name, pageWidth / 2 + 5, 40, { align: 'center' })
        doc.addImage(server.imageUrl, 'JPEG', pageWidth / 2 - 45, pageWidth / 2 - 60, 100, 100);
        doc.setFontSize(14);
        doc.text("•	Members :", 22, 165);
        // doc.text(splitText, 60, 165);

        var y = 165;

        if (members && members.length == 0) {
            doc.text("No Members!!", 60, y);
        }
        else{
        for (var i = 0; i < splitText.length; i++) {
            if (y > 275) {
                y = 20;
                doc.addPage(); // Start a new page if content exceeds the height
            }
            doc.text(splitText[i], 60, y);
            y += 5; // Adjust vertical position
        }}

        doc.text("•	Channels :", 22, 190);
        // doc.text(channel ? channel.join(', ') : '', 60, 180);

        var y = 190;

        for (var i = 0; i < splitChannel.length; i++) {
            if (y > 275) {
                y = 20;
                doc.addPage(); // Start a new page if content exceeds the height
            }
            doc.text(splitChannel[i], 60, y);
            y += 5; // Adjust vertical position
        }

        doc.text("•	Team", 22, 215);
        doc.text("Leader(s) :", 35, 220);

        var y = 220;

        for (var i = 0; i < splitProfile.length; i++) {
            if (y > 275) {
                y = 20;
                doc.addPage(); // Start a new page if content exceeds the height
            }
            doc.text(splitProfile[i], 60, y);
            y += 5; // Adjust vertical position
        }

        // doc.text("Report Generated By : ",pageWidth/2 + 30,290);
        doc.line(17, pageWidth / 2 + 175, 195, pageWidth / 2 + 175);
        doc.save(server.name + " Report.pdf");
        // console.log(members)
    };


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="focus:outline-none"
                    asChild
                >
                    <button
                        className="text-white w-full test-md font-semibold px-3 flex items-center h-12"
                    >
                        <Settings className="h-5 w-5 ml-auto hover:text-gray-400" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56 text-xs font-medium text-black dark:text-white space-y-[2px]"
                >
                    {isMod && (
                        <DropdownMenuItem
                            onClick={() => onOpen("invite", { server })}
                            className="px-3 py-2 text-sm cursor-pointer"
                        >
                            <UserPlus2 className="h-4 w-4 mr-9" />
                            Invite People

                        </DropdownMenuItem>
                    )}

                    {isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("editServer", { server })}
                            className="px-3 py-2 text-sm cursor-pointer"
                        >
                            <Settings2 className="h-4 w-4 mr-9" />
                            Settings

                        </DropdownMenuItem>
                    )}

                    {isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("members", { server })}
                            className="px-3 py-2 text-sm cursor-pointer"
                        >
                            <Users2 className="h-4 w-4 mr-9" />
                            Manage Members

                        </DropdownMenuItem>
                    )}
                    {isMod && (
                        <DropdownMenuItem
                            onClick={() => onOpen("createChannel")}
                            className="px-3 py-2 text-sm cursor-pointer"
                        >
                            <Text className="h-4 w-4 mr-9" />
                            Create Channel

                        </DropdownMenuItem>
                    )}
                    {isMod && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer "
                            onClick={downloadPDF}
                        >
                            <FileBarChart2 className="h-4 w-4 mr-9" />
                            Team Report

                        </DropdownMenuItem>
                    )}
                    {/* {isMod && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer "
                            onClick={downloadPDF}
                        >
                            <FileBarChart2 className="h-4 w-4 mr-9" />
                            Platform Statistics

                        </DropdownMenuItem>
                    )} */}
                    {(!isAdmin || isAdmin) && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer "
                            onClick={() => onOpen("userReport")}
                        >
                            <MessageSquareWarning className="h-4 w-4 mr-9" />
                            Report 

                        </DropdownMenuItem>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer text-rose-500"
                            onClick={() => onOpen("deleteServer", { server })}
                        >
                            <Trash2 className="h-4 w-4 mr-9" />
                            Delete Team

                        </DropdownMenuItem>
                    )}
                    {!isAdmin && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer text-rose-500"
                            onClick={() => onOpen("leaveServer", { server })}
                        >
                            <LogOut className="h-4 w-4 mr-9" />
                            Leave Team

                        </DropdownMenuItem>
                    )}

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
