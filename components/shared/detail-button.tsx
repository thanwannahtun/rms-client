import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";

export function DetailButton ({onDetail}: {onDetail: () => void}) {
    return (
        <Button variant="ghost" onClick={onDetail}>
            <SquareArrowOutUpRight />
        </Button>
    );
}