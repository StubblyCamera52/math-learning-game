"use client";
import { Button } from "@/components/ui/button";
import useGameState from "@/hooks/useGameState";
import { useEffect, useState } from "react";

export default function ClientAssignmentPage({ id }: { id: number }) {
    const { assignmentId, currentQuestion, changeQuestion, completeAssignment, currentAssignment, loadAssignment } = useGameState();
    const [loadedAssignment, setLoadedAssignment] = useState<boolean | null>(null);

    useEffect(() => {
        const load = async () => {
            const result = await loadAssignment(id);
            setLoadedAssignment(result);
        };
        load()
    }, []);

    return (
        <div>
            <Button onClick={() => changeQuestion(1)}>Question 0</Button>
            <h1>Assignment: {assignmentId}</h1>
            <p>success: {loadedAssignment?.toString()}</p>
            <p>Question: {currentQuestion?.text}</p>
            {currentQuestion?.choices.map((label, index) => (
                <Button key={index}>{label}</Button>
                ))}
        </div>
    );
}