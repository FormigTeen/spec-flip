import React from 'react';
import { createRoot } from 'react-dom/client';
import Latex from 'react-latex-next';
import type { IconType } from 'react-icons';
import {
  FaBalanceScale,
  FaBookOpen,
  FaBrain,
  FaChartBar,
  FaChartLine,
  FaCheckCircle,
  FaDice,
  FaExclamationTriangle,
  FaFire,
  FaFlagCheckered,
  FaHandPaper,
  FaLayerGroup,
  FaPlay,
  FaProjectDiagram,
  FaRandom,
  FaRobot,
  FaRoute,
  FaShieldAlt,
  FaSitemap,
  FaStop,
  FaTable,
  FaTrophy,
} from 'react-icons/fa';
import {
  Box,
  Deck,
  FlexBox,
  Grid,
  Heading,
  Image,
  ListItem,
  Link,
  Notes,
  Slide,
  Text,
  UnorderedList,
} from 'spectacle';
import 'katex/dist/katex.min.css';
import './styles.css';

const theme = {
  colors: {
    primary: '#faf7f2',
    secondary: '#18201d',
    tertiary: '#0f766e',
    quaternary: '#c2410c',
    quinary: '#2563eb',
  },
  fonts: {
    header: '"Inter", "Aptos Display", "Segoe UI", sans-serif',
    text: '"Inter", "Aptos", "Segoe UI", sans-serif',
    monospace: '"JetBrains Mono", "Fira Code", monospace',
  },
  fontSizes: {
    h1: '62px',
    h2: '46px',
    h3: '30px',
    text: '25px',
    monospace: '20px',
  },
  size: {
    width: 1366,
    height: 768,
    maxCodePaneHeight: 520,
  },
};

const template = ({ slideNumber, numberOfSlides }: { slideNumber: number; numberOfSlides: number }) => (
  <FlexBox
    className="slide-template"
    justifyContent="space-between"
    alignItems="center"
    padding="0 34px 24px"
  >
    <Text className="template-label">MATA64 - Inteligência Artificial</Text>
    <Text className="template-label">
      {slideNumber}/{numberOfSlides}
    </Text>
  </FlexBox>
);

const IconBadge = ({ icon: Icon, className = '' }: { icon: IconType; className?: string }) => (
  <span className={`icon-badge ${className}`}>
    <Icon aria-hidden="true" />
  </span>
);

const TitleIcon = ({ icon: Icon }: { icon: IconType }) => (
  <span className="title-icon">
    <Icon aria-hidden="true" />
  </span>
);

const MetricCard = ({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: IconType;
}) => (
  <Box className="metric-card">
    <FlexBox className="metric-header" justifyContent="flex-start" alignItems="center">
      <IconBadge icon={icon} />
      <Text className="metric-label">{label}</Text>
    </FlexBox>
    <Text className="metric-value">{value}</Text>
    {detail ? <Text className="metric-detail">{detail}</Text> : null}
  </Box>
);

const IconTitle = ({
  icon,
  children,
  className,
}: {
  icon: IconType;
  children: React.ReactNode;
  className: string;
}) => (
  <Text className={className}>
    <TitleIcon icon={icon} />
    <span>{children}</span>
  </Text>
);

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <Text className="section-tag">{children}</Text>
);

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const MdpTitle = ({ label }: { label: string }) => (
  <FlexBox className="mdp-title" justifyContent="flex-start" alignItems="center">
    <span className="mdp-title-base">MDP</span>
    <span className="mdp-title-chip">{label}</span>
  </FlexBox>
);

const Figure = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
  <FlexBox className="figure-shell" flexDirection="column" alignItems="stretch">
    <Image className="figure-image" src={assetPath(src)} alt={alt} />
    <Text className="figure-caption">{caption}</Text>
  </FlexBox>
);

