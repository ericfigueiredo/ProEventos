export interface Parcela {
  id: number;
  numero: number;
  valor: number;
  dataVencimento: Date;
  pago: boolean;
  eventoId: number;
}
