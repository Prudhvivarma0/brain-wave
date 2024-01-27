"use client"

// Initial model that will show if the user has no servers (new users)

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileUpload } from "../file-upload";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useModal } from "@/hooks/use-modal-store";
import { Upload } from "lucide-react";
import qs from "query-string";

export const MessageFileModal = () => {

    const {isOpen, onClose, type, data} = useModal();

    const {apiUrl, query} = data;

    const isModalOpen = isOpen && type === "messageFile";

    const router = useRouter();
    
    // Adding requirements
    const formSchema = z.object({
        fileUrl: z.string().min(1, {
            message: "Attacment is required"
        })
    
    });
    
    // Different inputs
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        }
    });

    const handleClose = () => {
        form.reset();
        onClose();
    };

    // isLoading to prevent inputs while loading
    const isLoading = form.formState.isSubmitting;

    // Posting data to prisma
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            });
            await axios.post(url, {
                ...values,
                content: values.fileUrl
            });
            form.reset();
            router.refresh();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Dialog open={isModalOpen} onOpenChange={handleClose}>
                <DialogContent className="bg-[rgb(92,41,96)] dark:bg-[#301934] text-white p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-3xl text-center font-bold">
                            Add Attachments
                        </DialogTitle>
                        <DialogDescription className="text-white text-center">
                            Send an image or pdf file
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-8 px-6">
                                <div className="flex items-center justify-center text-center">
                                    <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                endpoint="messageFile"
                                                value={field.value}
                                                onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="px-6 py-4">
                                <Button variant="brain" disabled={isLoading}>
                                    <Upload/>
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}