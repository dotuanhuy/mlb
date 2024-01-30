export const BuildOptionSelectSame = (data) => {
    return data?.map(item => {
        return{ value: item, label: item }
    })
} 

export const BuildOptionSelect = (data) => {
    return data?.map(item => {
        return{ value: item.id, label: item.name }
    })
} 

export const BuildOptionSelectDiscount = (data) => {
    return data?.map(item => {
        return{ value: item.id, label: item.value*100+'%' }
    })
} 
