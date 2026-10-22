import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  calcularRendaFixa(valorInicial: number, taxaAnual: number, meses: number) {
      const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
      const valorFinal = valorInicial * Math.pow(1 + taxaMensal, meses);
      const rendimento = valorFinal - valorInicial;

      return {
        valorInicial,
        taxaAnual,
        meses,
        rendimentoTotal: Number(rendimento.toFixed(2)),
        valorFinal: Number(valorFinal.toFixed(2)),
      };
    }
  }
