import {ColorResult} from 'react-color';
import {Donut, ISectionsProp} from '../lib';
import {defaultSections} from '../utils/defaults';
import {AddSectionForm, IFormData} from './AddSectionsForm';
import {DonutSettings} from './DonutSettings';
import {SiteHeader} from './header';
import {LegendSettings} from './LegendSettings';

import * as React from 'react';
import './site.css';

interface IPageState {
  background: {value: Partial<ColorResult>},
  foreground: {value: Partial<ColorResult>},
  hasLegend: {value: boolean},
  legendPlacement: {value: string},
  ringThickness: {value: number},
  sections: IFormData[],
  size: {value: number},
  sizeType: {value: string}
};

const settings: IPageState = {
  background: {value: {rgb:{r:1,g:1,b:1,a:1}, hex: "#FFF"}},
  foreground: {value: {rgb:{r:1,g:1,b:1,a:1}, hex: "#D3D3D3"}},
  hasLegend: {value: true},
  legendPlacement: {value: 'top'},
  ringThickness: {value: 20},
  sections: defaultSections,
  size: {value: 200},
  sizeType: {value: 'px'}
}

class HelpPage extends React.Component<{}, IPageState> {

  constructor(props: any) {
    super(props);
    this.state = {...settings};
  }

  public componentDidCatch(error: any, info:any) {
    // You can also log the error to an error reporting service
    // tslint:disable-next-line:no-console
    console.log(error, info);
  }

  public render() {

    const sections = this.state.sections.map((section, index) => {
      const temp:ISectionsProp = {
        color: section.sectionColor.value.hex as string,
        label:section.label.value,
        value:section.percentage.value
      };

      return temp;
    });

    return (
      <div className="container">
        <SiteHeader/>
        <div className="container-donut">
          <Donut
            background={this.state.background.value.hex as string}
            foreground={this.state.foreground.value.hex as string}
            size={this.state.size.value} unit={this.state.sizeType.value} thickness={this.state.ringThickness.value}
            hasLegend={this.state.hasLegend.value} legendPlacement={this.state.legendPlacement.value}
            sections={sections}
            text = "Donut Consumed" total={100}
          />
        </div>
        <div className="container-body">
          <div className="configuration">
            <DonutSettings FormChange={this.FormChange}/>
          </div>
          <div>
            <LegendSettings FormChange={this.FormChange}/>
          </div>
          <div>
            <AddSectionForm FormChange={this.FormChange}/>
          </div>
        </div>
      </div>
    );
  }

  private FormChange = (e: any) => {
    let tempSettings:IPageState = this.state;
    tempSettings = {...e};
    this.setState({...tempSettings});
  }

}

export default HelpPage;
