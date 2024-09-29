import * as React from 'react';  

// 型定義
interface GrapeCity {  
  ActiveReports: {  
    JSViewer: {  
      create: (config: 
          { 
            element: string;
            reportService: { url: string }  
          }
      ) => ViewerInstance;  
    };  
  };  
}  
  
// ViewerInstance の型定義
interface ViewerInstance {  
  openReport: (
    report: string | null,
    reportParameters: Array<{ name: string; values: string[]}> 
  ) => void;  
}  
  
interface Window {  
  GrapeCity: GrapeCity;  
}  
  
declare let window: Window;  
  
// 追加するプロパティ  
export interface IViewerProps {  
  Server_Url?: string | null;  
  Reports_ID?: string | null;  
  Reports_Loading?: boolean | false;  
  Reports_Parameter?: string | null;  
  Style_Width?: string;  
  Style_Height?: string;  
}  
  
export class Viewer extends React.Component<IViewerProps> {  
  viewer: ViewerInstance | null = null;  
  //_reportParameters: Array<{ name: string; values: string[] }> = [];  
  
  constructor(props: IViewerProps) {  
    super(props);  

    
  
    // if (this.props.Reports_Parameter) {  
    //   try {  
    //     this._reportParameters = [JSON.parse(this.props.Reports_Parameter)];  
    //   } catch (error) {  
    //     console.error("Failed to parse Reports_Parameter:", error);  
    //   }  
    // }  

  }  

    
  componentDidMount() {  
    let _reportParameters: Array<{ name: string; values: string[] }> = [];  
    if (window.GrapeCity && window.GrapeCity.ActiveReports) {  
      if (this.props.Reports_Parameter) {  
        
        try {  
          _reportParameters = [JSON.parse(this.props.Reports_Parameter)];  
        } catch (error) {  
          console.error("Failed to parse Reports_Parameter:", error);  
        }  
      }  
  

      this.viewer = window.GrapeCity.ActiveReports.JSViewer.create({  
        element: '#viewer-host',  
        reportService: {  
          url: (this.props.Server_Url ?? '') + 'api/reporting',  
        }
      });  

      console.log(_reportParameters)

      if (this.props.Reports_Loading) { 
        
        this.viewer.openReport(this.props.Reports_ID ?? null, _reportParameters );  
      }
    }  
  }  
  
  componentDidUpdate() {  
    let _reportParameters: Array<{ name: string; values: string[] }> = [];  
    if (this.props.Reports_Parameter) {  
      try {  
        _reportParameters = [JSON.parse(this.props.Reports_Parameter)];  
      } catch (error) {  
        console.error("Failed to parse Reports_Parameter:", error);  
      }  
    }  

    if (this.viewer && this.props.Reports_Loading) {  
      
      this.viewer.openReport(this.props.Reports_ID ?? null, _reportParameters);  
    }  
  }  
  
  render() {  
    const viewerStyle = {  
      width: this.props.Style_Width || '100%',  
      height: this.props.Style_Height || '100vh'  
    };  
  
        
  
    return (  
      <div>  
        <div id="viewer-host" style={viewerStyle} />  
      </div>  
    );  
  }  
}  
