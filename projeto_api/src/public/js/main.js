const URL_API = '/transacoes';

document.addEventListener('DOMContentLoaded', () => {
  carregarDashboard();

  const form = document.getElementById('form-transacao');
  const selectTipo = document.getElementById('tipo');
  const grupoConsumo = document.getElementById('grupo-consumo');

  form.addEventListener('submit', salvarTransacao);

  selectTipo.addEventListener('change', () => {
    grupoConsumo.style.display = selectTipo.value === 'receita' ? 'none' : 'flex';
  });
});

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

async function carregarDashboard() {
  try {
    const res = await fetch(URL_API);
    if (!res.ok) throw new Error('Erro ao buscar dados da API');

    const dados = await res.json();
    const metricas = dados.metricas || {};
    const historico = dados.historico || [];

    const totalImpulso =
      metricas.totalGastoImpulso ?? metricas.totalGastoPorImpulso ?? 0;

    document.getElementById('saldo-total').textContent = formatarMoeda(metricas.saldoTotal);
    document.getElementById('total-despesas').textContent = formatarMoeda(metricas.totalDespesas);
    document.getElementById('total-impulso').textContent = formatarMoeda(totalImpulso);

    renderizarHistorico(historico);
  } catch (err) {
    console.error(err);
    document.getElementById('lista-historico').innerHTML =
      '<li class="vazio">Erro ao carregar dados do servidor.</li>';
  }
}

function renderizarHistorico(historico) {
  const lista = document.getElementById('lista-historico');
  lista.innerHTML = '';

  if (historico.length === 0) {
    lista.innerHTML = '<li class="vazio">Nenhuma transação cadastrada.</li>';
    return;
  }

  historico.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'item-historico';

    const ehReceita = String(item.tipo).toLowerCase() === 'receita';
    const ehImpulso = item.consumoConsciente === false;

    li.innerHTML = `
      <div class="item-info">
        <strong>${item.descricao}</strong>
        <small>${item.categoria} • ${ehReceita ? 'Receita' : 'Despesa'}</small>
        ${!ehReceita && ehImpulso ? '<span class="badge-impulso">Gasto por Impulso</span>' : ''}
      </div>
      <span class="${ehReceita ? 'val-receita' : 'val-despesa'}">
        ${ehReceita ? '+' : '-'} ${formatarMoeda(item.valor)}
      </span>
    `;
    lista.appendChild(li);
  });
}

async function salvarTransacao(e) {
  e.preventDefault();

  const tipo = document.getElementById('tipo').value;
  const consumoConsciente =
    tipo === 'receita'
      ? true
      : document.querySelector('input[name="consumoConsciente"]:checked').value === 'true';

  const novaTransacao = {
    descricao: document.getElementById('descricao').value.trim(),
    valor: parseFloat(document.getElementById('valor').value),
    tipo,
    categoria: document.getElementById('categoria').value.trim(),
    consumoConsciente,
  };

  try {
    const res = await fetch(URL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTransacao),
    });

    if (!res.ok) throw new Error('Erro ao salvar transação');

    document.getElementById('form-transacao').reset();
    document.getElementById('grupo-consumo').style.display = 'flex';
    await carregarDashboard();
  } catch (err) {
    console.error(err);
    alert('Erro ao cadastrar transação.');
  }
}