"use client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 bg-white hover:bg-gray-400 dark:hover:bg-zinc-700/50 transition border border-black"
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