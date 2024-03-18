"use client";

import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

interface ServerSearchProps {
  data: {
    label: string;
    type: "challenge" | "server",
    data: {
      //icon: React.ReactNode;
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

  const onClick = ({ id, type }: { id: string, type: "challenge" | "server"}) => {
    setOpen(false);

    if (type === "server") {
      return router.push(`/servers/${id}`);
    }

    if (type === "challenge") {
      return router.push('/challenges/'+id);
    }
  }
  

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group md:px-12 px-2 py-2 rounded-md flex items-center gap-x-2  bg-white hover:bg-gray-400 dark:hover:bg-zinc-700/50 transition"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />

        {/* Show the following elements only on medium and larger screens */}
        <div className="hidden md:flex items-center gap-x-2">
          <p
            className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
          >
            Search
          </p>
        </div>
      </button>


      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandEmpty>
            No Results found
          </CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                  {data?.map(({ id, name }) => {
                    return (
                      <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                        <span>{name}</span>

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