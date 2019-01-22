import { Form, InputNumber, Select } from 'antd';
import { FormComponentProps, FormCreateOption } from 'antd/lib/form';
import React from 'react';
import {ColorResult, RGBColor, SketchPicker} from 'react-color';


interface ISettingsProp extends IDonutSettingsState{
  FormChange?: (e: object) => void
}

export interface IDonutSettingsState {
  background?: RGBColor,
  foreground?: RGBColor,
  size?: any,
  sizeType?:any,
  ringThickness?: any,
  displayBgColorPicker?: boolean
  displayFgColorPicker?: boolean
}

const options: FormCreateOption<ISettingsProp & IDonutSettingsState> = {
    onFieldsChange(props, changedFields:object) {
      if (props.FormChange) {
        props.FormChange(changedFields);
      }
    }
};

export const defaultRGB = {r:0, g:0, b:0, a:1};
const Option = Select.Option;

class SettingsForm extends React.Component<ISettingsProp & FormComponentProps, IDonutSettingsState> {
  constructor(props: ISettingsProp & FormComponentProps) {
      super(props);
      this.state = {
        background: defaultRGB,
        displayBgColorPicker: false,
        displayFgColorPicker: false,
        foreground: defaultRGB
      };
  }

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <h2>Donut Configuration</h2>
        <Form layout="inline">

          <Form.Item label="Background">
            {
              getFieldDecorator('background', {
                initialValue: defaultRGB
              })(
                <div>
                  <div style={ this.BgCallbacks().GetCSS().swatch } onClick={ this.BgCallbacks().handleClick }>
                    <div style={ this.BgCallbacks().GetCSS().color } />
                  </div>
                  { this.state.displayBgColorPicker ?
                    <div style={ this.BgCallbacks().GetCSS().popover }>
                      <div style={ this.BgCallbacks().GetCSS().cover } onClick={ this.BgCallbacks().handleClose }/>
                      <SketchPicker color={ this.BgCallbacks().GetColor() } onChange={ this.SetBackgroundColor } />
                    </div>
                    : null
                  }
                </div>
              )
            }
          </Form.Item>

          <Form.Item label="Foreground">
            {getFieldDecorator('foreground', {
              initialValue: defaultRGB,
            })(

              <div>
                  <div style={ this.FgCallbacks().GetCSS().swatch } onClick={ this.FgCallbacks().handleClick }>
                    <div style={ this.FgCallbacks().GetCSS().color } />
                  </div>
                  { this.state.displayFgColorPicker ?
                    <div style={ this.FgCallbacks().GetCSS().popover }>
                      <div style={ this.FgCallbacks().GetCSS().cover } onClick={ this.FgCallbacks().handleClose }/>
                      <SketchPicker color={ this.FgCallbacks().GetColor() } onChange={ this.SetForegoundColor } />
                    </div>
                    : null
                  }
              </div>
            )}
          </Form.Item>

          <Form.Item label="Size">
            {getFieldDecorator('size', {
              initialValue: 250,
            })(<InputNumber/>)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('sizeType', {
              initialValue: 'px',
            })(<Select>
                <Option value="px">px</Option>
                <Option value="%">%</Option>
            </Select>)}
          </Form.Item>

          <Form.Item label="Ring Thickness(%)">
            {getFieldDecorator('ringThickness', {
              initialValue: '20',
            })(<InputNumber/>)}

          </Form.Item>

        </Form>
      </div>
    );
  }

  private BgCallbacks = () => {
    return {
      GetCSS: this.GetBgCSS,
      GetColor: this.GetBgColor,
      handleClick: this.handleBgClick,
      handleClose: this.handleBgClose,
    }
  }

  private FgCallbacks = () => {
    return {
      GetCSS: this.GetFgCSS,
      GetColor: this.GetFgColor,
      handleClick: this.handleFgClick,
      handleClose: this.handleFgClose,
    }
  }

  /***** BG section *****/

  private SetBackgroundColor = (color: ColorResult) => {
    this.setState({background : {...color.rgb}});
    this.props.form.setFieldsValue({
      ...{ background: color }
    });
  }

  private GetBgColor = () => {
    if (this.state.background) {
      return this.state.background;
    }
    return defaultRGB;
  }

  private GetBgCSS = () => {
    const BgColor = this.GetBgColor();
    return this.GetNewCSS(BgColor);
  }

  private handleBgClick = () => {
    this.setState({ displayBgColorPicker: !this.state.displayBgColorPicker })
  };

  private handleBgClose = () => {

    // tslint:disable-next-line:no-console
    console.log('triggered');
    this.setState({ displayBgColorPicker: false })
  };

  /* BG Section End */

  /***** FG Section *****/

  private SetForegoundColor = (color: ColorResult) => {
    this.setState({foreground : {...color.rgb}});
    this.props.form.setFieldsValue({
      ...{ foreground: color }
    });
  }

  private GetFgColor = () => {
    if (this.state.foreground) {
      return this.state.foreground;
    }
    return defaultRGB;
  }

  private GetFgCSS = () => {
    const FgColor = this.GetFgColor();
    return this.GetNewCSS(FgColor);
  }

  private handleFgClick = () => {
    this.setState({ displayFgColorPicker: !this.state.displayFgColorPicker })
  };

  private handleFgClose = () => {
    this.setState({ displayFgColorPicker: false })
  };
  /* FG Section */

  private GetNewCSS = (color: RGBColor) => {
    return {
      color: {
        background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
        borderRadius: '2px',
        height: '21px',
        width: '40px',
      },
      cover: {
        bottom: '0px',
        left: '0px',
        position: 'fixed' as 'fixed',
        right: '0px',
        top: '0px'
      },
      popover: {
        position: 'absolute' as 'absolute',
        zIndex: 2
      },
      swatch: {
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        cursor: 'pointer',
        display: 'inline-block',
        marginTop: '5px',
        padding: '5px'
      }
    }
  }
}

export const DonutSettings = Form.create<ISettingsProp>(options)(SettingsForm);