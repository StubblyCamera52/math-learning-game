"use client";
import { Button } from "@/components/ui/button";
import useGameState from "@/hooks/useGameState";
import { useEffect, useState } from "react";

export default function ClientAssignmentPage({ id }: { id: number }) {
    const { assignmentId, currentQuestion, changeQuestion, completeAssignment, currentAssignment, loadAssignment, questionIndex } = useGameState();
    const [loadedAssignment, setLoadedAssignment] = useState<boolean | null>(null);

    useEffect(() => {
        const load = async () => {
            const result = await loadAssignment(id);
            setLoadedAssignment(result);
        };
        load();
    }, []);

    return (
        <div>
            <Button onClick={() => changeQuestion(1)}>Question 0</Button>
            <div className="flex flex-row justify-between gap-4">
                <Button className="rounded-full size-12" onClick={() => changeQuestion(questionIndex - 1)}>{"<"}</Button>
                <Button className="rounded-full h-12 grow" onClick={() => changeQuestion(questionIndex+1)}>Next</Button>
            </div>
            <h1>Assignment: {assignmentId}</h1>
            <p>success: {loadedAssignment?.toString()}</p>
        </div>
    );
}