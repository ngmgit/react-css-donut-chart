import React from 'react';
import {ColorResult} from 'react-color';

import {defaultSections} from '../../utils/defaults';
import SectionForm from './SectionForm';

export interface IFormData {
    label: {value: string},
    percentage: {value: number},
    sectionColor: {value: Partial<ColorResult>}
}

interface IState {
    sections: IFormData[]
}

interface IAddSectionProps {
    FormChange: (e:any)=> void
}

export class AddSectionForm extends React.Component<IAddSectionProps, IState> {

    constructor(props:IAddSectionProps) {
        super(props);
        this.state = {sections: defaultSections};
    }

    public render() {
        return (
            <div>
                <h2>Donut Sections</h2>
                {
                    this.state.sections.map((section, index) => {
                        return <SectionForm sectionData={section} key= {index} index= {index} FormChange={this.handleFormChange}/>
                    })
                }
            </div>
        );
    }

    private handleFormChange = (e: Partial<IFormData>, index:number) => {
        const {sections} = this.state;
        sections[index] = {...sections[index], ...e};
        this.setState({
            sections,
        });
        this.props.FormChange(this.state.sections);
    };
}