import { Form, Input, InputNumber } from 'antd';
import { FormComponentProps, FormCreateOption } from 'antd/lib/form';
import React from 'react';
import {ColorResult, RGBColor, SketchPicker} from 'react-color';
import {defaultRGB} from '../DonutSettings';
import {IFormData} from './index';

interface IFormProps {
    sectionData: IFormData
    FormChange: (e: object, index:number) => void,
    index: number
};

interface IFormState {
    sectionColor: RGBColor,
    displayColorPicker: boolean
};

const options: FormCreateOption<IFormProps> = {
    onFieldsChange(props, changedFields:object) {
      if (props.FormChange) {
        props.FormChange(changedFields, props.index);
      }
    }
};

class SectionForm extends React.Component<IFormProps & FormComponentProps, IFormState> {
  constructor(props: IFormProps & FormComponentProps) {
      super(props);
      this.state = {sectionColor: this.props.sectionData.sectionColor.value.rgb as RGBColor, displayColorPicker:false};
  }

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <Form layout="inline">
            <Form.Item label="Value">
                {getFieldDecorator('percentage', {
                    initialValue: this.props.sectionData.percentage.value,
                    rules: [{type: "number"}]
                })(<InputNumber min={0} />)}
            </Form.Item>

            <Form.Item label="Label">
                {getFieldDecorator('label', {
                    initialValue: this.props.sectionData.label.value,
                })(<Input/>)}
            </Form.Item>

            <Form.Item label="Color">
                {getFieldDecorator('sectionColor', {
                    initialValue: defaultRGB
                })(
                    <div>
                        <div style={ this.GetCSS().swatch } onClick={ this.handleClick }>
                        <div style={ this.GetCSS().color } />
                        </div>
                        { this.state.displayColorPicker ?
                        <div style={ this.GetCSS().popover }>
                            <div style={ this.GetCSS().cover } onClick={ this.handleClose }/>
                            <SketchPicker color={ this.GetColor() } onChange={ this.SetColor } />
                        </div>
                        : null
                        }
                    </div>
                )}
            </Form.Item>
        </Form>
    );
  }

  private SetColor = (color: ColorResult) => {
    this.setState({sectionColor : {...color.rgb}});
    this.props.form.setFieldsValue({
        ...{ sectionColor: color }
    });
  }

  private GetColor = () => {
    if (this.state.sectionColor) {
        return this.state.sectionColor;
    }
    return this.props.sectionData.sectionColor.value.rgb as RGBColor;
  }

  private GetCSS = () => {
    const color = this.GetColor();
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

  private handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  private handleClose = () => {
    this.setState({ displayColorPicker: false })
  };
}

export default Form.create<IFormProps>(options)(SectionForm);