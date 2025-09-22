import { Parcela } from './parcela';

export interface Evento {
  id: number;
  nomeEvento: string;
  horaInicio: Date;
  horaFinal: Date;
  dataCadastro: Date;
  dataContrato: Date;
  dataEvento: Date;
  convidados: number;
  pacote: string;
  observacoes: string;
  parcelado: boolean;
  qtdeParcelas: number;
  valorParcelas: number;
  logradouroEvento: string;
  numLogradouroEvento: string;
  bairroEvento: string;
  cidadeEvento: string;
  ufEvento: string;
  cepEvento: string;
  proposta: boolean;
  fechado: boolean;
  realizado: boolean;
  clienteId: number;
  formaPagamentoId: number;
  parcelas: Parcela[];
}
