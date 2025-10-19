import { itemPedido } from './itemPedido';
import { Parcela } from './parcela';

export class Evento {
  public id?: number;
  public nomeEvento?: string;
  public horaInicio?: Date;
  public horaFinal?: Date;
  public dataCadastro?: Date;
  public dataContrato?: Date;
  public dataEvento?: Date;
  public convidados?: number;
  public pacote?: string;
  public observacoes?: string;
  public parcelado?: boolean;
  public qtdeParcelas?: number;
  public valorParcelas?: number;
  public logradouroEvento?: string;
  public numLogradouroEvento?: string;
  public bairroEvento?: string;
  public cidadeEvento?: string;
  public ufEvento?: string;
  public cepEvento?: string;
  public proposta?: boolean;
  public fechado?: boolean;
  public realizado?: boolean;
  public clienteId?: number;
  public formaPagamentoId?: number;

  public parcelas?: Parcela[];
  public itensPedido: itemPedido[];

constructor(){
  this.itensPedido = [];
}
}
