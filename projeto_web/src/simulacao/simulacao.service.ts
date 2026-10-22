import { Injectable } from '@nestjs/common';

@Injectable()
export class SimulacaoService {
  calcularRendaFixa(dados: any) {
    const { aporteInicial, aporteMensal, taxaAnual, prazoMeses } = dados;

    // 1. Converte a taxa anual (%) para taxa mensal em decimal
    const taxaMensalAplicada = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;

    // 2. Variáveis de controle
    let montanteBruto = aporteInicial;
    let totalInvestido = aporteInicial;

    // 3. Laço de repetição (for) para rodar mês a mês
    for (let mes = 1; mes <= prazoMeses; mes++) {
      montanteBruto += aporteMensal; // Adiciona o depósito do mês
      montanteBruto += montanteBruto * taxaMensalAplicada; // Aplica os juros do mês sobre o novo saldo
      totalInvestido += aporteMensal; // Guarda o total que saiu do bolso
    }

    const totalJuros = montanteBruto - totalInvestido;

    // 4. Retorna no formato JSON exigido pelo enunciado
    return {
      resumo: {
        totalInvestido: Number(totalInvestido.toFixed(2)),
        totalJuros: Number(totalJuros.toFixed(2)),
        montanteBruto: Number(montanteBruto.toFixed(2)),
      },
      parametrosUtilizados: {
        taxaMensalAplicada: Number(taxaMensalAplicada.toFixed(5)),
      },
    };
  }
}