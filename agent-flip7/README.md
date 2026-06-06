# Agente Flip-7 com Q-Learning

Apresentação completa do trabalho de Inteligência Artificial sobre um agente que aprende a jogar uma rodada simplificada de Flip-7 usando Q-Learning.

## Como executar

```bash
yarn start
```

Depois acesse o endereço mostrado pelo Vite. Por padrão, o projeto usa:

```text
http://localhost:3000
```

## Como gerar versão de produção

```bash
yarn build
```

O build final fica em `dist/`.

## Estrutura

- `index.tsx`: deck Spectacle com os slides e notas do apresentador.
- `styles.css`: estilo visual da apresentação.
- `public/assets/`: gráficos gerados pelo notebook.
- `APRESENTACAO.md`: roteiro textual para estudo e defesa.

## Conteúdo coberto

- Problema e pergunta do projeto.
- Regras e simplificações do ambiente Flip-7.
- Modelagem como MDP.
- Função de recompensa.
- Políticas baseline.
- Q-Learning tabular e parâmetros usados.
- Metodologia experimental.
- Resultados com gráficos.
- Análise da política aprendida.
- Limites do modelo e próximos passos.
