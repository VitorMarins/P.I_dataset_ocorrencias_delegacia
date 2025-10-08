import React from 'react';
import ProjectSection from './_components/projectSection/projectSection';
import ValueCard from './_components/valueCard/valueCard';
import NewsReference from './_components/newsReference/newsReference';

export default function HomePage() {
  return (
    <>
      <div className="w-full min-h-screen mt-10 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center py-10 border-b-2 border-slate-200 dark:border-gray-700 mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gra
            y-900 dark:text-black">
              Sistema Preditivo de Ocorrências de Latrocínio para Patrulhamento Estratégico
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Documento de Visão do Projeto | Recife, PE
            </p>
          </header>

          <ProjectSection title="1. História de Dados e Justificativa">
            <p>
              A segurança pública é um desafio constante que exige a otimização contínua dos recursos disponíveis. Atualmente, as estratégias de patrulhamento e alocação de efetivo da Polícia Civil são, em grande parte, reativas, baseadas em dados históricos e na experiência dos agentes.
            </p>
            <p>
              O crime de latrocínio (roubo seguido de morte), em particular, representa um dos delitos de maior impacto social. Análises indicam que este é um dos crimes mais prevalentes registrados, exigindo uma atenção estratégica e prioritária.
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
                color="bg-blue-500"
              />
              <ValueCard
                title="Aumentar Fator de Dissuasão"
                description="A atuação policial reforçada em áreas de risco pode desestimular a atividade criminosa."
                color="bg-cyan-400"
              />
              <ValueCard
                title="Decisões Baseadas em Dados"
                description="Aprimorar a experiência de campo com inteligência analítica para um planejamento robusto."
                color="bg-green-400"
              />
              <ValueCard
                title="Reduzir Tempo de Resposta"
                description="Com equipes já posicionadas estrategicamente, o tempo de resposta a ocorrências pode ser reduzido."
                color="bg-yellow-400"
              />
            </div>
          </ProjectSection>

          <ProjectSection title="3. O Escopo da Solução (MVP)">
            <p>
              O objetivo deste Mínimo Produto Viável (MVP) é desenvolver um modelo de Machine Learning supervisionado capaz de <strong>prever o número de ocorrências de latrocínio por bairro</strong> na cidade do Recife.
            </p>
            <p>
              A solução final entregará um painel de controle (dashboard) intuitivo, exibindo uma lista priorizada dos bairros com maior probabilidade de incidentes, permitindo que os gestores tomem medidas preventivas de forma ágil.
            </p>
          </ProjectSection>

          <ProjectSection title="4. Relevância e Urgência">
            <p>
              Relatórios recentes, que indicam a continuidade e o crescimento desses crimes violentos, confirmam a necessidade dessa estratégia.
            </p>
            <NewsReference
              date="07 de Junho de 2023"
              title="Pernambuco tem menos mortes violentas em maio, mas número de latrocínios é maior"
              source="CBN Recife"
              url="https://www.cbnrecife.com/artigo/pernambuco-tem-menos-mortes-violentas-em-maio-mas-numero-de-latrocinios-e-maior-segundo-dados-da-sds"
            />
            <NewsReference
              date="05 de Fevereiro de 2025"
              title="LATROCÍNIOS CRESCERAM, FEMINICÍDIOS REGISTRARAM MESMO NÚMERO"
              source="Jornal do Commercio"
              url="https://jc.uol.com.br/colunas/seguranca/2025/02/05/pernambuco-soma-286-mortes-violentas-em-janeiro-de-2025-queda-de-194.html"
            />
          </ProjectSection>
        </div>
      </div>
    </>
  );
}