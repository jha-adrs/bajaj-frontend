"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useReducer, useState } from 'react';
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
import { ALargeSmallIcon, CaseLowerIcon, HashIcon, Loader } from 'lucide-react';
import { apiEndpoints } from '@/lib/api';
import axios from 'axios';
import Select, { MultiValue } from 'react-select'
const APIResposeSchema = z.object({
    is_success: z.boolean(),
    numbers: z.array(z.string()),
    alphabets: z.array(z.string()),
    highest_lowercase_alphabet: z.array(z.string())
});

const selectOptions = [
    { value: 'numbers', label: "Numbers", icon: HashIcon },
    { value: 'alphabets', label: "Alphabets", icon: ALargeSmallIcon },
    { value: 'highest_lowercase_alphabet', label: "Highest Lowecase Alphabet", icon: CaseLowerIcon },

]

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
    const [attributes, setAttributes] = useState<MultiValue<{ value: string; label: string; }>>([]);
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

            return APIResposeSchema.parse(data);
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

    const getValueString = (val: string) => {
        if (val === "numbers") {
            console.log(apiData?.numbers);
            
            return apiData?.numbers.join(",");
        }
        if (val === "alphabets") {
            console.log(apiData?.alphabets);
            return apiData?.alphabets.join(",");
        }
        if (val === "highest_lowercase_alphabet") {
            console.log(apiData?.highest_lowercase_alphabet);
            return apiData?.highest_lowercase_alphabet.join(",")
        }
        return ""

    }

    return (
        <div className="space-y-4">
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
                        <Select
                            onChange={(e) => {
                                setAttributes(e);
                            }}
                            isMulti
                            options={selectOptions} name='Attributes'
                            
                        />
                    </div>) : null
                }

                <div className="flex flex-col gap-4 w-full py-4">
                    <p className="font-semibold text-sm">
                        Results:
                    </p>
                    <div className="flex flex-col space-y-4">
                        {
                            apiData ? (attributes?.map((att, index) => {
                                const curr = selectOptions.find((val) => val.label == att.label)
                                return (
                                    <div key={index} className="inline-flex">
                                        {
                                            curr ? (
                                                <div className="flex flex-row items-center gap-2">
                                                    <div className="flex w-8 h-8 items-center justify-center bg-accent rounded-md">
                                                        <curr.icon className=' w-4 h-4 text-primary' />
                                                    </div>
                                                    <p className="font-medium text-sm">
                                                        {curr.label}:
                                                    </p>
                                                    <p className="font-semibold text-sm">
                                                        {
                                                            getValueString(curr.value)
                                                        }
                                                    </p>
                                                </div>
                                            ) : null
                                        }
                                    </div>

                                )
                            })) : (
                                <div className="flex bg-accent items-center justify-center w-full min-h-32 rounded-md">
                                    <p className="font-medium text-sm text-muted-foreground">
                                        Submit to view.
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}