import { Injectable } from '@nestjs/common';

@Injectable()
export class SimulacaoService {
  calcularRendaFixa(dados: any) {
    const { aporteInicial, aporteMensal, taxaAnual, prazoMeses } = dados;

    const taxaMensalAplicada = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;

    let montanteBruto = aporteInicial;
    let totalInvestido = aporteInicial;

    for (let mes = 1; mes <= prazoMeses; mes++) {
      montanteBruto += aporteMensal;
      montanteBruto += montanteBruto * taxaMensalAplicada;
      totalInvestido += aporteMensal;
    }

    const totalJuros = montanteBruto - totalInvestido;

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