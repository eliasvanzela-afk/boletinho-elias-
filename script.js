/* =========================================================
   BOLETIM DIGITAL - 9º ANO
   Dados fictícios para demonstração.
   ========================================================= */

/* ===== 1. DADOS BRUTOS ===== */
// Array (lista) de objetos. Cada objeto é uma disciplina.
const disciplinas = [
  { disciplina: "Língua Portuguesa", tri1: 78, tri2: "8,2", tri3: 8.6, faltas: [2, 2, 1] },
  { disciplina: "Matemática", tri1: 55, tri2: "5,4", tri3: null, faltas: [3, 2, 2] },
  { disciplina: "Ciências", tri1: 84, tri2: 7.9, tri3: "8,3", faltas: [1, 1, 1] },
  { disciplina: "História", tri1: "7,1", tri2: 82, tri3: null, faltas: [1, 2, 1] },
  { disciplina: "Geografia", tri1: 69, tri2: "7,5", tri3: 7.8, faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 88, tri2: 8.4, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Arte", tri1: "9,2", tri2: 87, tri3: 9.0, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 96, tri2: "9,3", tri3: null, faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 91, tri2: 8.9, tri3: "9,4", faltas: [1, 1, 0] },
  { disciplina: "Educação Financeira", tri1: 76, tri2: "7,2", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Rec. Aprend. Matemática", tri1: 58, tri2: "5,9", tri3: 6.2, faltas: [2, 2, 1] },
  { disciplina: "Leitura Rec. Aprend. Lingua Portuguesa", tri1: 72, tri2: "7,6", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 49, tri2: 5.5, tri3: "5,8", faltas: [2, 2, 2] },
  { disciplina: "Literatura Arte e Movimento", tri1: "8,0", tri2: 84, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Práticas Experimentais", tri1: 64, tri2: "6,6", tri3: 7.0, faltas: [1, 1, 1] }
];

/* Frequência DEMONSTRATIVA (fictícia).
   Este percentual NÃO é calculado a partir das faltas.
   No futuro, será tratado de outra forma. */
const FREQUENCIA_DEMONSTRATIVA = 92;

/* ===== 2. FUNÇÃO: normalizarNota ===== */
// Converte qualquer nota recebida para a escala 0–10.
// Regras:
//  - vazio / null / undefined -> null (nota ainda não lançada)
//  - 0 a 10 -> mantém
//  - >10 e <=100 -> divide por 10
//  - aceita ponto ou vírgula
//  - fora das regras -> null (inválida)
function normalizarNota(valor) {
  // Verifica se está vazio
  if (valor === null || valor === undefined || valor === "") {
    return null; // nota ainda não lançada
  }

  // Se for número, usa direto. Se for texto, troca vírgula por ponto.
  let numero;
  if (typeof valor === "string") {
    numero = parseFloat(valor.replace(",", "."));
  } else {
    numero = valor;
  }

  // Se não virou número válido, retorna null
  if (isNaN(numero)) {
    return null;
  }

  // Aplica as regras de escala
  if (numero >= 0 && numero <= 10) {
    return numero;
  } else if (numero > 10 && numero <= 100) {
    return numero / 10;
  } else {
    return null; // fora das regras
  }
}

/* ===== 3. FUNÇÃO: formatarNota ===== */
// Mostra a nota com uma casa decimal (ex.: 8.6 -> "8,6")
// Se for null, mostra "—"
function formatarNota(nota) {
  if (nota === null) return "—";
  return nota.toFixed(1).replace(".", ",");
}

/* ===== 4. FUNÇÃO: calcularMedia ===== */
// Calcula a média usando SOMENTE as notas disponíveis.
// Nota ausente nunca vira zero.
function calcularMedia(notas) {
  const validas = notas.filter((n) => n !== null);
  if (validas.length === 0) return null;
  const soma = validas.reduce((total, n) => total + n, 0);
  return soma / validas.length;
}

/* ===== 5. FUNÇÃO: definirSituacao ===== */
// Define a situação com base na média.
function definirSituacao(media) {
  if (media === null) return "Nota ainda não disponível";
  if (media >= 6.0) return "Bom desempenho";
  return "Atenção";
}

/* ===== 6. FUNÇÃO: somarFaltas ===== */
// Soma as faltas dos três trimestres.
function somarFaltas(faltas) {
  return faltas.reduce((total, f) => total + f, 0);
}

/* ===== 7. PREPARAR DADOS ===== */
// Percorre cada disciplina e cria uma versão já processada.
const disciplinasProcessadas = disciplinas.map((d) => {
  const n1 = normalizarNota(d.tri1);
  const n2 = normalizarNota(d.tri2);
  const n3 = normalizarNota(d.tri3);

  const media = calcularMedia([n1, n2, n3]);
  const totalFaltas = somarFaltas(d.faltas);
  const situacao = definirSituacao(media);

  return {
    disciplina: d.disciplina,
    notas: [n1, n2, n3],
    media: media,
    faltas: totalFaltas,
    situacao: situacao
  };
});

/* ===== 8. PREENCHER A TABELA ===== */
// DOM: pegamos o <tbody> pelo id.
const corpoTabela = document.getElementById("corpo-tabela");

// forEach: percorre cada disciplina processada e cria uma linha <tr>.
disciplinasProcessadas.forEach((d) => {
  const linha = document.createElement("tr");

  // Define a classe da situação para colorir
  let classeSituacao = "situacao-sem-nota";
  if (d.situacao === "Bom desempenho") classeSituacao = "situacao-bom";
  if (d.situacao === "Atenção") classeSituacao = "situacao-atencao";

  linha.innerHTML = `
    <td>${d.disciplina}</td>
    <td>${formatarNota(d.notas[0])}</td>
    <td>${formatarNota(d.notas[1])}</td>
    <td>${formatarNota(d.notas[2])}</td>
    <td><strong>${formatarNota(d.media)}</strong></td>
    <td>${d.faltas}</td>
    <td class="${classeSituacao}">${d.situacao}</td>
  `;

  corpoTabela.appendChild(linha);
});

/* ===== 9. CALCULAR CARDS DE RESUMO ===== */
// Média geral: média de todas as médias válidas
const mediasValidas = disciplinasProcessadas
  .map((d) => d.media)
  .filter((m) => m !== null);

const mediaGeral =
  mediasValidas.length > 0
    ? mediasValidas.reduce((t, m) => t + m, 0) / mediasValidas.length
    : null;

// Total de faltas de todas as disciplinas
const totalFaltasGeral = disciplinasProcessadas.reduce(
  (t, d) => t + d.faltas,
  0
);

// Contagem de disciplinas com bom desempenho e com atenção
const bomDesempenho = disciplinasProcessadas.filter(
  (d) => d.situacao === "Bom desempenho"
).length;

const atencao = disciplinasProcessadas.filter(
  (d) => d.situacao === "Atenção"
).length;

/* ===== 10. PREENCHER OS CARDS ===== */
const areaCards = document.getElementById("cards");

// Função auxiliar para criar um card
function criarCard(titulo, valor, aviso = false) {
  const card = document.createElement("div");
  card.className = "card";

  const h3 = document.createElement("h3");
  h3.textContent = titulo;

  const p = document.createElement("p");
  p.textContent = valor;
  if (aviso) p.classList.add("aviso");

  card.appendChild(h3);
  card.appendChild(p);
  return card;
}

// Card 1: Média geral
areaCards.appendChild(
  criarCard(
    "Média Geral",
    mediaGeral !== null ? formatarNota(mediaGeral) : "—"
  )
);

// Card 2: Total de faltas
areaCards.appendChild(criarCard("Total de Faltas", totalFaltasGeral));

// Card 3: Disciplinas com bom desempenho
areaCards.appendChild(
  criarCard("Bom Desempenho", `${bomDesempenho} disciplinas`)
);

// Card 4: Disciplinas que precisam de atenção
areaCards.appendChild(
  criarCard("Precisam de Atenção", `${atencao} disciplinas`)
);

// Card 5: Frequência demonstrativa
areaCards.appendChild(
  criarCard(
    "Frequência",
    `${FREQUENCIA_DEMONSTRATIVA}% — Frequência adequada`
  )
);