const Presentation = () => (
  <Deck theme={theme} template={template}>
    <Slide className="title-slide" backgroundColor="#12201c">
      <Grid gridTemplateColumns="1.02fr .98fr" height="100%" gridColumnGap="42px" alignItems="center">
        <Box>
          <SectionTag>Projeto de Inteligência Artificial</SectionTag>
          <Heading className="hero-title">Agente de Flip-7 com Q-Learning</Heading>
          <Text className="hero-subtitle">
            Um agente aprende quando puxar carta ou parar em uma rodada de Flip-7 contra um adversário
            determinístico forte.
          </Text>
          <FlexBox className="title-meta" justifyContent="flex-start">
            <span>MATHEUS SILVA FREITAS</span>
          </FlexBox>
        </Box>
        <Box className="cover-panel">
          <div className="card-stack">
            <div className="playing-card card-a">7</div>
            <div className="playing-card card-b">Q</div>
            <div className="playing-card card-c">AI</div>
          </div>
          <Grid gridTemplateColumns="1fr 1fr 1fr" gridGap="14px" marginTop="36px">
            <MetricCard label="Ações" value="2" detail="Puxar carta ou parar" icon={FaHandPaper} />
            <MetricCard label="Treino" value="50k" detail="Episódios simulados" icon={FaBrain} />
            <MetricCard label="Avaliação" value="2k" detail="Simulações por política" icon={FaChartLine} />
          </Grid>
        </Box>
      </Grid>
      <Notes>
        Abra explicando que o trabalho modela uma decisão central do Flip-7: aceitar risco para aumentar
        pontuação ou parar para preservar o placar. O foco não é recriar todo o jogo comercial, mas
        construir um ambiente controlado para comparar políticas.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Problema</SectionTag>
      <Heading>Decidir sob risco crescente</Heading>
      <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="44px" alignItems="center" height="74%">
        <Box>
          <Text className="lead">
            A cada rodada, o agente enfrenta uma escolha simples:
          </Text>
          <UnorderedList className="clean-list">
            <ListItem>
              <strong>Puxar carta:</strong> aumenta pontos, mas pode repetir uma carta e zerar a rodada.
            </ListItem>
            <ListItem>
              <strong>Parar:</strong> preserva a pontuação atual, mas pode deixar o adversário crescer.
            </ListItem>
            <ListItem>
              <strong>Buscar Flip-7:</strong> sete cartas diferentes rendem bônus, mas exigem mais risco.
            </ListItem>
          </UnorderedList>
        </Box>
        <Box className="callout">
          <IconTitle className="callout-title" icon={FaProjectDiagram}>
            Pergunta do projeto
          </IconTitle>
          <UnorderedList className="callout-list">
            <ListItem>
              Uma política treinada por Q-Learning consegue equilibrar recuperação, preservação de vantagem
              e risco de estouro melhor que estratégias manuais?
            </ListItem>
            <ListItem>
              Ela também consegue competir contra um agente determinístico de melhor jogada?
            </ListItem>
          </UnorderedList>
        </Box>
      </Grid>
      <Notes>
        Destaque que a pergunta é prática: não basta pontuar alto em alguns casos; a política precisa
        melhorar taxa de vitória, recompensa média e reduzir derrotas muito grandes.
      </Notes>
    </Slide>

    <Slide backgroundColor="#eef3f0">
      <SectionTag>Regras usadas</SectionTag>
      <Heading>Ambiente simplificado de Flip-7</Heading>
      <Grid gridTemplateColumns="1fr 1fr 1fr" gridGap="20px" marginTop="30px">
        <Box className="info-card">
          <IconTitle className="info-card-title" icon={FaLayerGroup}>
            Baralho
          </IconTitle>
          <Text className="info-card-text">
            Cartas de 0 a 12. A carta 0 aparece uma vez; as demais aparecem em quantidade igual ao próprio
            valor.
          </Text>
        </Box>
        <Box className="info-card">
          <IconTitle className="info-card-title" icon={FaExclamationTriangle}>
            Estouro
          </IconTitle>
          <Text className="info-card-text">
            Se o jogador compra uma numeração repetida, perde a rodada e sua pontuação final vira 0.
          </Text>
        </Box>
        <Box className="info-card">
          <IconTitle className="info-card-title" icon={FaTrophy}>
            Flip-7
          </IconTitle>
          <Text className="info-card-text">
            Ao chegar a sete cartas sem repetir, o jogador encerra a rodada com 15 pontos extras.
          </Text>
        </Box>
      </Grid>
      <Notes>
        Explique primeiro as regras básicas usadas pelo ambiente: composição do baralho, estouro por
        repetição e bônus de Flip-7.
      </Notes>
    </Slide>

    <Slide backgroundColor="#eef3f0">
      <SectionTag>Regras usadas</SectionTag>
      <Heading>Adversário e consequência</Heading>
      <Grid gridTemplateColumns="1fr 1fr" gridGap="24px" marginTop="52px">
        <Box className="info-card">
          <IconTitle className="info-card-title" icon={FaRobot}>
            Adversário especial
          </IconTitle>
          <Text className="info-card-text">
            O oponente continua comprando. Quando puxa uma carta que o faria estourar, devolve a carta ao
            monte e abandona a rodada sem perder seus pontos.
          </Text>
        </Box>
        <Box className="info-card">
          <IconTitle className="info-card-title" icon={FaBalanceScale}>
            Consequência
          </IconTitle>
          <Text className="info-card-text">
            A tarefa fica difícil: o agente pode estourar, mas o adversário usado no treino e na avaliação
            tem uma vantagem determinística.
          </Text>
        </Box>
      </Grid>
      <Notes>
        Explique que esse adversário especial torna as derrotas frequentes. Isso ajuda a testar se a
        política aprende a perder por menos e a aproveitar melhor os estados favoráveis.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Modelagem</SectionTag>
      <MdpTitle label="ESTADO" />
      <Text className="mdp-lead">
        O estado resume a situação da rodada em categorias discretas.
      </Text>
      <Grid className="state-sequence" gridTemplateColumns="repeat(4, 1fr)" gridGap="14px" marginTop="30px">
        <Box className="state-box score-state">
          <IconTitle className="state-title" icon={FaBalanceScale}>
            Diferença de pontuação
          </IconTitle>
          <Text className="state-description">Situação do agente no placar.</Text>
          <div className="state-chip-wrap">
            <span><strong>destruído</strong><em>Δ ≤ -20</em></span>
            <span><strong>perdendo</strong><em>Δ &lt; 0</em></span>
            <span><strong>empatado</strong><em>Δ = 0</em></span>
            <span><strong>ganhando</strong><em>0 &lt; Δ &lt; 20</em></span>
            <span><strong>amassando</strong><em>Δ ≥ 20</em></span>
          </div>
        </Box>
        <Box className="state-box agent-state">
          <IconTitle className="state-title" icon={FaRobot}>
            Cartas do agente
          </IconTitle>
          <Text className="state-description">Progresso da mão atual.</Text>
          <div className="state-chip-wrap">
            <span><strong>início</strong><em>cartas ≤ 2</em></span>
            <span><strong>meio</strong><em>3-4 cartas</em></span>
            <span><strong>perto de Flip-7</strong><em>cartas ≥ 5</em></span>
          </div>
        </Box>
        <Box className="state-box risk-state">
          <IconTitle className="state-title" icon={FaExclamationTriangle}>
            Risco de repetição
          </IconTitle>
          <Text className="state-description">Chance de puxar carta repetida.</Text>
          <div className="state-chip-wrap">
            <span><strong>baixo</strong><em>risco &lt; 10%</em></span>
            <span><strong>médio</strong><em>risco &lt; 25%</em></span>
            <span><strong>alto</strong><em>risco &lt; 40%</em></span>
            <span><strong>crítico</strong><em>risco ≥ 40%</em></span>
          </div>
        </Box>
        <Box className="state-box opponent-state">
          <IconTitle className="state-title" icon={FaDice}>
            Cartas do adversário
          </IconTitle>
          <Text className="state-description">Progresso do oponente.</Text>
          <div className="state-chip-wrap">
            <span><strong>início</strong><em>cartas ≤ 2</em></span>
            <span><strong>meio</strong><em>3-4 cartas</em></span>
            <span><strong>perto de Flip-7</strong><em>cartas ≥ 5</em></span>
          </div>
        </Box>
      </Grid>
      <Notes>
        Explique que o estado não usa todos os detalhes brutos do baralho. Ele transforma a rodada em
        categorias que preservam as informações mais úteis para decisão: placar, risco e progresso.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Modelagem</SectionTag>
      <MdpTitle label="AÇÕES" />
      <Grid gridTemplateColumns="1fr 1fr" gridGap="24px" marginTop="48px">
        <Box className="schema-box accent">
          <IconTitle className="schema-title" icon={FaPlay}>
            0 - Puxar carta
          </IconTitle>
          <UnorderedList className="compact-list">
            <ListItem>Aumenta a pontuação se a carta for nova.</ListItem>
            <ListItem>Pode aproximar o jogador do bônus de Flip-7.</ListItem>
            <ListItem>Se a numeração repetir, o jogador estoura e termina com 0 pontos.</ListItem>
          </UnorderedList>
        </Box>
        <Box className="schema-box accent">
          <IconTitle className="schema-title" icon={FaStop}>
            1 - Parar
          </IconTitle>
          <UnorderedList className="compact-list">
            <ListItem>Preserva a pontuação acumulada na rodada.</ListItem>
            <ListItem>Evita o risco imediato de estouro.</ListItem>
            <ListItem>Permite que o adversário continue até encerrar sua própria jogada.</ListItem>
          </UnorderedList>
        </Box>
      </Grid>
      <Notes>
        Mostre que a ação é binária, mas o valor de cada escolha depende muito do estado. Puxar é a única
        forma de recuperar placar, enquanto parar protege uma vantagem já construída.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Modelagem</SectionTag>
      <MdpTitle label="TRANSIÇÕES" />
      <Grid gridTemplateColumns="1fr 1fr 1fr" gridGap="16px" marginTop="38px">
        <Box className="schema-box transition-card">
          <IconTitle className="schema-title" icon={FaCheckCircle}>
            Carta segura
          </IconTitle>
          <Text className="info-card-text">A carta entra na mão, soma pontos e a rodada continua.</Text>
        </Box>
        <Box className="schema-box transition-card">
          <IconTitle className="schema-title" icon={FaExclamationTriangle}>
            Estouro
          </IconTitle>
          <Text className="info-card-text">Uma carta repetida zera a pontuação do jogador e encerra sua participação.</Text>
        </Box>
        <Box className="schema-box transition-card">
          <IconTitle className="schema-title" icon={FaStop}>
            Parada voluntária
          </IconTitle>
          <Text className="info-card-text">O jogador para e mantém a pontuação acumulada.</Text>
        </Box>
        <Box className="schema-box transition-card">
          <IconTitle className="schema-title" icon={FaTrophy}>
            Flip-7
          </IconTitle>
          <Text className="info-card-text">Sete cartas sem repetição dão bônus e encerram a rodada daquele jogador.</Text>
        </Box>
        <Box className="schema-box transition-card">
          <IconTitle className="schema-title" icon={FaRobot}>
            Adversário para
          </IconTitle>
          <Text className="info-card-text">Quando o adversário puxaria uma carta repetida, ele devolve a carta e para.</Text>
        </Box>
      </Grid>
      <Notes>
        As transições representam o que pode acontecer depois de uma ação. Como a compra é aleatória, o
        mesmo estado e a mesma ação podem levar a resultados diferentes.
      </Notes>
    </Slide>

    <Slide backgroundColor="#12201c">
      <SectionTag>Recompensa</SectionTag>
      <MdpTitle label="RECOMPENSA POR PASSO" />
      <Text className="reward-lead">
        A cada ação, o agente recebe um sinal baseado na mudança do saldo entre agente e adversário.
      </Text>
      <FlexBox className="latex-center" justifyContent="center" alignItems="center">
        <Latex>{String.raw`$$R_{passo} = \Delta_{próximo} - \Delta_{anterior}$$`}</Latex>
      </FlexBox>
      <Grid gridTemplateColumns="repeat(2, 1fr)" gridGap="16px" marginTop="26px">
        <Box className="reward-term-card">
          <div className="reward-term-header">
            <span className="reward-term-title latex-card-title">
              <Latex>{String.raw`$\Delta_{anterior}$`}</Latex>
            </span>
            <span className="reward-term-kicker">DELTA ANTERIOR</span>
          </div>
          <Text className="reward-term-text">Saldo agente - adversário antes da ação escolhida.</Text>
        </Box>
        <Box className="reward-term-card">
          <div className="reward-term-header">
            <span className="reward-term-title latex-card-title">
              <Latex>{String.raw`$\Delta_{próximo}$`}</Latex>
            </span>
            <span className="reward-term-kicker">PRÓXIMO DELTA</span>
          </div>
          <Text className="reward-term-text">Saldo agente - adversário depois da transição da rodada.</Text>
        </Box>
      </Grid>
      <Notes>
        Explique que a recompensa por passo não avalia apenas a carta comprada. Ela mede se a ação
        melhorou ou piorou a posição relativa do agente no placar.
      </Notes>
    </Slide>

    <Slide backgroundColor="#12201c">
      <SectionTag>Recompensa</SectionTag>
      <MdpTitle label="RECOMPENSA TERMINAL" />
      <Text className="reward-lead">
        Ao final da rodada, entra uma recompensa baseada no resultado e na margem final.
      </Text>
      <FlexBox className="latex-center" justifyContent="center" alignItems="center">
        <Latex>{String.raw`$$R_{final} = K_r + K_b \cdot \tanh\left(\frac{\Delta_{final}}{L}\right)$$`}</Latex>
      </FlexBox>
      <Grid gridTemplateColumns="repeat(4, 1fr)" gridGap="14px" marginTop="24px">
        <Box className="reward-term-card">
          <div className="reward-term-header">
            <span className="reward-term-title latex-card-title">
              <Latex>{String.raw`$K_r$`}</Latex>
            </span>
            <span className="reward-term-kicker">RECOMPENSA BASE</span>
          </div>
          <Text className="reward-term-text">Peso principal para vitória, derrota ou empate.</Text>
          <Text className="reward-term-footer">+100 / 0 / -100</Text>
        </Box>
        <Box className="reward-term-card">
          <div className="reward-term-header">
            <span className="reward-term-title latex-card-title">
              <Latex>{String.raw`$\Delta_{final}$`}</Latex>
            </span>
            <span className="reward-term-kicker">DELTA FINAL</span>
          </div>
          <Text className="reward-term-text">Margem final da rodada.</Text>
        </Box>
        <Box className="reward-term-card">
          <div className="reward-term-header">
            <span className="reward-term-title latex-card-title">
              <Latex>{String.raw`$K_b$`}</Latex>
            </span>
            <span className="reward-term-kicker">BÔNUS</span>
          </div>
          <Text className="reward-term-text">Controla quanto a margem influencia a recompensa.</Text>
          <Text className="reward-term-footer">Constante: 50</Text>
        </Box>
        <Box className="reward-term-card">
          <div className="reward-term-header">
            <span className="reward-term-title latex-card-title">
              <Latex>{String.raw`$L$`}</Latex>
            </span>
            <span className="reward-term-kicker">LIMITE PARA REVANCHE</span>
          </div>
          <Text className="reward-term-text">Define quando uma margem já é considerada grande.</Text>
          <Text className="reward-term-footer">Constante: 50</Text>
        </Box>
      </Grid>
      <Notes>
        Mostre que a função tanh limita o efeito da margem: vitórias por margem alta se aproximam de um
        bônus máximo, e derrotas por margem alta se aproximam de uma penalidade máxima.
      </Notes>
    </Slide>

    <Slide backgroundColor="#eef3f0">
      <SectionTag>Referências</SectionTag>
      <Heading>Políticas baseline</Heading>
      <Grid gridTemplateColumns="1fr 1fr 1fr" gridGap="22px" marginTop="42px">
        <Box className="policy-card">
          <IconTitle className="policy-name" icon={FaRandom}>
            Random
          </IconTitle>
          <Text className="policy-text">
            Escolhe aleatoriamente entre puxar carta e parar. Serve como linha de base mínima.
          </Text>
        </Box>
        <Box className="policy-card">
          <IconTitle className="policy-name" icon={FaShieldAlt}>
            Conservador
          </IconTitle>
          <Text className="policy-text">
            Evita risco alto e para cedo quando está ganhando. Reduz estouros, mas pode vencer pouco.
          </Text>
        </Box>
        <Box className="policy-card">
          <IconTitle className="policy-name" icon={FaFire}>
            Agressivo
          </IconTitle>
          <Text className="policy-text">
            Continua comprando quando está atrás ou quando ainda existe chance de buscar Flip-7.
          </Text>
        </Box>
      </Grid>
      <Box className="baseline-note">
        <Text>
          As baselines deixam claro se o agente aprendido supera regras simples de comportamento.
        </Text>
      </Box>
      <Notes>
        Explique que as baselines foram escolhidas para cobrir extremos: aleatório, preservação e risco.
        A política aprendida será boa se conseguir se ajustar melhor ao estado da partida.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Referências</SectionTag>
      <Heading>Regras das políticas manuais</Heading>
      <Grid gridTemplateColumns="1fr 1fr" gridGap="24px" marginTop="18px">
        <Box className="flow-card conservative-flow">
          <IconTitle className="flow-title" icon={FaShieldAlt}>
            Conservador
          </IconTitle>
          <div className="flow-node decision">Risco alto ou crítico?</div>
          <div className="flow-branch">
            <span className="flow-answer stop">Sim: parar</span>
            <span className="flow-answer next">Não: avaliar placar</span>
          </div>
          <div className="flow-node decision">Está ganhando ou amassando?</div>
          <div className="flow-branch">
            <span className="flow-answer stop">Sim: parar</span>
            <span className="flow-answer next">Não: buscar recuperação</span>
          </div>
          <div className="flow-node action">Puxa carta se estiver perto de Flip-7 com risco baixo</div>
          <div className="flow-node action">Puxa carta se estiver destruído com risco baixo ou médio</div>
          <div className="flow-node action">Puxa carta se estiver perdendo com risco baixo</div>
          <div className="flow-node stop-node">Caso contrário: parar</div>
        </Box>
        <Box className="flow-card aggressive-flow">
          <IconTitle className="flow-title" icon={FaFire}>
            Agressivo
          </IconTitle>
          <div className="flow-node decision">Risco crítico?</div>
          <div className="flow-branch">
            <span className="flow-answer stop">Sim: parar</span>
            <span className="flow-answer next">Não: continuar avaliando</span>
          </div>
          <div className="flow-node action">Puxa carta se estiver perto de Flip-7</div>
          <div className="flow-node action">Puxa carta se estiver destruído ou perdendo</div>
          <div className="flow-node action">Puxa carta se estiver empatado ou ganhando com risco baixo ou médio</div>
          <div className="flow-node decision">Está amassando com risco alto?</div>
          <div className="flow-branch">
            <span className="flow-answer stop">Sim: parar</span>
            <span className="flow-answer draw">Não: puxar carta</span>
          </div>
        </Box>
      </Grid>
      <Notes>
        Use este slide para contrastar os extremos: o conservador protege pontuação cedo, enquanto o
        agressivo aceita risco para recuperar placar ou buscar Flip-7.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Algoritmo</SectionTag>
      <Heading>Q-Learning</Heading>
      <Grid gridTemplateColumns="1.03fr .97fr" gridColumnGap="32px" alignItems="center" marginTop="24px">
        <Box className="formula-panel light">
          <FlexBox className="q-latex-box" justifyContent="center" alignItems="center">
            <Latex>{String.raw`$$Q(s,a) \leftarrow Q(s,a) + \alpha \left[r + \gamma \max_{a'} Q(s',a') - Q(s,a)\right]$$`}</Latex>
          </FlexBox>
          <Text className="code-caption">
            A política final escolhe a ação com maior valor Q em cada estado.
          </Text>
        </Box>
        <Grid gridTemplateColumns="1fr 1fr" gridGap="10px">
          <Box className="reward-term-card q-param-card">
            <div className="reward-term-header">
              <span className="reward-term-title latex-card-title">
                <Latex>{String.raw`$\alpha$`}</Latex>
              </span>
              <span className="reward-term-kicker">ALPHA</span>
            </div>
            <Text className="reward-term-text">Taxa de aprendizado.</Text>
            <Text className="reward-term-footer">Valor: 0.10</Text>
          </Box>
          <Box className="reward-term-card q-param-card">
            <div className="reward-term-header">
              <span className="reward-term-title latex-card-title">
                <Latex>{String.raw`$\gamma$`}</Latex>
              </span>
              <span className="reward-term-kicker">GAMMA</span>
            </div>
            <Text className="reward-term-text">Peso das recompensas futuras.</Text>
            <Text className="reward-term-footer">Valor: 0.95</Text>
          </Box>
          <Box className="reward-term-card q-param-card">
            <div className="reward-term-header">
              <span className="reward-term-title latex-card-title">
                <Latex>{String.raw`$\epsilon_0$`}</Latex>
              </span>
              <span className="reward-term-kicker">EXPLORAÇÃO INICIAL</span>
            </div>
            <Text className="reward-term-text">Chance inicial de escolher ação aleatória.</Text>
            <Text className="reward-term-footer">Valor: 0.35</Text>
          </Box>
          <Box className="reward-term-card q-param-card">
            <div className="reward-term-header">
              <span className="reward-term-title latex-card-title">
                <Latex>{String.raw`$\epsilon_{min}$`}</Latex>
              </span>
              <span className="reward-term-kicker">EXPLORAÇÃO MÍNIMA</span>
            </div>
            <Text className="reward-term-text">Exploração residual no fim do treino.</Text>
            <Text className="reward-term-footer">Valor: 0.02</Text>
          </Box>
          <Box className="reward-term-card q-param-card">
            <div className="reward-term-header">
              <span className="reward-term-title latex-card-title">
                <Latex>{String.raw`$N$`}</Latex>
              </span>
              <span className="reward-term-kicker">EPISÓDIOS</span>
            </div>
            <Text className="reward-term-text">Rodadas usadas para treinar a tabela Q.</Text>
            <Text className="reward-term-footer">Valor: 50.000</Text>
          </Box>
          <Box className="reward-term-card q-param-card">
            <div className="reward-term-header">
              <span className="reward-term-title latex-card-title">
                <Latex>{String.raw`$|A|$`}</Latex>
              </span>
              <span className="reward-term-kicker">AÇÕES</span>
            </div>
            <Text className="reward-term-text">Comprar carta ou parar.</Text>
            <Text className="reward-term-footer">Valor: 2</Text>
          </Box>
        </Grid>
      </Grid>
      <Notes>
        Ressalte que a exploração decai gradualmente. No início o agente testa alternativas; no fim ele
        explora pouco e usa majoritariamente os valores aprendidos.
      </Notes>
    </Slide>

    <Slide backgroundColor="#eef3f0">
      <SectionTag>Experimento</SectionTag>
      <Heading>Pipeline de avaliação</Heading>
      <Grid gridTemplateColumns="repeat(4, 1fr)" gridGap="14px" marginTop="30px">
        <Box className="step-card">
          <span className="step-number">1</span>
          <IconBadge className="step-icon" icon={FaBrain} />
          <Text className="step-title">Treinar</Text>
          <Text className="step-text">50.000 episódios atualizando a tabela Q.</Text>
        </Box>
        <Box className="step-card">
          <span className="step-number">2</span>
          <IconBadge className="step-icon" icon={FaRoute} />
          <Text className="step-title">Extrair política</Text>
          <Text className="step-text">Selecionar a melhor ação estimada para cada estado.</Text>
        </Box>
        <Box className="step-card">
          <span className="step-number">3</span>
          <IconBadge className="step-icon" icon={FaDice} />
          <Text className="step-title">Simular</Text>
          <Text className="step-text">Rodar 2.000 partidas por política comparada.</Text>
        </Box>
        <Box className="step-card">
          <span className="step-number">4</span>
          <IconBadge className="step-icon" icon={FaChartBar} />
          <Text className="step-title">Medir</Text>
          <Text className="step-text">Pontuação, vitórias, estouros, Flip-7, saldo e recompensa.</Text>
        </Box>
      </Grid>
      <Box className="callout horizontal">
        <IconTitle className="callout-title" icon={FaFlagCheckered}>
          Reprodutibilidade
        </IconTitle>
        <Text className="callout-body">
          As sementes de aleatoriedade foram fixadas em 42 para manter resultados comparáveis entre
          execuções.
        </Text>
      </Box>
      <Notes>
        Mostre que a comparação é feita sob o mesmo ambiente e com as mesmas métricas. Isso torna a
        diferença entre políticas atribuível à estratégia de decisão.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Resultados</SectionTag>
      <Heading>Recompensa média</Heading>
      <Grid className="chart-detail-layout" gridTemplateColumns="1.08fr .92fr" gridColumnGap="28px" alignItems="center">
        <Figure
          src="/assets/flip7_recompensa_media.png"
          alt="Gráfico de recompensa média por política"
          caption="Recompensa média em 2.000 simulações por política."
        />
        <Box className="centered-takeaway">
          <Text className="single-takeaway">
            Mesmo negativa, a recompensa média do Q-Learning foi a maior em comparação com as políticas
            manuais.
          </Text>
        </Box>
      </Grid>
      <Notes>
        Enfatize que todas as recompensas médias continuam negativas porque o adversário é forte. A
        comparação relevante é relativa: o Q-Learning reduz a desvantagem frente às baselines.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Resultados</SectionTag>
      <Heading>Taxa de vitória</Heading>
      <Grid className="chart-detail-layout" gridTemplateColumns="1.08fr .92fr" gridColumnGap="28px" alignItems="center">
        <Figure
          src="/assets/flip7_taxa_vitoria.png"
          alt="Gráfico de taxa de vitória por política"
          caption="Proporção de vitórias em 2.000 simulações por política."
        />
        <Box className="centered-takeaway">
          <Text className="single-takeaway">
            O Q-Learning apresentou a maior taxa de vitória entre as políticas, superando as estratégias
            manuais.
          </Text>
        </Box>
      </Grid>
      <Notes>
        Mostre que a taxa de vitória reforça a leitura da recompensa: o Q-Learning não só perde menos, como
        também vence mais que as regras manuais.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Resultados</SectionTag>
      <Heading>Taxa de estouro</Heading>
      <Grid className="chart-detail-layout" gridTemplateColumns="1.08fr .92fr" gridColumnGap="28px" alignItems="center">
        <Figure
          src="/assets/flip7_taxa_estouro.png"
          alt="Gráfico de taxa de estouro por política"
          caption="Frequência com que o agente estourou em cada política."
        />
        <Box className="centered-takeaway">
          <Text className="single-takeaway">
            O Q-Learning assume mais risco que o conservador, mas estoura menos que a política agressiva.
          </Text>
        </Box>
      </Grid>
      <Notes>
        Este slide mostra que a melhora do Q-Learning não vem de evitar completamente o risco. Ele aceita
        risco quando o estado da rodada justifica.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Resultados</SectionTag>
      <Heading>Taxa de Flip-7</Heading>
      <Grid className="chart-detail-layout" gridTemplateColumns="1.08fr .92fr" gridColumnGap="28px" alignItems="center">
        <Figure
          src="/assets/flip7_taxa_flip7.png"
          alt="Gráfico de taxa de Flip-7 por política"
          caption="Frequência com que o agente alcançou Flip-7."
        />
        <Box className="centered-takeaway">
          <Text className="single-takeaway">
            O Flip-7 foi raro em todas as políticas; o desempenho do Q-Learning vem mais do equilíbrio de
            risco do que da dependência desse bônus.
          </Text>
        </Box>
      </Grid>
      <Notes>
        Explique que o bônus existe, mas é difícil de alcançar. O agente melhora principalmente por ajustar
        risco e parada, não por depender de Flip-7.
      </Notes>
    </Slide>

    <Slide backgroundColor="#eef3f0">
      <SectionTag>Resultados</SectionTag>
      <Heading>Pontuação média final</Heading>
      <Grid className="chart-detail-layout" gridTemplateColumns="1.08fr .92fr" gridColumnGap="28px" alignItems="center">
        <Figure
          src="/assets/flip7_pontuacao_media_final.png"
          alt="Gráfico de pontuação média final por política"
          caption="Pontuação média final do agente e do adversário."
        />
        <Box className="centered-takeaway">
          <Text className="single-takeaway">
            Mesmo contra um adversário com pontuação média alta, o Q-Learning aumenta a pontuação média do
            agente e mantém o melhor saldo relativo.
          </Text>
        </Box>
      </Grid>
      <Notes>
        Use este slide para mostrar que o agente aprendido não está apenas ganhando por acaso; ele tende a
        terminar com mais pontos médios do que as políticas simples.
      </Notes>
    </Slide>

    <Slide backgroundColor="#eef3f0">
      <SectionTag>Resultados</SectionTag>
      <Heading>Quantidade média de cartas</Heading>
      <Grid className="chart-detail-layout" gridTemplateColumns="1.08fr .92fr" gridColumnGap="28px" alignItems="center">
        <Figure
          src="/assets/flip7_quantidade_media_cartas.png"
          alt="Gráfico de quantidade média de cartas por política"
          caption="Quantidade média de cartas mantidas ao final da rodada."
        />
        <Box className="centered-takeaway">
          <Text className="single-takeaway">
            O Q-Learning mantém mais cartas que as políticas manuais mais simples, mas ainda equilibra o
            risco e abre mão de ter mais cartas na média quando comparado à política agressiva.
          </Text>
        </Box>
      </Grid>
      <Notes>
        Use este slide para conectar quantidade de cartas e risco: carregar mais cartas aumenta potencial
        de pontuação, mas também aumenta a chance de repetir numeração.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Resultados</SectionTag>
      <Heading>Distribuição final das partidas</Heading>
      <Grid className="distribution-layout" gridTemplateColumns="1.2fr .8fr" gridColumnGap="30px" alignItems="center">
        <Figure
          src="/assets/flip7_resultado_final.png"
          alt="Gráfico empilhado de vitórias, derrotas e empates"
          caption="Proporção de vitórias, derrotas e empates."
        />
        <Box>
          <Grid className="distribution-metrics" gridTemplateColumns="1fr 1fr" gridGap="14px">
            <MetricCard label="Random" value="11,4%" detail="" icon={FaRandom} />
            <MetricCard label="Conservador" value="7,1%" detail="" icon={FaShieldAlt} />
            <MetricCard label="Agressivo" value="26,2%" detail="" icon={FaFire} />
            <MetricCard label="Q-Learning" value="38,4%" detail="" icon={FaBrain} />
          </Grid>
        </Box>
      </Grid>
      <Notes>
        Aqui a melhoria do Q-Learning fica mais direta. A política agressiva melhora em relação às outras,
        mas o Q-Learning ainda vence mais porque decide melhor quando preservar ou aceitar risco.
      </Notes>
    </Slide>

    <Slide backgroundColor="#eef3f0">
      <SectionTag>Resultados</SectionTag>
      <Heading>Severidade das derrotas</Heading>
      <Grid className="chart-detail-layout" gridTemplateColumns="1.08fr .92fr" gridColumnGap="28px" alignItems="center">
        <Figure
          src="/assets/flip7_delta_derrotas.png"
          alt="Gráfico de média do delta final nas derrotas"
          caption="Média do delta final apenas nas partidas perdidas."
        />
        <Box className="centered-takeaway">
          <Text className="single-takeaway">
            Nas derrotas, um delta menos negativo indica que a política reduziu a distância média para o
            adversário.
          </Text>
        </Box>
      </Grid>
      <Notes>
        Explique o DELTA: pontuação do agente menos pontuação do adversário. Quanto menos negativo nas
        derrotas, menor a distância quando o agente perde.
      </Notes>
    </Slide>

    <Slide backgroundColor="#12201c">
      <SectionTag>Análise</SectionTag>
      <Heading color="#faf7f2">O que a política aprendeu?</Heading>
      <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="24px" marginTop="30px">
        <Box className="dark-card">
          <IconTitle className="dark-card-title" icon={FaPlay}>
            Tende a puxar carta quando...
          </IconTitle>
          <UnorderedList className="light-list small">
            <ListItem>está destruído ou perdendo no saldo;</ListItem>
            <ListItem>o risco de repetição ainda é baixo ou médio;</ListItem>
            <ListItem>tem poucas cartas e ainda existe espaço para crescer;</ListItem>
            <ListItem>parar apenas preservaria uma derrota provável.</ListItem>
          </UnorderedList>
        </Box>
        <Box className="dark-card">
          <IconTitle className="dark-card-title" icon={FaStop}>
            Tende a parar quando...
          </IconTitle>
          <UnorderedList className="light-list small">
            <ListItem>já está ganhando ou amassando;</ListItem>
            <ListItem>o risco de repetir sobe para alto ou crítico;</ListItem>
            <ListItem>tem cartas suficientes para que perder tudo seja caro;</ListItem>
            <ListItem>preservar vantagem vale mais que buscar margem.</ListItem>
          </UnorderedList>
        </Box>
      </Grid>
      <Notes>
        Este slide traduz a tabela Q para linguagem de jogo. A política não é simplesmente agressiva:
        ela ajusta a ação ao estado.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Números finais</SectionTag>
      <Heading>
        <TitleIcon icon={FaTable} />
        <span>Resumo Geral</span>
      </Heading>
      <Box className="results-table" marginTop="24px">
        <Grid className="table-row table-head" gridTemplateColumns="1.1fr repeat(5, 1fr)">
          <span>Política</span>
          <span>Recompensa</span>
          <span>Pontos agente</span>
          <span>Saldo</span>
          <span>Vitórias</span>
          <span>Estouro</span>
        </Grid>
        {[
          ['Random', '-112,97', '11,78', '-19,77', '11,4%', '13,0%'],
          ['Conservador', '-122,26', '11,31', '-20,48', '7,1%', '2,5%'],
          ['Agressivo', '-78,10', '14,31', '-17,29', '26,2%', '62,2%'],
          ['Q-Learning', '-48,55', '17,11', '-14,62', '38,4%', '41,5%'],
        ].map((row) => (
          <Grid
            className={row[0] === 'Q-Learning' ? 'table-row highlight-row' : 'table-row'}
            gridTemplateColumns="1.1fr repeat(5, 1fr)"
            key={row[0]}
          >
            {row.map((cell) => (
              <span key={cell}>{cell}</span>
            ))}
          </Grid>
        ))}
      </Box>
      <Notes>
        Mostre a linha do Q-Learning como síntese. Ele não tem menor estouro, mas essa taxa de risco gera
        melhor recompensa, maior pontuação média e mais vitórias.
      </Notes>
    </Slide>

    <Slide backgroundColor="#faf7f2">
      <SectionTag>Limites</SectionTag>
      <Heading>Observações</Heading>
      <Grid gridTemplateColumns="1fr 1fr" gridGap="18px" marginTop="14px">
        <Box className="observation-card">
          <IconTitle className="observation-title" icon={FaFlagCheckered}>
            Rodada isolada
          </IconTitle>
          <div className="observation-section">
            <span>Adaptação</span>
            <p>O jogo foi modelado como uma rodada única.</p>
          </div>
          <div className="observation-section">
            <span>Melhoria / consequência</span>
            <p>Uma versão multi-rodada permitiria avaliar recuperação e estratégia de longo prazo.</p>
          </div>
        </Box>
        <Box className="observation-card">
          <IconTitle className="observation-title" icon={FaSitemap}>
            Estado discretizado
          </IconTitle>
          <div className="observation-section">
            <span>Adaptação</span>
            <p>Placar, risco e cartas foram resumidos em categorias.</p>
          </div>
          <div className="observation-section">
            <span>Melhoria / consequência</span>
            <p>Estados mais detalhados poderiam revelar decisões melhores em cenários específicos.</p>
          </div>
        </Box>
        <Box className="observation-card">
          <IconTitle className="observation-title" icon={FaRobot}>
            Adversário especial
          </IconTitle>
          <div className="observation-section">
            <span>Adaptação</span>
            <p>O adversário usa uma regra fixa e não perde pontos ao evitar estouro.</p>
          </div>
          <div className="observation-section">
            <span>Melhoria / consequência</span>
            <p>Testar adversários variados mostraria se a política generaliza melhor.</p>
          </div>
        </Box>
        <Box className="observation-card">
          <IconTitle className="observation-title" icon={FaChartLine}>
            Recompensa parametrizada
          </IconTitle>
          <div className="observation-section">
            <span>Adaptação</span>
            <p>A função combina resultado, margem final e variação do saldo.</p>
          </div>
          <div className="observation-section">
            <span>Melhoria / consequência</span>
            <p>Outros pesos podem mudar o equilíbrio entre risco, vitória e preservação.</p>
          </div>
        </Box>
      </Grid>
      <Notes>
        Seja claro que a modelagem é uma abstração. As limitações não invalidam o resultado; elas definem o
        escopo correto da conclusão.
      </Notes>
    </Slide>

    <Slide backgroundColor="#12201c">
      <SectionTag>Relatório</SectionTag>
      <Heading color="#faf7f2">Mais Detalhes</Heading>
      <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="42px" alignItems="center" height="72%">
        <FlexBox className="colab-action-wrap" justifyContent="flex-end" alignItems="center">
          <Link
            className="colab-button"
            href="https://colab.research.google.com/drive/1fXA786RvriFkLS9sl38W4xG2v5NxZbyL?usp=sharing"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaBookOpen aria-hidden="true" />
            Abrir Notebook
          </Link>
        </FlexBox>
        <FlexBox className="colab-visual-wrap" justifyContent="flex-start" alignItems="center">
          <Image className="colab-logo" src={assetPath('/assets/google-colab-logo.png')} alt="Google Colab" />
        </FlexBox>
      </Grid>
      <Notes>
        Convide a turma a abrir o notebook no Colab para ver a implementação completa, os gráficos
        gerados e a célula interativa do jogo contra a política Q-Learning.
      </Notes>
    </Slide>
  </Deck>
);

createRoot(document.getElementById('app')!).render(<Presentation />);
