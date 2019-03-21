export function getComparison(value, comparator){
    switch(comparator){
        case "lt":
            return {$lt: value};
            break;
        case "lte":
            return {$lte: value};
            break;
        case "gt":
            return {$gt: value};
            break;
        case "gte":
            return {$gte: value};
            break;
        case "eq":
            return {$eq: value};
            break;
        default:
            return null;
    }
}