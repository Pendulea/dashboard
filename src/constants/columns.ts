export const getTypeByColumn = (col: string): string => {
    if (
        col === 'time' ||
        col === 'plus_count' ||
        col === 'minus_count' ||
        col === 'count') 
    return 'int64'
    return 'float64'
}
