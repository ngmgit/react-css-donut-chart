import {IFormData} from "../components/AddSectionsForm";
import {defaultRGB} from '../components/DonutSettings';
import colors from "../lib/utils/colors";
import {hexToRgb} from "./hexToRGB";

export const defaultSections : IFormData[] = [
    {
        label: {value: 'Rent'},
        percentage: {value: 20},
        sectionColor: {
            value: {hex: colors[0], rgb: hexToRgb(colors[0])}
        }

    },
    {
        label: {value: 'Food'},
        percentage: {value: 10},
        sectionColor: {
            value: {hex: colors[1], rgb: hexToRgb(colors[1])}
        }
    },
    {
        label: {value: 'Water'},
        percentage: {value: 25},
        sectionColor: {
            value: {hex: colors[2], rgb: hexToRgb(colors[2])}
        }
    },
    {
        label: {value: 'Party'},
        percentage: {value: 5},
        sectionColor: {
            value: {hex: colors[3], rgb: hexToRgb(colors[3])}
        }
    }
];