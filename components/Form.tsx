"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { apiEndpoints } from '@/lib/api';
import axios from 'axios';


export const FormComponent = () => {
    const schema = z.object({
        data: z.string().refine((val) => {
            try {
                JSON.parse(val);

                return true;
            } catch (error) {
                //toast.error("Please input a valid JSON")
            }
        }, { message: "Invalid JSON detected" })
    }, { message: "Input is required" });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const {
        isPending,
        mutate: onSubmitMutation,
        data: apiData
    } = useMutation({
        mutationKey: ['submit'],
        mutationFn: async () => {
            const url = apiEndpoints.POST;

            const { data } = await axios({
                method: "POST",
                url,
                data: JSON.parse(form.getValues('data'))
                
            })

            return data;
        },
        onSuccess: () => {
            toast.success('Data submitted successfully')
        },
        onError: () => {
            toast.error('Error submitting data')
        }
    })

    const sampleInput = {
        data: ["A", "B", "C", "1", "a"]
    }






    return (
        <div className="gap-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(() => {
                    onSubmitMutation()
                })} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="data"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>API Input</FormLabel>
                                <FormControl>
                                    <Input placeholder="API Input"
                                        type='text'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Sample Input: {
                                        JSON.stringify(sampleInput)
                                    }
                                </FormDescription>
                                <FormMessage className='text-rose-500' />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={isPending}
                        type="submit" className='w-full'>
                        {
                            isPending ? <Loader className='w-4 h-4 animate-spin' /> : "Submit"
                        }
                    </Button>
                </form>
            </Form>

            <div className="flex flex-col gap-2">
                {
                    apiData ? (<div>
                        {JSON.stringify(apiData)}
                    </div>) : null
                }
            </div>
        </div>
    )
}