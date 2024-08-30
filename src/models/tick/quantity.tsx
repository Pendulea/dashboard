
// Plus  float64 `json:"plus"`
// Minus float64 `json:"minus"`

// PlusAvg  float64 `json:"plus_average"`
// MinusAvg float64 `json:"minus_average"`

// PlusMed  float64 `json:"plus_median"`  // median
// MinusMed float64 `json:"minus_median"` // median

// PlusCount  int64 `json:"plus_count"`  // count
// MinusCount int64 `json:"minus_count"` // count

export interface IQuantityData {
    plus: number
    minus: number
    plus_average: number
    minus_average: number
    plus_median: number
    minus_median: number
    plus_count: number
    minus_count: number
    time: number
}

