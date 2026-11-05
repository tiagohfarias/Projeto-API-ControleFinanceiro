import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao } from './transacao.model';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel('Transacao') private readonly transacaoModel: Model<Transacao>,
  ) {}

  // POST: Cadastrar transação
  async criarTransacao(transacao: Transacao) {
    const novaTransacao = new this.transacaoModel(transacao);
    const result = await novaTransacao.save();
    return result.id as string;
  }

  // GET: Histórico + Métricas
  async buscarComMetricas() {
    const transacoes = await this.transacaoModel.find().exec();

    let totalReceitas = 0;
    let totalDespesas = 0;
    let totalGastoImpulso = 0;

    const historico = transacoes.map((t) => {
      if (t.tipo === 'receita') {
        totalReceitas += t.valor;
      } else if (t.tipo === 'despesa') {
        totalDespesas += t.valor;
        if (t.consumoConsciente === false) {
          totalGastoImpulso += t.valor;
        }
      }

      return {
        id: t.id,
        descricao: t.descricao,
        valor: t.valor,
        tipo: t.tipo,
        categoria: t.categoria,
        consumoConsciente: t.consumoConsciente,
      };
    });

    const saldoTotal = totalReceitas - totalDespesas;

    return {
      historico,
      metricas: {
        saldoTotal: Number(saldoTotal.toFixed(2)),
        totalDespesas: Number(totalDespesas.toFixed(2)),
        totalGastoImpulso: Number(totalGastoImpulso.toFixed(2)),
      },
    };
  }
}