"use client";
import useGameState from "@/hooks/useGameState";
import { useEffect, useState } from "react";

export default function ClientAssignmentPage({ id }: { id: number }) {
    const { assignmentId, currentQuestion, changeQuestion, completeAssignment, currentAssignment, loadAssignment } = useGameState();
    const [loadedAssignment, setLoadedAssignment] = useState<boolean | null>(null);

    useEffect(() => {
        const load = async () => {
            const result = await loadAssignment(id);
            setLoadedAssignment(result);
            if (result) {
                changeQuestion(0)
            }
        };
        load()
    }, []);

    return (
        <div>
            <h1>Assignment: {assignmentId}</h1>
            <p>success: {loadedAssignment?.toString()}</p>
            <p>Question: {currentQuestion?.text}</p>
        </div>
    );
}