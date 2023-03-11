export interface IScreenInterface {
  width: number;
  height: number;
}
export interface IScreenTableInterface {
  id: string;
  row: IScreenInterface;
}

export interface IPayloadAPIInterface {
    host: string | null;
    urls?: string[] | null;
    screen?: IScreenInterface[] | null;
}

export interface ICriticalBundleContextInterface {
    host: string | null;
    urls?: string[] | null;
    screen?: IScreenInterface[] | null;
    setHost?: (value: string | null) => void;
    setUrls?: (value: string[] | null) => void;
    setScreen?: (value: IScreenInterface[] | null) => void;
}