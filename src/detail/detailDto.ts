export interface CreateDetailDto {
    orderId: number
    detailTitle: string
    detailPartNumber: string
    avalabilityInWarehouse: boolean
    detailPrice: number
    qty: number
}

export interface DetailDto {
    id: number
    orderId: number
    detailTitle: string
    detailPartNumber: string
    avalabilityInWarehouse: boolean
    detailPrice: number
    qty: number
}
