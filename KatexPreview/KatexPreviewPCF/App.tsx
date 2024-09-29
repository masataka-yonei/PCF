import * as React from 'react';
import { Label } from '@fluentui/react';
import { BlockMath } from 'react-katex';

export interface IKatexPreviewSampleProps {
  InputValue?: string;
  InputValueChanged?: (newValue: string) => void;
}


export class KatexPreviewSample extends React.Component<IKatexPreviewSampleProps,{InputValue: string}> {
  constructor(props: IKatexPreviewSampleProps) {
    super(props);
    this.state = {
      InputValue: String(this.props.InputValue),
    };
  }
  
  public render(): React.ReactNode {
    return (
      <Label>
        <textarea cols={30} rows={5} value={this.props.InputValue}  onChange={this.onInputValueChange} />
        <BlockMath>{this.props.InputValue}</BlockMath>
      </Label>
    )
  }

  private onInputValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
      this.setState(
        prevState => (
          {
            InputValue: newValue
          }
        )
      );
      if (this.props.InputValueChanged) {
        this.props.InputValueChanged(newValue);
      }
  };
}