import { IChartApi, ISeriesApi } from "lightweight-charts";

export type UnitChartRefType = {
    chart: IChartApi;
    serie: ISeriesApi<any>;
    updateSelectedTime: (time: number | null) => void;
  };