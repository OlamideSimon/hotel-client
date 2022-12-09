export interface Brand {
    name: string,
    id: number,
    hotels?: object[],
}

export interface GetHotel {
    dispatchFunc: any,
    getBrands: any,
    brand?: number,
    hotel?: {
        id?: number,
        name?: string,
        city?: string,
        country?: string,
        address?: string
    }
}

export interface GetHotel2 {
    getBrands: any,
    hotel?: {
        id?: number,
        name?: string,
        city?: string,
        country?: string,
        address?: string
    }
}

export interface HotelBrandParams {
    handleModal: any,
    getBrands: any,
    brand?: {
        name?: string,
        id?: number,
    }
}

export interface DispatchFunc {
    type: string,
    arg? : any | number
}