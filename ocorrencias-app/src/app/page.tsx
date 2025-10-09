import React from 'react';
import ProjectSection from './_components/projectSection/projectSection';
import ValueCard from './_components/valueCard/valueCard';
import NewsReference from './_components/newsReference/newsReference';
import DarkStrip from './_components/darkStrip/darkStrip';

export default function HomePage() {
  return (
    <>
      <div className="w-full min-h-screen mt-16 p-4 sm:p-8">
        <div>
          <header className="text-center py-10 border-b-2 border-slate-200 dark:border-gray-300 mb-10 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-black">
              Sistema Preditivo de Ocorrências de Latrocínio para Patrulhamento Estratégico
            </h1>
            <p className="mt-4 text-lg font-bold text-gray dark:text-[#5B5959]">
              Documento de Visão do Projeto | Recife, PE
            </p>
          </header>

          <ProjectSection title="1. História de Dados e Justificativa">
            <p className="font-normal">
            A segurança pública constitui um desafio contínuo e complexo, que demanda não apenas recursos, mas sua alocação estratégica e eficiente. As atuais políticas de patrulhamento e distribuição de efetivo da Polícia Civil ainda se caracterizam, em grande medida, por abordagens reativas, fundamentadas em dados históricos e na experiência subjetiva dos agentes, o que limita a capacidade de prevenção e resposta a crimes de alta gravidade.
            </p>
            <p className="font-normal mt-2">
            Entre os delitos de maior impacto social, destaca-se o latrocínio — roubo seguido de morte —, cuja ocorrência representa uma das maiores ameaças à sensação de segurança da população. Estudos criminais apontam que o latrocínio figura entre os crimes mais prevalentes e violentos registrados, exigindo atenção estratégica, priorização operacional e implementação de políticas de prevenção baseadas em inteligência. A adoção de abordagens proativas, sustentadas em análise de dados e modelagem preditiva, é essencial para reduzir a incidência desses crimes e otimizar a eficácia das ações policiais.
            </p>
          </ProjectSection>

          <ProjectSection title="2. Proposta de Valor Estratégica">
            <p>
              A questão central que este projeto busca responder é: <em>"Como a análise preditiva pode transformar dados brutos em inteligência útil para a Polícia Civil, permitindo uma atuação mais proativa e eficiente?"</em> A resposta está na capacidade de prever tendências criminais para:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 not-prose">
              <ValueCard
                title="Otimizar Recursos"
                description="Enviar patrulhas e pessoal para as regiões de maior perigo antes que os delitos aconteçam."
                color="red"
              />
              <ValueCard
                title="Aumentar Fator de Dissuasão"
                description="A atuação policial reforçada em áreas de risco pode desestimular a atividade criminosa."
                color="blue"
              />
              <ValueCard
                title="Decisões Baseadas em Dados"
                description="Aprimorar a experiência de campo com inteligência analítica para um planejamento robusto."
                color="green"
              />
              <ValueCard
                title="Reduzir Tempo de Resposta"
                description="Com equipes já posicionadas estrategicamente, o tempo de resposta a ocorrências pode ser reduzido."
                color="yellow"
              />
            </div>
          </ProjectSection>

          <DarkStrip title="3. O Escopo da Solução (MVP)">
            <p className=" max-w-4xl mx-auto text-gray-200">
              O objetivo deste Mínimo Produto Viável (MVP) é desenvolver um modelo de Machine Learning supervisionado capaz de <strong>prever o número de ocorrências de latrocínio por bairro</strong> na cidade do Recife.
            </p>
            <p className=" max-w-4xl mx-auto text-gray-200 mt-3">
              A solução final entregará um painel de controle (dashboard) intuitivo, exibindo uma lista priorizada dos bairros com maior probabilidade de incidentes, permitindo que os gestores tomem medidas preventivas de forma ágil.
            </p>
          </DarkStrip>

          <ProjectSection title="4. Relevância e Urgência">
            <p>
              Relatórios recentes, que indicam a continuidade e o crescimento desses crimes violentos, confirmam a necessidade dessa estratégia.
            </p>
            <div className='flex flex-row gap-4'>
              <NewsReference
                href="https://www.cbnrecife.com/artigo/pernambuco-tem-menos-mortes-violentas-em-maio-mas-numero-de-latrocinios-e-maior-segundo-dados-da-sds"
                date="07 de Junho de 2023"
                title="Pernambuco tem menos mortes violentas em maio, mas número de latrocínios é maior"
                source="CBN Recife"
                imageSrc="assets/Img/crop.png"
                summary="A SDS registrou queda nas mortes violentas em maio, mas os casos de latrocínio (roubo seguido de morte) aumentaram no período, indicando cenário de risco que exige ações preventivas orientadas por dados."
              />
              <NewsReference
                href="https://jc.uol.com.br/colunas/seguranca/2025/02/05/pernambuco-soma-286-mortes-violentas-em-janeiro-de-2025-queda-de-194.html"
                date="05 de Fevereiro de 2025"
                title="LATROCÍNIOS CRESCERAM, FEMINICÍDIOS REGISTRARAM MESMO NÚMERO"
                source="Jornal do Commercio"
                imageSrc="assets/Img/1_whatsapp_image_2025_01_12_at_09_10_15__1_-33514064.webp"
                summary="Levantamento aponta variações nos indicadores: crescimento dos latrocínios e estabilidade em feminicídios. O quadro reforça a relevância de modelagem preditiva para apoiar o planejamento do patrulhamento."
              />
            </div>
            <NewsReference
                href="https://www.sds.pe.gov.br/noticias/12128-pronta-resposta-da-policia-civil-resulta-na-prisao-em-flagrante-de-dois-suspeitos-de-tentativa-de-latrocinio-no-centro-do-recife?utm_source=chatgpt.com"
                date=""
                title="Pronta resposta da Polícia Civil resulta na prisão em flagrante de dois suspeitos de tentativa de latrocínio no Centro do Recife"
                source="SDS"
                imageSrc="assets/Img/Policiamento16ºBPM.jpeg"
                summary="Em pouco mais de 24 horas após uma tentativa de latrocínio ocorrida nas proximidades da Ponte Maurício de Nassau, no Centro do Recife, a Polícia Civil de Pernambuco (PCPE) fechou o cerco aos criminosos e conseguiu capturar dois dos cinco envolvidos no caso."
              />
           <a href=""></a>
            <div className="max-w-4xl mx-auto mt-6 space-y-4">
              <p>
                Esses episódios não são exceções, mas indicativos de que o latrocínio permanece como um desafio latente, de alta letalidade e de forte repercussão social.
              </p>
              <p className="font-semibold">Além dos dados, pesam dimensões humanas, sociais e institucionais:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <p>
                    <span className="font-semibold">Impacto simbólico e emocional.</span>
                    <span> O latrocínio combina violência com crime patrimonial, ferindo a sensação de segurança nas comunidades. Gera medo intenso, abala a confiança nas instituições e repercute fortemente no debate público e midiático.</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span className="font-semibold">Custo de recursos públicos.</span>
                    <span> Investigações de latrocínio demandam alto empenho de tempo, pessoal, perícia e logística, muitas vezes em contextos complexos. Reagir apenas após o fato tende a custar mais do que investir em prevenção antecipada.</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span className="font-semibold">Alocação estratégica vs. desperdício.</span>
                    <span> Sem predições confiáveis, o patrulhamento fica reativo e pouco prospectivo, levando à subutilização em áreas emergentes e sobrecarga em regiões tradicionais. A lógica preditiva orienta recursos para onde a probabilidade é maior.</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span className="font-semibold">Janela para inovação institucional.</span>
                    <span> O momento é favorável à adoção de tecnologia e inteligência policial (dados, GIS e modelos preditivos). Focar em latrocínio, com escopo por bairro, cria uma prova de conceito sólida para expansão a outros crimes de alto impacto.</span>
                  </p>
                </li>
              </ul>
            </div>
          </ProjectSection>
        </div>
      </div>
    </>
  );
}