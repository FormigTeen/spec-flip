# Roteiro da apresentação

## 1. Abertura

Este trabalho modela uma rodada simplificada de Flip-7 como um problema de aprendizado por reforço. O objetivo é treinar um agente para decidir entre puxar carta ou parar, equilibrando ganho de pontuação e risco de estouro.

## 2. Problema

A decisão central do jogo é simples, mas não trivial: puxar carta pode aumentar a pontuação, fazer Flip-7 ou zerar a rodada se a carta repetir. Parar protege os pontos atuais, mas permite que o adversário continue acumulando pontos.

Pergunta do projeto: uma política aprendida por Q-Learning consegue tomar decisões melhores que políticas manuais como aleatória, conservadora e agressiva?

## 3. Ambiente e regras

O baralho contém cartas de 0 a 12. A carta 0 aparece uma vez, e as demais aparecem em quantidade igual ao próprio valor. Se o agente compra uma carta repetida, ele estoura e termina com 0 pontos. Se chega a sete cartas sem repetir, recebe o bônus Flip-7 de 15 pontos.

O adversário foi modelado com uma regra especial: ele continua comprando, mas quando tentaria repetir uma carta, devolve essa carta ao monte e para sem perder pontuação. Isso torna o ambiente mais difícil para o agente.

## 4. Modelagem como MDP

O estado combina quatro informações discretizadas: diferença de pontuação, quantidade de cartas do agente, risco de repetição e quantidade de cartas do adversário.

As ações possíveis são apenas duas: puxar carta ou parar. As transições principais são carta segura, estouro, parada voluntária, Flip-7 e parada do adversário.

## 5. Recompensa

A recompensa por passo mede a mudança na diferença de pontuação entre agente e adversário. No fim da rodada, entra uma recompensa terminal baseada em vitória, derrota ou empate e ajustada pela margem final usando tanh.

Isso faz o agente aprender duas coisas ao mesmo tempo: buscar vitórias e reduzir derrotas muito grandes.

## 6. Baselines

Foram comparadas três políticas de referência:

- Random: escolhe aleatoriamente entre puxar e parar.
- Conservador: evita risco alto e para quando já está em vantagem.
- Agressivo: aceita mais risco, principalmente quando está atrás ou perto de Flip-7.

## 7. Q-Learning

O agente usa Q-Learning tabular. Foram usados alpha 0,10, gamma 0,95, epsilon inicial 0,35, epsilon mínimo 0,02 e 50.000 episódios de treino.

Depois do treinamento, a política final escolhe a ação com maior valor Q estimado para cada estado.

## 8. Experimento

Cada política foi avaliada em 2.000 simulações independentes. As métricas coletadas foram recompensa média, pontuação final, saldo final, taxa de vitória, taxa de derrota, taxa de empate, taxa de estouro, taxa de Flip-7 e quantidade média de cartas.

## 9. Resultados principais

Na execução validada, o Q-Learning teve a melhor recompensa média, a maior pontuação média do agente, o melhor saldo final e a maior taxa de vitória.

Resumo:

| Política | Recompensa média | Pontos agente | Saldo final | Vitórias | Estouros |
|---|---:|---:|---:|---:|---:|
| Random | -112,97 | 11,78 | -19,77 | 11,4% | 13,0% |
| Conservador | -122,26 | 11,31 | -20,48 | 7,1% | 2,5% |
| Agressivo | -78,10 | 14,31 | -17,29 | 26,2% | 62,2% |
| Q-Learning | -48,55 | 17,11 | -14,62 | 38,4% | 41,5% |

## 10. Análise da política aprendida

O agente tende a puxar carta quando está perdendo e o risco ainda é baixo ou médio. Isso é coerente porque parar nesses estados preservaria uma derrota provável.

Ele tende a parar quando já está ganhando e o risco de repetição aumenta. Nesse caso, comprar mais uma carta pode destruir uma vantagem já conquistada.

## 11. Limitações

O modelo representa uma rodada isolada, não uma partida completa com várias rodadas. O estado foi discretizado para manter a tabela Q pequena. Além disso, o adversário possui uma regra especial fixa, e os pesos da recompensa influenciam diretamente a política aprendida.

## 12. Conclusão

O Q-Learning aprendeu uma política útil para o ambiente proposto. Ele não elimina o desafio do adversário especial, mas supera as políticas manuais em métricas importantes e mostra uma estratégia mais adaptativa entre agressividade e preservação de vantagem.
