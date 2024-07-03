import { useHotkeys } from "react-hotkeys-hook";

import useHotKeysDialog from "@/store/hotkeys";
import useSidebar from "@/store/sidebar";
import { useTheme } from "@/hooks/use-theme";
import NextModal from "@/components/modal";
import { Button } from "@nextui-org/react";

function HotKeys() {
    const { toggleTheme } = useTheme();
    const [, sidebarActions] = useSidebar();
    const [isHotKeysDialogOpen, hotKeysDialogActions] = useHotKeysDialog();

    // I would love to define all hotkeys in the config and loop it here and avoid this repetitive code.
    // But the `react-hotkeys-hook` library, which we use to handle hotkeys provides only hook (`useHotkeys`).
    // And as you know we can't use hooks inside loops (read "Rules of Hooks" - https://reactjs.org/docs/hooks-rules.html).
    // There is always a workaround, but sometimes it's better to avoid premature and unnecessary optimizations :)
    useHotkeys("alt+s", sidebarActions.toggle);
    useHotkeys("alt+t", toggleTheme);
    useHotkeys("alt+k", hotKeysDialogActions.toggle);

    return (
        <NextModal>
            <p>{isHotKeysDialogOpen}</p>
            <Button onClick={hotKeysDialogActions.toggle} variant="bordered">
                Hot Keys
            </Button>
            <div className="row-center">
                <p>Toggle Theme</p>
                <Button color="warning" variant="bordered" onClick={toggleTheme}>
                    alt + t
                </Button>
            </div>
            <div className="row-center">
                <p>Toggle Sidebar</p>
                <Button color="warning" variant="bordered" onClick={sidebarActions.toggle}>
                    alt + s
                </Button>
            </div>
            <div className="row-center">
                <p>Toggle Hot Keys&apos; Dialog</p>
                <Button color="warning" variant="bordered" onClick={hotKeysDialogActions.toggle}>
                    alt + k
                </Button>
            </div>
        </NextModal>
    );
}

export default HotKeys;
