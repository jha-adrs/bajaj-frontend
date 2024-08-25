import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface HeaderProps {

}

export const Header = ({ }: HeaderProps) => {
    return (
        <Card className="rounded-md">
            <CardHeader>
                <CardTitle>
                    Welcome to my Next.js project
                </CardTitle>
                <CardDescription>
                    Created by Aadarsh Jha, 21BCE0360
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter className="flex flex-col">
                <p>
                    Tech Stack used Frontend: Next.js, TailwindCSS, TypeScript, Vercel
                </p>
                <p>
                    Tech Stack used Backend: Node.JS , Express, Docker, AWS
                </p>
            </CardFooter>
        </Card>
    )
}