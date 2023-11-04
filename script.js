var alunos = [
  { nome: "João", nota: 8 },
  { nome: "Maria", nota: 9 },
  { nome: "Carlos", nota: 7 },
  { nome: "Sophia", nota: 8 },
];

function adicionarAluno() {
  //o nome e a nota
  var nome = document.getElementById("nome").value;
  var nota = document.getElementById("nota").value;

  // Verifica se os campos não estão vazios
  if (nome !== "" && nota !== "") {
    var notaNum = parseFloat(nota);
    if (!isNaN(notaNum) && notaNum >= 0 && notaNum <= 10) {
      // Adiciona o aluno ao array e atualiza a tabela
      alunos.push({ nome: nome, nota: notaNum }); //aqui uso o metodo push para adicionar elementos ao final de um array
      atualizarTabela();
      document.getElementById("nome").value = "";
      document.getElementById("nota").value = "";
      document.getElementById("error-message").innerHTML = "";
    } else {
      //mensagem de erro
      document.getElementById("error-message").innerHTML =
        "A nota deve ser um número entre 0 e 10.";
    }
  } else {
    //mensagem de erro
    document.getElementById("error-message").innerHTML =
      "Preencha todos os campos.";
  }
}

function atualizarTabela() {
  var tabela = document.getElementById("tabela");
  tabela.innerHTML = "<tr><th>Nome</th><th>Nota</th></tr>";

  alunos.forEach(function (aluno) {
    var newRow = tabela.insertRow(tabela.rows.length);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);

    cell1.innerHTML = aluno.nome;
    cell2.innerHTML = aluno.nota;
  });
}
//função para filtrar, percorrendo linhas verificando o nome colocado se existir ele exibe a linha
function filtrarAlunos() {
  var filtro = document.getElementById("filtro").value.toLowerCase();
  var tabela = document.getElementById("tabela");
  var rows = tabela.getElementsByTagName("tr");

  for (var i = 1; i < rows.length; i++) {
    var nome = rows[i].getElementsByTagName("td")[0].textContent.toLowerCase();
    if (nome.includes(filtro)) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

function mostrarTodos() {
  atualizarTabela(); // atualização da tabela
}

//aqui usando o map para pegar todos os nomes da tabela
function mapearNomes() {
  var nomes = alunos.map(function (aluno) {
    return aluno.nome;
  });

  var resultado = "Nomes dos Alunos: " + nomes.join(", ");
  document.getElementById("soma-notas").innerHTML = resultado;
}

//função utilizando o filter para filtrar alunos com nota igual ou acima de 8, alunos aprovados
function filtrarNotasAltas() {
  var alunosAprovados = alunos.filter(function (aluno) {
    return aluno.nota >= 8;
  });

  var resultado =
    "Alunos Aprovados: " +
    alunosAprovados
      .map(function (aluno) {
        return aluno.nome;
      })
      .join(", ");
  document.getElementById("soma-notas").innerHTML = resultado;
}

//utilizando reduce para calcular soma das notas 
function calcularSomaNotas() {
  var somaNotas = alunos.reduce(function (acumulador, aluno) {
    return acumulador + aluno.nota;
  }, 0);

  document.getElementById("soma-notas").innerHTML =
    "Soma das Notas: " + somaNotas;
}
