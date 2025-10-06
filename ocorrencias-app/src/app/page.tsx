import React from 'react';


interface ProjectSectionProps {
  title: string;
  children: React.ReactNode;
}

function ProjectSection({ title, children }: ProjectSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white border-b-2 border-sky-500 pb-2 mb-6">
        {title}
      </h2>
      <div className="prose prose-lg dark:prose-invert max-w-none text-lg leading-relaxed">
        {children}
      </div>
    </section>
  );
}


interface NewsReferenceProps {
  date: string;
  title: string;
  source: string;
  url: string;
}

function NewsReference({ date, title, source, url }: NewsReferenceProps) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block p-4 my-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg hover:shadow-lg hover:border-sky-500 transition-all duration-300"
    >
      <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">{date}</p>
      <h4 className="font-bold text-gray-800 dark:text-white my-1">{title}</h4>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        Fonte: {source} <span className="ml-2">🔗</span>
      </div>
    </a>
  );
}


function ValueCard({icon, title, description}: {icon: string, title: string, description: string}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-slate-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}


// --- Componente Principal ---

export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Cabeçalho */}
          <header className="text-center py-10 border-b-2 border-slate-200 dark:border-gray-700 mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Sistema Preditivo de Ocorrências de Latrocínio para Patrulhamento Estratégico
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Documento de Visão do Projeto | Recife, PE
            </p>
          </header>

          {/* Corpo do Documento */}
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
                A questão central que este projeto busca responder é: <em>"Como a análise preditiva pode transformar dados brutos em inteligência acionável para a Polícia Civil, permitindo uma atuação mais proativa e eficiente?"</em> A resposta está na capacidade de antever tendências criminais para:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 not-prose">
                  <ValueCard 
                    icon="🛡️"
                    title="Otimizar Recursos"
                    description="Direcionar patrulhas e efetivo para as áreas de maior risco antes que os crimes ocorram."
                  />
                  <ValueCard 
                    icon="🤖"
                    title="Aumentar Fator de Dissuasão"
                    description="A presença policial intensificada em zonas de risco pode inibir a ação de criminosos."
                  />
                  <ValueCard 
                    icon="🧠"
                    title="Decisões Baseadas em Dados"
                    description="Complementar a experiência de campo com inteligência analítica para um planejamento robusto."
                  />
                  <ValueCard 
                    icon="🎯"
                    title="Reduzir Tempo de Resposta"
                    description="Com equipes já posicionadas estrategicamente, o tempo de resposta a ocorrências pode ser reduzido."
                  />
              </div>
          </ProjectSection>

          <ProjectSection title="3. O Escopo da Solução (MVP)">
            <p>
              O objetivo deste Mínimo Produto Viável (MVP) é desenvolver um modelo de Machine Learning supervisionado para <strong>prever o número de ocorrências de latrocínio por bairro</strong> na cidade do Recife para o período de uma semana.
            </p>
            <p>
              A solução final entregará um painel de controle (dashboard) simples, exibindo um mapa de calor ou uma lista priorizada dos bairros com maior probabilidade de incidentes, permitindo que os gestores tomem medidas preventivas de forma ágil.
            </p>
          </ProjectSection>
          
          <ProjectSection title="4. Relevância e Urgência">
              <p>
                A necessidade desta abordagem é validada por relatórios recentes, que apontam para a persistência e o aumento desses crimes violentos.
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
          
          <footer className="text-center mt-20 py-6 border-t border-slate-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Projeto Integrador &copy; {new Date().getFullYear()}
            </p>
          </footer>

        </div>
      </div>
    </>
  );
}