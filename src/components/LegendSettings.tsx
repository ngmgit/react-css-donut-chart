import { Checkbox, Form, Select } from 'antd';
import { FormComponentProps, FormCreateOption } from 'antd/lib/form';
import React from 'react';

interface ISettingsProp extends ILegendSettingsState{
  FormChange?: (e: object) => void
}

export interface ILegendSettingsState {
  hasLegend?: any,
  legendPlacement?:any,
}

const options: FormCreateOption<ISettingsProp & ILegendSettingsState> = {
    onFieldsChange(props, changedFields:object) {
      if (props.FormChange) {
        props.FormChange(changedFields);
      }
    }
};

const Option = Select.Option;

class LegendForm extends React.Component<ISettingsProp & FormComponentProps, ILegendSettingsState> {
  constructor(props: ISettingsProp & FormComponentProps) {
      super(props);
  }

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
      <h2>Legend configuration</h2>
      <Form layout="inline">

        <Form.Item label="Has Legend?">
          {getFieldDecorator('hasLegend', {
            initialValue: true,
            valuePropName: 'checked'
          })(<Checkbox/>)}
        </Form.Item>

        <Form.Item label="Legend Placement">
          {getFieldDecorator('legendPlacement', {
            initialValue: 'top',
          })(<Select>
              <Option value="top">Top</Option>
              <Option value="right">Right</Option>
              <Option value="bottom">Bottom</Option>
              <Option value="left">Left</Option>
          </Select>)}
        </Form.Item>

      </Form>
      </React.Fragment>
    );
  }
}

export const LegendSettings = Form.create<ISettingsProp>(options)(LegendForm);