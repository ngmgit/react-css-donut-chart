import {IFillerStyles, ISections, ISectionsProp} from './Donut';

import * as React from 'react';
import * as Default from '../utils/defaults';

export interface IDonutSectionProps {
    sections : Array<Partial<ISections>>
}

interface ILegendSetion {
    label: string, className: string, fillerStyles:any, sectionStyles:any
}

const sectionClass = {
    LEFT: 'cdc-section-left',
    RIGHT: 'cdc-section-right'
};

const maxDegreesPerSection = 180;

class DonutSection extends React.Component<IDonutSectionProps, {}> {

    public render() {
        return (
            <div className="cdc-sections">
            {
                this.createSections().map((section: ISectionsProp & ISections, index: number) => {
                    return (
                        <div
                            key={index} className={`cdc-section ${section.className}`} style={section.sectionStyles}
                        >
                            <div className="cdc-filler" style={section.fillerStyles} title={section.label} />
                        </div>
                    )
                })
            }
            </div>
        );
    }

    private createSections(): ILegendSetion[] {
        let degreesConsumed = 0;
        let offsetBy = 0;

        const calcSections = this.props.sections.map((section: ISectionsProp & ISections, index:number) => {
            let [className, offset] = [sectionClass.RIGHT, -maxDegreesPerSection];

            if (degreesConsumed >= maxDegreesPerSection) {
              [className, offset] = [sectionClass.LEFT, maxDegreesPerSection];
            }

            const degree = offset + (section.degree);
            const fillerStyles: IFillerStyles = {
              backgroundColor: section.color.toString() || Default.defaultColor,
              transform: `rotate(${degree}deg)`
            };
            const sectionStyles = { transform: `rotate(${offsetBy}deg)` };

            degreesConsumed += (section.degree);

            if (degreesConsumed === maxDegreesPerSection) {
                offsetBy = 0;
            }
            else {
                offsetBy += (section.degree);
            }


            return { label: section.label, className, fillerStyles, sectionStyles };
        });

        return calcSections;
    }
}

export default DonutSection;