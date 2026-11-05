import * as mongoose from 'mongoose';

export const TransacaoSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  tipo: { type: String, required: true, enum: ['receita', 'despesa'] },
  categoria: { type: String, required: true },
  consumoConsciente: { type: Boolean, required: true },
});

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: string;
  consumoConsciente: boolean;
}