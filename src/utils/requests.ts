import instance from "../axios";

export const fetchBrands: any = () => {
    const [{ error, loading, data }, getBrands] = instance('hotel-brands')

    return [{ data, error, loading }, getBrands]
}

export const newHotel: any = () => {
    const [{ error, loading, data }, addHotel ] = instance({
        url: 'hotel',
        method: 'POST'
    }, { autoCancel: false, manual: true })

    return [{ error, loading, data }, addHotel]
}

export const updateHotel: any = () => {
    const [{ error: updateError, loading: updateLoading, data: updateData }, update ] = instance({
        method: 'PATCH'
    }, { autoCancel: false, manual: true })

    return [{ updateError, updateLoading, updateData }, update]
}

export const deleteHotel: any = () => {
    const [{ error, loading, data }, deleteHol ] = instance({
        method: 'DELETE'
    }, { autoCancel: false, manual: true })

    return [{ error, loading, data }, deleteHol]
}

export const newBrand: any = () => {
    const [{ data, error, loading }, postBrand] = instance({
        url: 'hotel-brands',
        method: 'POST'
    }, { autoCancel: false, manual: true });

    return [{ data, error, loading }, postBrand]
}

export const updateBrand: any = () => {
    const [{ data: updateData, error: updateError, loading: updateLoading }, updateBrd] = instance({
        method: 'PATCH'
    }, { autoCancel: false, manual: true });

    return [{ updateData, updateError, updateLoading }, updateBrd]
}

export const deleteBrand: any = () => {
    const [{ error: deleteError, loading: deleteLoading, data: deleteData }, deleteBrd ] = instance({
        method: 'DELETE'
    }, { autoCancel: false, manual: true })

    return [{ deleteError, deleteLoading, deleteData }, deleteBrd]
}