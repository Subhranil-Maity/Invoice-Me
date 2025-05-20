import { Separator } from "@/components/ui/separator"

export function OrSeparator() {
    return (
        <div className="flex items-center w-full text-sm text-muted-foreground h-8">
            <Separator className="flex-1" />
            <span className="px-4">or</span>
            <Separator className="flex-1" />
        </div>
    )
}
