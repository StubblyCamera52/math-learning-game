import { Button } from "@/components/ui/button"
import ClientAssignmentPage from "./client";
//import React, {useState, useEffect} from "react"

export default async function AssignmentPage({ params }: { params: Promise<{ id: string }> }) {
    const urlParams = await params
    const id = parseInt(urlParams.id)

    return (
        <main className="flex flex-col gap-8 items-center justify-center w-screen h-screen bg-background">
            <ClientAssignmentPage id={id}></ClientAssignmentPage>
        </main>
    );
}