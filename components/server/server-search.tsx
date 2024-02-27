"use client";

import { Edit2, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Channel, MemberRole, Server } from "@prisma/client";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member",
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
    }[] | undefined
  }[]
  
}

export const ServerSearch = ({
  data
}: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down)
  }, []);

  const onClick = ({ id, type }: { id: string, type: "channel" | "member"}) => {
    setOpen(false);

    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversation/${id}`)
    }

    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`)
    }
  }
  

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full bg-white hover:bg-gray-400 dark:hover:bg-zinc-700/50 transition"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />

        {/* Show the following elements only on medium and larger screens */}
        <div className="hidden md:flex items-center gap-x-2">
          <p
            className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
          >
            Search
          </p>
          <kbd
            className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
          >
            <span className="text-xs mt-0.5">ctrl</span>K
          </kbd>
        </div>
      </button>


      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>
            No Results found
          </CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                  {data?.map(({ id, icon, name }) => {
                    return (
                      <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                        {icon}
                        <span>{name}</span>
                        {/* {name !== "main" && role !== MemberRole.GUEST && (
                        <div className="ml-auto flex flex-row items-center gap-x-1">
                            <Edit2 onClick={(e) => onAction(e,"editChannel")} className="group-hover:block w-4 h-4"/>
                            <Trash2 onClick={(e) => onAction(e, "deleteChannel")} className="group-hover:block w-4 h-4"/>
                        </div>
                        )} */}

                      </CommandItem>
                    )
                  })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}