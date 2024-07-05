// export type ASSET = 'spot_price' | 'spot_volume' | 'futures_price' | 'futures_volume' | 'bd-p1' | 'bd-p2' | 'bd-p3' | 'bd-p4' | 'bd-p5' | 'bd-m1' | 'bd-m2' | 'bd-m3' | 'bd-m4' | 'bd-m5' | 'metrics_sum_open_interest' | 'metrics_count_toptrader_long_short_ratio' | 'metrics_sum_toptrader_long_short_ratio' | 'metrics_count_long_short_ratio' | 'metrics_sum_taker_long_short_vol_ratio' | 'circulating_supply';

// export const SPOT_PRICE: ASSET = 'spot_price';
// export const SPOT_VOLUME: ASSET = 'spot_volume';
// export const FUTURES_PRICE: ASSET = 'futures_price';
// export const FUTURES_VOLUME: ASSET = 'futures_volume';

// export const BOOK_DEPTH_P1: ASSET = 'bd-p1';
// export const BOOK_DEPTH_P2: ASSET = 'bd-p2';
// export const BOOK_DEPTH_P3: ASSET = 'bd-p3';
// export const BOOK_DEPTH_P4: ASSET = 'bd-p4';
// export const BOOK_DEPTH_P5: ASSET = 'bd-p5';
// export const BOOK_DEPTH_M1: ASSET = 'bd-m1';
// export const BOOK_DEPTH_M2: ASSET = 'bd-m2';
// export const BOOK_DEPTH_M3: ASSET = 'bd-m3';
// export const BOOK_DEPTH_M4: ASSET = 'bd-m4';
// export const BOOK_DEPTH_M5: ASSET = 'bd-m5';

// export const METRIC_SUM_OPEN_INTEREST: ASSET = 'metrics_sum_open_interest';
// export const METRIC_COUNT_TOP_TRADER_LONG_SHORT_RATIO: ASSET = 'metrics_count_toptrader_long_short_ratio';
// export const METRIC_SUM_TOP_TRADER_LONG_SHORT_RATIO: ASSET = 'metrics_sum_toptrader_long_short_ratio';
// export const METRIC_COUNT_LONG_SHORT_RATIO: ASSET = 'metrics_count_long_short_ratio';
// export const METRIC_SUM_TAKER_LONG_SHORT_VOL_RATIO: ASSET = 'metrics_sum_taker_long_short_vol_ratio';

// export const CIRCULATING_SUPPLY: ASSET = 'circulating_supply';

export const getTypeByColumn = (col: string): string => {
    if (
        col === 'time' ||
        col === 'plus_count' ||
        col === 'minus_count' ||
        col === 'count') 
    return 'int64'
    return 'float64'
}

// export type DATATYPE = 1 | 2 | 3

// export const DATA_TYPE_STRING = new Map<DATATYPE, string>([
// 	[1, 'unit'],
// 	[2, 'qty'],
// 	[3, 'pt']
// ])

// export const DATA_TYPE_COLOR = new Map<DATATYPE, string>([
// 	[1, '#0066ff'],
// 	[2, '#996633'],
// 	[3, '#8000ff']
// ])

// // units are data that can be aggregated around a candle (open, close, high, low, etc)
// export const UNIT: DATATYPE = 1

// // quantities are data that can be summed up (volume, open interest, etc)
// export const QUANTITY: DATATYPE = 2

// // points are simple data (a float64) that cannot be aggregated or summed
// export const POINT: DATATYPE = 3

// export const UNIT_COLUNMS: COLUMN[] = [TIME, OPEN, HIGH, LOW, CLOSE, AVERAGE, MEDIAN, ABSOLUTE_SUM, COUNT]
// export const QUANTITY_COLUMNS: COLUMN[] = [TIME, PLUS, MINUS, PLUS_AVERAGE, MINUS_AVERAGE, PLUS_MEDIAN, MINUS_MEDIAN, PLUS_COUNT, MINUS_COUNT]
// export const POINT_COLUMNS: COLUMN[] = [TIME, VALUE]

// //add method Columns() on datatype 
// export const Columns = (datatype: DATATYPE): COLUMN[] => {
// 	switch (datatype) {
// 		case UNIT:
// 			return UNIT_COLUNMS
// 		case QUANTITY:
// 			return QUANTITY_COLUMNS
// 		case POINT:
// 			return POINT_COLUMNS
// 		default:
// 			return []
// 	}
// }

