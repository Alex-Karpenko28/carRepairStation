export interface CreateDetailDto {
  orderId: number;
  detailTitle: string;
  detailPartNumber: string;
  avalabilityInWarehouse: boolean;
  detailPrice: number;
}