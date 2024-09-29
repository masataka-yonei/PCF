import { IInputs} from "./generated/ManifestTypes";
import { ContextExtended } from './ContextExtended'; //拡張タイプを追加
import * as React from 'react';
import { Label, Stylesheet } from '@fluentui/react';
import { CompoundButton } from '@fluentui/react/lib/Button';
import { BlockMath } from 'react-katex';

export interface IHelloWorldProps {
  name?: string;
  fwcontext?:ContextExtended<IInputs>
  onPCFButtonClick?: () => void; // ボタンのクリックイベントハンドラを受け取るプロパティ  
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (
      <div>
      <CompoundButton
       style={{ width: '95%', height: '95%' }}
       primary={this.props.fwcontext?.parameters.PCFButton_primary.raw} 
       secondaryText={this.props.fwcontext?.parameters.PCFButton_secondaryText.raw || ''} 
       disabled={this.props.fwcontext?.parameters.PCFButton_Disabled.raw} 
       checked={this.props.fwcontext?.parameters.PCFButton_checked.raw}
       onClick={this.props.onPCFButtonClick} // ボタンのクリックイベントハンドラを設定
        >
        {this.props.fwcontext?.parameters.PCFButton_text.raw}
      </CompoundButton>
      
      <BlockMath>{this.props.fwcontext?.parameters.sampleProperty.raw}</BlockMath>

      <h3>データセットの内容表示</h3>  
      <table>  
        <thead>  
            <tr>  
                {this.props.fwcontext?.parameters.DatasetList.columns.map(column => (  
                    <th key={column.name}>{column.displayName}</th>  
                ))}  
            </tr>  
        </thead>  
        <tbody>  
            {this.props.fwcontext?.parameters.DatasetList.sortedRecordIds.map(recordId => (  
                <tr key={recordId}>  
                    {this.props.fwcontext?.parameters.DatasetList.columns.map(column => (  
                        <td key={column.name}>{this.props.fwcontext?.parameters.DatasetList.records[recordId].getFormattedValue(column.name)}</td>  
                    ))}  
                </tr>  
            ))}  
        </tbody>  
      </table>
      </div>
    )
  }
}
