/*ComponentFrameworkで自動生成されないので、ここでイベント型を記述*/
export interface ContextExtended<T> extends ComponentFramework.Context<T> {
    parameters: T;
    events: IEventBag;
}
export declare type IEventBag = Record<string, () => void>;
