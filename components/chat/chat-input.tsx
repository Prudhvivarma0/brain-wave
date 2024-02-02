"use client"

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { PlusIcon, Send } from "lucide-react";
import axios from "axios";
import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";

interface ChatInputProps{
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1)
});

export const ChatInput = ({
    apiUrl,
    query,
    name,
    type
}: ChatInputProps) => {
    const {onOpen} = useModal();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    });
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });
            await axios.post(url, values);
            form.reset();
        } catch (error){
            console.log(error)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button type="button" onClick={() => onOpen("messageFile", {apiUrl, query})} className="absolute top-7 left-8 h-[24px] w-[24px] bg-gray-300 hover:bg-gray-400 transition rounded-full p-1 flex items-center justify-center">
                                        <PlusIcon className="text-black"/>
                                    </button>
                                    <Input
                                        disabled={isLoading}
                                        className="text-black px-14 py-6  bg-gray-200"
                                        placeholder={`Message ${type === "conversation" ? name : "in " + name}`}
                                        {...field}
                                        autoComplete="off"
                                    />
                                    
                                    <button onClick={() => onSubmit} disabled={isLoading} className="absolute top-7 right-8">
                                        <Send 
                                            className="text-black w-5"
                                        />
                                    </button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}