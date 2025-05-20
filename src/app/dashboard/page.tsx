"use client"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Dashboard() {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="max-w-md rounded-lg border md:min-w-[100vw]"
            style={{height: "calc(100vh - 4rem)"}}
        >
            <ResizablePanel defaultSize={15} minSize={10} maxSize={15}>
                <div className="flex h-[200px] items-center justify-center p-6">
                    <span className="font-semibold">One</span>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Two</span>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25} minSize={25} maxSize={35}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Three</span>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}