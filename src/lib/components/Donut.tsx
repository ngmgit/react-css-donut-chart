import defaultColors from '../utils/colors';
import { IPlacementStyle, placement, placementStyles } from '../utils/defaults';
import DonutSection from './DonutSection';

import * as React from 'react';


import '../styles/main.css';

export interface IFillerStyles {
    backgroundColor: string,
    transform: string
}

export interface ISectionsProp {
    label: string,
    color: string,
    value: number,
}

export interface ISections {
    degree: number,
    className: string,
    fillerStyles: IFillerStyles,
    sectionStyles: {transform: string}
}

export interface ILegend {
    label:string,
    percent:string,
    styles: object
}

export interface IDonutProps {
    size: number,
    unit: string,
    thickness: number,
    text: string,
    background: string,
    foreground: string,
    sections: ISectionsProp[],
    hasLegend: boolean,
    legendPlacement: string,
    total: number
}

interface IDonutState {
    fontSize: string
}

const degreesInACircle = 360;
const degreesInASection = 180;

export class Donut extends React.Component<IDonutProps, IDonutState> {

    constructor(props: IDonutProps) {
        super(props);

        this.state= {
            fontSize: '1em'
        };
    }

    public getTotalValue() {
        const valueTotal =  this.props.sections.reduce((a, c) => a + c.value, 0);
        return valueTotal;
    }

    public render() {
        return (
            <React.Fragment>
                <div className="cdc-container" style={this.placementStyles().container}>
                    <div className="cdc"  style={this.donutStyles()}>
                        <DonutSection sections={this.donutSections()} />
                        <div className="cdc-overlay" style={this.overlayStyles()}>
                            <div className="cdc-text" style={this.donutTextStyles()}>
                                { (this.getTotalValue() > this.props.total)?
                                    `Error: Sum of section > ${this.props.total}`
                                    :
                                    this.getLegendText()
                                }
                            </div>
                        </div>
                    </div>
                    {this.getLegendNode()}
                </div>
            </React.Fragment>
        )
    }

    private getLegendText() {
        if (this.props.children) {
            return this.props.children;
        }

        return (
            <React.Fragment>
                <h1 style={{margin: 0}}><strong>{ this.getTotalValue() }%</strong></h1>
                {this.props.text}
            </React.Fragment>
        )
    }

    private donutSections() {
        let consumedDegrees = 0;
        let currentDefaultColorIdx = 0;

        const sections: Array<ISectionsProp & Partial<ISections>> = [];
        if (this.getTotalValue() > this.props.total) {
            return [];
        }

        this.props.sections.forEach( (section: ISectionsProp) => {

          const valToDeg = degreesInACircle * (section.value / this.props.total);
          let degreeArr = [valToDeg];

          if (valToDeg > degreesInASection) {
            degreeArr = [degreesInASection, valToDeg - degreesInASection];
          }

          const color = section.color || defaultColors[currentDefaultColorIdx++];

          degreeArr.forEach(degree => {
            const consumedWithCurrent = consumedDegrees + degree;

            if (consumedWithCurrent > degreesInASection) {
              const remainingDegreesInCurrentSection = degreesInASection - consumedDegrees;

              sections.push(
                Object.assign(
                  {}, section, { degree: remainingDegreesInCurrentSection, color }
                ),
                Object.assign(
                  {}, section, { degree: degree - remainingDegreesInCurrentSection, color }
                )
              );
            }
            else {
              sections.push(Object.assign({}, section, { degree, color }));
            }

            consumedDegrees += degree;
            if (consumedDegrees >= degreesInASection) {
              consumedDegrees -= degreesInASection;
            }
          });
        });
        return sections;
    }

    private legend(): ILegend[] {
        if (!this.props.hasLegend) {
            return [];
        }

        let currentDefaultColorIdx = 0;

        return this.props.sections.map((section, idx) => ({
            label: section.label || `Section ${idx + 1}`,
            percent: `${section.value} (${(section.value / this.getTotalValue()) * 100}%)`,
            styles: {
                backgroundColor: section.color || defaultColors[currentDefaultColorIdx++]
            }
        }));
    }

    private placementStyles(): Partial<IPlacementStyle> {
        if (!this.props.hasLegend) {
            return {};
        }


        const style = placementStyles[this.props.legendPlacement] as IPlacementStyle;
        return style;
    }

    private donutStyles() {
        let width:string;

        width= `${this.props.size}${this.props.unit}`;

        const styles = {
            backgroundColor: this.props.foreground,
            height: 'auto',
            paddingBottom: width,
            width,
        };
        return styles;
    }

    private overlayStyles(): React.CSSProperties {
        const availablePercent = 100;
        const size = availablePercent - this.props.thickness;
        const sizePercent = `${size}%`;
        const pos = `calc(50% - ${size / 2}%)`;
        return {
            backgroundColor: this.props.background,
            height: sizePercent,
            left: pos,
            top: pos,
            width: sizePercent
        };
    }

    private donutTextStyles() {
        const { fontSize } = this.state;
        return { fontSize };
    }

    private getLegendNode() {

        if (this.props.hasLegend)
        {
            return (
                <div className="cdc-legend" style={this.placementStyles().legend}>
                    {
                        this.legend().map((item: ILegend , idx: number) => {
                            return (
                                <span className="cdc-legend-item" key={idx} title={item.percent}>
                                    <span className="cdc-legend-item-color" style={item.styles}/>
                                    <span>{ item.label }</span>
                                </span>
                            )
                        })
                    }
                </div>
            )
        }

        return null;
    }


}
