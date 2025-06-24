"use client"

import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {

    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-3xl font-bold"> 🔍 Oop! -  Page Not Found 🥴</h1>
            <p className="text-muted-foreground">The page you're looking for does not exist!!.</p>
            <Button
                onClick={() => router.back()}
                variant="ghost"
                className="mb-6 text-muted-foreground"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back
            </Button>
        </div>
    )
}
