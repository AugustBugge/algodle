"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface InputWithButtonProps {
  onGuess: (guess: string) => void
}

export function InputWithButton({ onGuess }: InputWithButtonProps) {
  const [guess, setGuess] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (guess.trim() !== "") {
      onGuess(guess.trim())
      setGuess("") // optional: clear after submit
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center gap-2"
    >
      <Input
        type="text"
        placeholder="Choose an algorithm"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <Button type="submit" variant="outline">
        Guess
      </Button>
    </form>
  )
}

