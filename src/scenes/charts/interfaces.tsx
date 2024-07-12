import { IChartApi, ISeriesApi } from "lightweight-charts";
import { AssetModel } from "../../models/asset";

export type UnitChartRefType = {
    chart: IChartApi;
    serie: ISeriesApi<any>;
    assets: () => AssetModel[];
  };