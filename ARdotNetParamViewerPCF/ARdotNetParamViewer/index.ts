import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { Viewer, IViewerProps } from "./App";  
import * as React from "react";
import "@mescius/activereportsnet-viewer-ja/dist/jsViewer.min.js";

export class ARdotNetParamViewer implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private props: IViewerProps = { Server_Url: 'http://example.com/', Reports_ID: 'Invoice.rdlx', Reports_Loading:false, Reports_Parameter:null, Style_Width: '100%', Style_Height: '100vh' };  

    /**
     * 空のコンストラクタ。
     */
    constructor() { }

    /**
     * コントロールのインスタンスを初期化するために使用されます。ここでリモートサーバー呼び出しや他の初期化アクションを開始できます。
     * データセットの値はここでは初期化されません。updateViewを使用してください。
     * @param context コンテキストオブジェクトを介して制御できるプロパティバッグ全体。これは、マニフェストで定義されたプロパティ名にマッピングされたカスタマイザによって設定された値やユーティリティ関数を含みます。
     * @param notifyOutputChanged コントロールに新しい出力が非同期で取得可能であることをフレームワークに通知するコールバックメソッド。
     * @param state 単一ユーザーの1つのセッション内で持続するデータ。Modeインターフェイスで 'setControlState' を呼び出すことにより、コントロールのライフサイクルの任意の時点で設定できます。
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.props.Server_Url = context.parameters.Server_Url.raw || 'http://example.com/';  
        this.props.Reports_ID = context.parameters.Reports_ID.raw || 'Invoice.rdlx';  
        this.props.Reports_Loading = context.parameters.Reports_Loading.raw.valueOf() || false;  
        this.props.Reports_Parameter = context.parameters.Reports_Parameter.raw || null;  
        this.props.Style_Width = context.parameters.Style_Width?.raw || '100%';  
        this.props.Style_Height = context.parameters.Style_Height?.raw || '100vh';  
    }

    /**
     * プロパティバッグ内の任意の値が変更されたときに呼び出されます。これには、フィールド値、データセット、コンテナの高さや幅などのグローバル値、オフラインステータス、ラベル、可視性などのコントロールメタデータ値が含まれます。
     * @param context コンテキストオブジェクトを介して制御できるプロパティバッグ全体。これは、マニフェストで定義された名前にマッピングされたカスタマイザによって設定された値やユーティリティ関数を含みます。
     * @returns ReactElement コントロールのルートReact要素を返します。
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this.props.Server_Url = context.parameters.Server_Url.raw || 'http://example.com/';  
        this.props.Reports_ID = context.parameters.Reports_ID.raw || 'Invoice.rdlx';  
        this.props.Reports_Loading = context.parameters.Reports_Loading.raw.valueOf() || false;  
        this.props.Reports_Parameter = context.parameters.Reports_Parameter.raw || null;  
        this.props.Style_Width = context.parameters.Style_Width?.raw || '100%';  
        this.props.Style_Height = context.parameters.Style_Height?.raw || '100vh';  
    
        return React.createElement(
            Viewer, this.props
        );
    }

    /**
     * コントロールが新しいデータを受け取る前に、フレームワークによって呼び出されます。
     * @returns マニフェストで定義された命名法に基づくオブジェクトを返します。「bound」または「output」とマークされたプロパティに対するオブジェクトを期待します。
     */
    public getOutputs(): IOutputs {
        return { };
    }

    /**
     * コントロールがDOMツリーから削除されるときに呼び出されます。コントロールはこの呼び出しを使用してクリーンアップを行うべきです。
     * 例: 保留中のリモート呼び出しのキャンセル、リスナーの削除など。
     */
    public destroy(): void {
        // 必要に応じてコントロールをクリーンアップするコードを追加
    }
}
