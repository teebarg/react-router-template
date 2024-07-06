import { Button, DropZone, FileTrigger } from "react-aria-components";
import type { FileDropItem } from "react-aria";
import React from "react";

interface props {}

const DragNDrop: React.FC<props> = () => {
    const [files, setFiles] = React.useState<any>(null);

    return (
        <DropZone
            onDrop={(e) => {
                const files = e.items.filter((file: any) => file.kind === "file") as FileDropItem[];
                const filenames = files.map((file) => file.name);
                setFiles(filenames.join(", "));
            }}
        >
            <FileTrigger
                allowsMultiple
                onSelect={(e: any) => {
                    const files = Array.from(e);
                    const filenames = files.map((file: any) => file.name);
                    setFiles(filenames.join(", "));
                }}
            >
                <Button>Select files</Button>
            </FileTrigger>
            <div slot="label" style={{ display: "block" }}>
                {files || "Drop files here"}
            </div>
        </DropZone>
    );
};

export { DragNDrop };
