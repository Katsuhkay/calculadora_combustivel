import { useState, type FormEvent } from 'react';
import logo from './assets/logo.png';
import './App.css';

// Interface não precisou de modificação
interface InfoProps {
  title: string;
  alcool: number | string;
  gasolina: number | string;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState('');
  const [alcoolInput, setAlcoolInput] = useState('');
  const [info, setInfo] = useState<InfoProps>();

  function calcularMelhorPreco(event: FormEvent) {
    event.preventDefault();

    // A conversão para o cálculo já estava correta
    const calculo = parseFloat(alcoolInput) / parseFloat(gasolinaInput);

    if (calculo < 0.7) {
      // Compensa usar álcool
      setInfo({
        title: 'Compensa usar álcool',

        // CORREÇÃO: Convertemos as strings 'alcoolInput' e 'gasolinaInput' para números
        // usando parseFloat() antes de passá-las para a função formatarMoeda,
        // que espera receber um valor do tipo 'number'.
        // Também corrigimos a variável que estava trocada aqui.
        alcool: formatarMoeda(parseFloat(alcoolInput)),
        gasolina: formatarMoeda(parseFloat(gasolinaInput)),
      });
    } else {
      // Compensa usar gasolina
      setInfo({
        title: 'Compensa usar gasolina',

        // CORREÇÃO: A mesma conversão de string para número é feita aqui.
        alcool: formatarMoeda(parseFloat(alcoolInput)),
        gasolina: formatarMoeda(parseFloat(gasolinaInput)),
      });
    }
  }

  // A função formatarMoeda já estava correta, esperando um número.
  function formatarMoeda(valor: number) {
    const valorFormatado = valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return valorFormatado;
  }

  return (
    <>
      <main className="container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Qual melhor opção?</h1>

        <form className="form" onSubmit={calcularMelhorPreco}>
          <label>Álcool (preço por litro):</label>
          <input
            value={alcoolInput}
            onChange={(event) => setAlcoolInput(event.target.value)}
            type="number"
            className="input"
            placeholder="0"
            min={1}
            step={0.01}
            required
          />

          <label>Gasolina (preço por litro):</label>
          <input
            value={gasolinaInput}
            onChange={(event) => setGasolinaInput(event.target.value)}
            type="number"
            className="input"
            placeholder="0"
            min={1}
            step={0.01}
            required
          />

          <input type="submit" className="btn" value="Calcular" />
        </form>

        {/* A lógica para exibir a seção de resultado já estava correta */}
        {info && Object.keys(info).length > 0 && (
          <section className="result">
            {/* CORREÇÃO: O título agora é dinâmico, vindo do estado 'info.title'.
                Antes, estava fixo no HTML como "Compensa usar álcool". */}
            <h2 className="result-title">{info.title}</h2>

            {/* MODIFICADO: Removemos o "R$" daqui, pois a função formatarMoeda já
                adiciona o "R$" e a formatação completa (ex: "R$ 4,90"). */}
            <span>Álcool: {info.alcool}</span>
            <span>Gasolina: {info.gasolina}</span>
          </section>
        )}
      </main>
    </>
  );
}

export default App;