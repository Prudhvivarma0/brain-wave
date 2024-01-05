"use client"

import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Challenge name is required"
    }),
    prize: z.string().min(1, {
        message: "Challenge prize is required"
    }),

})

export const CreateChallengeModal = () => {

    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === "createChallenge";

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            prize: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/challenges", values);
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open = {isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-purple-500 dark:bg-[#301934] text-white p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create a Challenge!
                    </DialogTitle>
                    <DialogDescription className="text-center text-white">
                        Give your challenge a name, a prize and image
                    </DialogDescription>
                </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-8 px-6">
                                <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-white dark:text-white ">
                                            Challenge name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={isLoading}
                                            className="bg-white border-0 focus-visible:ring-0 text-zinc-500 focus-visible:ring-offset-0"
                                            placeholder="Enter name"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="prize"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-white dark:text-white ">
                                            Challenge prize
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            disabled={isLoading}
                                            className="bg-white border-0 focus-visible:ring-0 text-zinc-500 focus-visible:ring-offset-0"
                                            placeholder="Enter prize"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />

                            </div>
                            <DialogFooter className="bg-grey-100 px-6 py-4">
                                <Button disabled={isLoading} variant="brain" className="bg-purple-600 dark:bg-purple-900">
                                    Create
                                </Button>

                            </DialogFooter>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>
    )
}
