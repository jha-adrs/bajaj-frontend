import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { z } from "zod"
import { FormComponent } from "./Form"


interface HeaderProps {

}

export const Header = ({ }: HeaderProps) => {
    return (
        <Card className=" rounded-md w-full max-w-screen md:max-w-lg">
            <CardHeader>
                <CardTitle>
                    Welcome to my Next.js project
                </CardTitle>
                <CardDescription>
                    Created by Aadarsh Jha, 21BCE0360
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <FormComponent />
            </CardContent>
            <CardFooter className="flex flex-col gap-3 font-medium items-start justify-start">
                <p>
                    Tech Stack used Frontend: <p className="font-semibold">NextJS, TailwindCSS, TypeScript, Vercel</p>
                </p>
                <p className="font-medium">
                    Tech Stack used Backend: <p className="font-semibold">
                    NodeJS , Express, AWS App Runner, Docker
                    </p>
                </p>
            </CardFooter>
        </Card>
    )
}