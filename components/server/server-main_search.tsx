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
        className="pr-2 flex items-center outline rounded-md transition hover:bg-white hover:text-black "
      >
        <Search className="pl-2 flex items-center" />

        {/* Show the following elements only on medium and larger screens */}
        <div className="pr-2 flex items-center">
          <p
            className="pl-2 flex items-center"
          >
            Teams
          </p>
        </div>
      </button>


      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all Teams and Challenges" />
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