import { Button } from "@/components/ui/button"
import { AssignmentData, AssignmentDataAnswerMultipleChoiceOption } from "@/data/assignmentDataTypes"
import Image from "next/image"
import { FC } from "react"
//import React, {useState, useEffect} from "react"

export default async function AssignmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const assignmentDataFile = await fetch("http://localhost:3000/data/assignment/" + id + "/page.json")
    const assignmentData = await assignmentDataFile.json() as AssignmentData

    return (<main className="flex flex-col gap-8 items-center justify-center w-screen h-screen bg-background">
        <div className="flex flex-col gap-3">
            <img src={assignmentData.questions[0].imageUrl} width={500} height={500} alt="question alt" className="rounded-lg"></img>
            {/* the assignment questions vvv dont ask why there is an error ill fix it later */}
            {assignmentData.questions[0].options.map((answer, index) => (
                <AssignmentAnswerButton answerData={answer} key={index}></AssignmentAnswerButton>
            ))}
        </div>
    </main>);
}

const AssignmentAnswerButton: React.FC<{ answerData: AssignmentDataAnswerMultipleChoiceOption }> = ({ answerData }) => {
    return <Button className="w-full">{answerData.answerDisplayString}</Button>
}