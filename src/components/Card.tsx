import { ReactNode } from "react"

interface CardProps {
    children: ReactNode
}

function Card({ children }: CardProps) {
    return <div className="border rounded-xl">{children}</div>
}

export default Card;