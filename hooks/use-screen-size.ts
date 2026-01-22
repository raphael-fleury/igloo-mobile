import { Breakpoints } from "@/constants/theme";
import { Breakpoint } from "@/constants/theme/breakpoints";
import { useWindowDimensions } from "react-native";

export function useScreenSize() {
    const { width } = useWindowDimensions();

    let size = 'xs';
    for (const key of Object.keys(Breakpoints)) {
        if (width > Breakpoints[key as Breakpoint]) {
            size = key;
        } else {
            break;
        }
    }

    return size as Breakpoint;
}