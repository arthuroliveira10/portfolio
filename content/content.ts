export type Lang = "pt" | "en";

export type Status = "done" | "mvp" | "wip";

export interface Shot {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  status: Status;
  team?: boolean;
  stack: string[];
  points: string[];
  repo: string;
  shots?: Shot[];
  flow?: { label: string; text: string; ai?: boolean }[];
  rules?: string[];
}

export interface Content {
  nav: { about: string; ai: string; web: string; stack: string; contact: string };
  hero: {
    eyebrow: string;
    role: string;
    roleAccent: string;
    pitch: string;
    ctaProjects: string;
    ctaCv: string;
    location: string;
  };
  about: { title: string; text: string; principles: { title: string; text: string }[] };
  status: Record<Status, string>;
  team: string;
  repoLabel: string;
  aiTitle: string;
  webTitle: string;
  featured: string;
  aiProjects: Project[];
  webProjects: Project[];
  stackTitle: string;
  stack: { group: string; items: string[] }[];
  eduTitle: string;
  edu: { degree: string; school: string; when: string; courses: string[] };
  langTitle: string;
  langs: { name: string; level: number; label: string }[];
  contactTitle: string;
  contactText: string;
  footer: string;
}

const GH = "https://github.com/arthuroliveira10/";

export const content: Record<Lang, Content> = {
  pt: {
    nav: { about: "Sobre", ai: "IA", web: "Web", stack: "Stack", contact: "Contato" },
    hero: {
      eyebrow: "// Engenharia de software · IA aplicada",
      role: "Engenheiro de Software",
      roleAccent: "com foco em IA e LLMs",
      pitch:
        "Construo produtos com IA de ponta a ponta: LLMs integrados a aplicações reais, com pesquisa na web para embasar as respostas e regras que impedem a IA de inventar informação.",
      ctaProjects: "Ver projetos",
      ctaCv: "Baixar currículo (PDF)",
      location: "Belo Horizonte, MG",
    },
    about: {
      title: "Sobre",
      text: "Sou estudante de Sistemas de Informação no UNIBH. Trabalho com Next.js e TypeScript no front-end e Python/FastAPI no back-end, com Supabase, PostgreSQL, Redis e Docker. Busco uma vaga de Engenheiro de Software com foco em IA.",
      principles: [
        { title: "IA confiável", text: "Desenho o sistema para a IA não inventar: dados reais, regras e respostas aprovadas." },
        { title: "Visão de produto", text: "Planejo escopo, sprints e critérios de aceite antes de escrever código." },
        { title: "IA no dia a dia", text: "Uso agentes de código (Claude Code, Gemini CLI) com guias de projeto versionados no repositório." },
      ],
    },
    status: { done: "Concluído", mvp: "MVP funcionando", wip: "Em desenvolvimento" },
    team: "Em grupo",
    repoLabel: "Ver no GitHub",
    aiTitle: "Projetos de IA aplicada",
    webTitle: "Web, produto e equipe",
    featured: "Projeto principal",
    aiProjects: [
      {
        id: "book-constructor",
        name: "Book Constructor",
        tagline: "SaaS que cria e-books profissionais com IA",
        status: "mvp",
        stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Supabase", "Vercel AI SDK", "Groq", "Gemini", "TipTap", "Zustand", "Puppeteer"],
        flow: [
          { label: "Serper", text: "pesquisa na web" },
          { label: "Groq", text: "gera o e-book", ai: true },
          { label: "Gemini", text: "analisa o estilo", ai: true },
          { label: "Unsplash/Pexels", text: "imagens" },
          { label: "Puppeteer", text: "PDF A4" },
        ],
        points: [
          "Geração embasada em pesquisa real: o tema passa por busca no Google (Serper) e o prompt obriga o modelo a usar esses dados, citar a fonte de cada estatística e não inventar números.",
          "O Gemini extrai o \"Style DNA\" de um texto ou PDF de referência em JSON estruturado (tom, layouts, fontes). Imagens entram automaticamente via Unsplash, com o Pexels como alternativa.",
          "Editor de blocos com arrastar e soltar, desfazer/refazer, autosave, preview A4 em tempo real e 24 templates. Exportação em PDF no servidor com Puppeteer.",
          "Auth, banco Postgres e storage no Supabase.",
        ],
        repo: GH + "product-maker",
        shots: [
          { src: "/img/pm-landing.webp", alt: "Landing page do Book Constructor", caption: "Landing page" },
          { src: "/img/pm-editor.webp", alt: "Editor de blocos do Book Constructor", caption: "Editor de blocos com preview A4" },
          { src: "/img/pm-pages.webp", alt: "Páginas de e-book geradas", caption: "Páginas A4 geradas pelo próprio sistema, em 4 templates" },
        ],
      },
      {
        id: "whatsapp-bot",
        name: "Bot de Atendimento no WhatsApp",
        tagline: "Atendimento com IA e risco controlado",
        status: "wip",
        stack: ["Python", "FastAPI", "WhatsApp Cloud API", "Groq · Llama 3.3 70B", "SQLAlchemy", "PostgreSQL", "Redis", "Docker Compose"],
        points: [
          "Atendimento automático para pequenos negócios: dúvidas, pagamento via Pix, agendamento e transferência para humano. Pensado para virar plataforma multiempresa.",
          "A IA não responde livremente: ela classifica a intenção e extrai dados, e a resposta sai de mensagens e FAQs aprovadas pelo contratante.",
        ],
        flow: [
          { label: "Webhook", text: "Mensagem chega pela WhatsApp Cloud API" },
          { label: "LLM", text: "Classifica a intenção e extrai dados", ai: true },
          { label: "Regras", text: "Escolhe a resposta aprovada / FAQ" },
          { label: "Ação", text: "Envia Pix, agenda ou chama humano" },
          { label: "Estado", text: "Histórico no Redis, dados no Postgres" },
        ],
        rules: [
          "O Pix vem da configuração da empresa, nunca de texto gerado pela IA.",
          "Pagamento não é confirmado sem integração bancária.",
          "Dados separados por empresa desde o início.",
        ],
        repo: GH + "chatbot-wpp",
      },
      {
        id: "f1",
        name: "Chatbot de Fórmula 1",
        tagline: "LLM + dados reais de corrida",
        status: "done",
        stack: ["Python", "Gemini 2.0 Flash", "FastF1", "Gradio", "pytest"],
        points: [
          "Roteamento: comandos com dados exatos (tempos de volta, última corrida, info do GP) vão para a biblioteca FastF1; perguntas abertas vão para o Gemini.",
          "Guardrail em duas etapas: filtro por palavras-chave e, se não bastar, o Gemini classifica se a pergunta é sobre F1. Fora do tema, o bot recusa.",
          "Robustez: limite de 15 chamadas por minuto, timeout, cache de respostas e de dados, histórico de conversa, logs e testes com pytest.",
        ],
        repo: GH + "chatbot-f1",
        shots: [{ src: "/img/f1.webp", alt: "Chatbot de F1 respondendo tempos de volta", caption: "Execução real: voltas de Hamilton no GP da Inglaterra 2024" }],
      },
      {
        id: "neural",
        name: "Redes neurais do zero",
        tagline: "Perceptron e MLP",
        status: "done",
        stack: ["Python", "NumPy", "scikit-learn"],
        points: [
          "MLP para o problema XOR implementada sem framework: forward propagation, backpropagation com regra da cadeia e ativação sigmoide.",
          "Perceptron para um aspirador inteligente: a partir do tipo de piso, da poeira e dos obstáculos, o modelo define potência (1–3) e velocidade (1–5).",
          "Perceptron implementado manualmente (pesos, bias e função degrau) para classificação binária.",
        ],
        repo: GH + "projeto-mlp",
      },
    ],
    webProjects: [
      {
        id: "medcase",
        name: "MedCase",
        tagline: "Plataforma de casos clínicos para estudantes de medicina",
        status: "done",
        team: true,
        stack: ["HTML", "CSS", "JavaScript puro"],
        points: [
          "Protótipo navegável de alta fidelidade com 6 telas: caso clínico, linha do tempo de evolução, grupos de estudo, comunidade, dashboard e login com SSO e aviso de LGPD.",
          "CSS modular por tela, layout responsivo e atalhos de teclado, sem bibliotecas e sem build.",
        ],
        repo: GH + "Prototipo-MedCase",
        shots: [
          { src: "/img/medcase-1.webp", alt: "MedCase: caso clínico", caption: "Caso clínico" },
          { src: "/img/medcase-5.webp", alt: "MedCase: dashboard", caption: "Dashboard" },
          { src: "/img/medcase-6.webp", alt: "MedCase: login", caption: "Login com SSO" },
        ],
      },
      {
        id: "data-insights",
        name: "Data Insights",
        tagline: "Landing page responsiva",
        status: "done",
        stack: ["HTML", "CSS3", "JavaScript"],
        points: ["Landing para uma empresa fictícia de análise de dados, com menu mobile, serviços, casos de sucesso e formulário de contato."],
        repo: GH + "Trabalho-de-usabilidade-e-desenvolvimento",
        shots: [{ src: "/img/datainsights.webp", alt: "Landing page Data Insights" }],
      },
      {
        id: "sinergia17",
        name: "Sinergia17",
        tagline: "Jogo sobre as ODS da ONU",
        status: "done",
        team: true,
        stack: ["React", "Vite", "Material UI", "Node/Express", "SQLite"],
        points: ["Site do jogo e API REST que salva nome e tempo de cada jogador e mostra o ranking dos melhores tempos."],
        repo: GH + "Sinergia17",
        shots: [{ src: "/img/sinergia.webp", alt: "Sinergia17: ranking", caption: "Ranking com dados de exemplo" }],
      },
      {
        id: "quality",
        name: "Qualidade de Software",
        tagline: "Testes automatizados e CI",
        status: "done",
        team: true,
        stack: ["Python", "pytest", "GitHub Actions", "Java", "JUnit 5"],
        points: [
          "Pipeline de CI no GitHub Actions que roda os testes com pytest a cada commit.",
          "Testes unitários com JUnit 5 para um validador de usuário, cobrindo cenários válidos, inválidos e nulos.",
        ],
        repo: GH + "Qualidade-De-Software",
      },
    ],
    stackTitle: "Stack",
    stack: [
      { group: "IA & LLMs", items: ["Groq · Llama 3.3", "Gemini", "Vercel AI SDK", "Prompt engineering", "Pesquisa web (Serper)", "Guardrails", "Classificação de intenção", "scikit-learn", "NumPy"] },
      { group: "Back-end", items: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Supabase", "Redis", "Node/Express", "C# .NET", "Java"] },
      { group: "Front-end", items: ["Next.js", "React", "TypeScript", "Tailwind", "Zustand", "TipTap", "Gradio", "HTML/CSS"] },
      { group: "DevOps & qualidade", items: ["Git/GitHub", "GitHub Actions", "Docker", "Vercel", "pytest", "JUnit 5", "MPS.BR"] },
    ],
    eduTitle: "Formação",
    edu: {
      degree: "Bacharelado em Sistemas de Informação",
      school: "Centro Universitário de Belo Horizonte (UNIBH)",
      when: "Em andamento",
      courses: ["Inteligência Artificial", "Gestão e Qualidade de Software", "Análise de Dados e Big Data", "Sistemas Distribuídos e Mobile", "Usabilidade e Desenvolvimento Web"],
    },
    langTitle: "Idiomas",
    langs: [
      { name: "Português", level: 4, label: "nativo" },
      { name: "Inglês", level: 2, label: "intermediário" },
      { name: "Espanhol", level: 1, label: "básico" },
    ],
    contactTitle: "Vamos conversar",
    contactText: "Estou aberto a vagas de Engenheiro de Software com foco em IA. O jeito mais rápido de falar comigo é por e-mail ou LinkedIn.",
    footer: "Feito com Next.js e Tailwind, publicado na Vercel.",
  },
  en: {
    nav: { about: "About", ai: "AI", web: "Web", stack: "Stack", contact: "Contact" },
    hero: {
      eyebrow: "// Software engineering · Applied AI",
      role: "Software Engineer",
      roleAccent: "focused on AI and LLMs",
      pitch:
        "I build AI products end to end: LLMs wired into real applications, with web research to ground the answers and rules that keep the model from making things up.",
      ctaProjects: "See projects",
      ctaCv: "Download résumé (PDF, Portuguese)",
      location: "Belo Horizonte, Brazil",
    },
    about: {
      title: "About",
      text: "I'm an Information Systems student at UNIBH. I work with Next.js and TypeScript on the front end and Python/FastAPI on the back end, plus Supabase, PostgreSQL, Redis and Docker. I'm looking for a Software Engineer role focused on AI.",
      principles: [
        { title: "Reliable AI", text: "I design systems so the AI can't make things up: real data, rules and approved answers." },
        { title: "Product mindset", text: "I plan scope, sprints and acceptance criteria before writing code." },
        { title: "AI in my workflow", text: "I use coding agents (Claude Code, Gemini CLI) with project guides versioned in the repo." },
      ],
    },
    status: { done: "Done", mvp: "Working MVP", wip: "In progress" },
    team: "Team project",
    repoLabel: "View on GitHub",
    aiTitle: "Applied AI projects",
    webTitle: "Web, product and teamwork",
    featured: "Featured project",
    aiProjects: [
      {
        id: "book-constructor",
        name: "Book Constructor",
        tagline: "SaaS that creates professional e-books with AI",
        status: "mvp",
        stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Supabase", "Vercel AI SDK", "Groq", "Gemini", "TipTap", "Zustand", "Puppeteer"],
        flow: [
          { label: "Serper", text: "web research" },
          { label: "Groq", text: "writes the e-book", ai: true },
          { label: "Gemini", text: "analyzes style", ai: true },
          { label: "Unsplash/Pexels", text: "images" },
          { label: "Puppeteer", text: "A4 PDF" },
        ],
        points: [
          "Grounded generation: the topic goes through a Google search (Serper), and the prompt forces the model to use that data, cite the source of every statistic and never invent numbers.",
          "Gemini extracts a \"Style DNA\" from a reference text or PDF as structured JSON (tone, layouts, fonts). Images are added automatically from Unsplash, with Pexels as a fallback.",
          "Block editor with drag and drop, undo/redo, autosave, live A4 preview and 24 templates. Server-side PDF export with Puppeteer.",
          "Auth, Postgres database and storage on Supabase.",
        ],
        repo: GH + "product-maker",
        shots: [
          { src: "/img/pm-landing.webp", alt: "Book Constructor landing page", caption: "Landing page" },
          { src: "/img/pm-editor.webp", alt: "Book Constructor block editor", caption: "Block editor with A4 preview" },
          { src: "/img/pm-pages.webp", alt: "Generated e-book pages", caption: "A4 pages rendered by the app itself, in 4 templates" },
        ],
      },
      {
        id: "whatsapp-bot",
        name: "WhatsApp Support Bot",
        tagline: "AI customer support with controlled risk",
        status: "wip",
        stack: ["Python", "FastAPI", "WhatsApp Cloud API", "Groq · Llama 3.3 70B", "SQLAlchemy", "PostgreSQL", "Redis", "Docker Compose"],
        points: [
          "Automated support for small businesses: questions, Pix payments, scheduling and handoff to a human. Designed to grow into a multi-tenant platform.",
          "The AI never answers freely: it classifies intent and extracts data, and the reply comes from messages and FAQs approved by the business.",
        ],
        flow: [
          { label: "Webhook", text: "Message arrives via WhatsApp Cloud API" },
          { label: "LLM", text: "Classifies intent and extracts data", ai: true },
          { label: "Rules", text: "Picks the approved reply / FAQ" },
          { label: "Action", text: "Sends Pix, books a slot or calls a human" },
          { label: "State", text: "History in Redis, data in Postgres" },
        ],
        rules: [
          "Pix details come from the business settings, never from AI-generated text.",
          "Payments are never confirmed without a bank integration.",
          "Data is separated per business from day one.",
        ],
        repo: GH + "chatbot-wpp",
      },
      {
        id: "f1",
        name: "Formula 1 Chatbot",
        tagline: "LLM + real race data",
        status: "done",
        stack: ["Python", "Gemini 2.0 Flash", "FastF1", "Gradio", "pytest"],
        points: [
          "Routing: commands that need exact data (lap times, last race, GP info) go to the FastF1 library; open questions go to Gemini.",
          "Two-step guardrail: a keyword filter first and, if that's not enough, Gemini classifies whether the question is about F1. Off-topic questions are declined.",
          "Robustness: 15 calls/minute rate limit, timeouts, response and data caching, chat history, logging and pytest tests.",
        ],
        repo: GH + "chatbot-f1",
        shots: [{ src: "/img/f1.webp", alt: "F1 chatbot answering lap times", caption: "Real run: Hamilton's laps at the 2024 British GP" }],
      },
      {
        id: "neural",
        name: "Neural networks from scratch",
        tagline: "Perceptron and MLP",
        status: "done",
        stack: ["Python", "NumPy", "scikit-learn"],
        points: [
          "MLP solving XOR with no framework: forward propagation, backpropagation with the chain rule and sigmoid activation.",
          "Perceptron for a smart vacuum: from floor type, dust level and obstacles, the model picks suction power (1–3) and speed (1–5).",
          "Hand-written perceptron (weights, bias and step function) for binary classification.",
        ],
        repo: GH + "projeto-mlp",
      },
    ],
    webProjects: [
      {
        id: "medcase",
        name: "MedCase",
        tagline: "Clinical case platform for medical students",
        status: "done",
        team: true,
        stack: ["HTML", "CSS", "Vanilla JavaScript"],
        points: [
          "High-fidelity clickable prototype with 6 screens: clinical case, progress timeline, study groups, community feed, dashboard and SSO login with an LGPD notice.",
          "Modular CSS per screen, responsive layout and keyboard shortcuts, with no libraries and no build step.",
        ],
        repo: GH + "Prototipo-MedCase",
        shots: [
          { src: "/img/medcase-1.webp", alt: "MedCase: clinical case", caption: "Clinical case" },
          { src: "/img/medcase-5.webp", alt: "MedCase: dashboard", caption: "Dashboard" },
          { src: "/img/medcase-6.webp", alt: "MedCase: login", caption: "SSO login" },
        ],
      },
      {
        id: "data-insights",
        name: "Data Insights",
        tagline: "Responsive landing page",
        status: "done",
        stack: ["HTML", "CSS3", "JavaScript"],
        points: ["Landing page for a fictional data analytics company, with a mobile menu, services, case studies and a contact form."],
        repo: GH + "Trabalho-de-usabilidade-e-desenvolvimento",
        shots: [{ src: "/img/datainsights.webp", alt: "Data Insights landing page" }],
      },
      {
        id: "sinergia17",
        name: "Sinergia17",
        tagline: "Game about the UN Sustainable Development Goals",
        status: "done",
        team: true,
        stack: ["React", "Vite", "Material UI", "Node/Express", "SQLite"],
        points: ["Game website plus a REST API that stores each player's name and time and shows the best-times leaderboard."],
        repo: GH + "Sinergia17",
        shots: [{ src: "/img/sinergia.webp", alt: "Sinergia17 leaderboard", caption: "Leaderboard with sample data" }],
      },
      {
        id: "quality",
        name: "Software Quality",
        tagline: "Automated tests and CI",
        status: "done",
        team: true,
        stack: ["Python", "pytest", "GitHub Actions", "Java", "JUnit 5"],
        points: [
          "GitHub Actions CI pipeline that runs the pytest suite on every commit.",
          "JUnit 5 unit tests for a user validator, covering valid, invalid and null inputs.",
        ],
        repo: GH + "Qualidade-De-Software",
      },
    ],
    stackTitle: "Stack",
    stack: [
      { group: "AI & LLMs", items: ["Groq · Llama 3.3", "Gemini", "Vercel AI SDK", "Prompt engineering", "Web research (Serper)", "Guardrails", "Intent classification", "scikit-learn", "NumPy"] },
      { group: "Back end", items: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Supabase", "Redis", "Node/Express", "C# .NET", "Java"] },
      { group: "Front end", items: ["Next.js", "React", "TypeScript", "Tailwind", "Zustand", "TipTap", "Gradio", "HTML/CSS"] },
      { group: "DevOps & quality", items: ["Git/GitHub", "GitHub Actions", "Docker", "Vercel", "pytest", "JUnit 5", "MPS.BR"] },
    ],
    eduTitle: "Education",
    edu: {
      degree: "B.Sc. in Information Systems",
      school: "Centro Universitário de Belo Horizonte (UNIBH)",
      when: "In progress",
      courses: ["Artificial Intelligence", "Software Management and Quality", "Data Analysis and Big Data", "Distributed and Mobile Systems", "Usability and Web Development"],
    },
    langTitle: "Languages",
    langs: [
      { name: "Portuguese", level: 4, label: "native" },
      { name: "English", level: 2, label: "intermediate" },
      { name: "Spanish", level: 1, label: "basic" },
    ],
    contactTitle: "Let's talk",
    contactText: "I'm open to Software Engineer roles focused on AI. The fastest way to reach me is email or LinkedIn.",
    footer: "Built with Next.js and Tailwind, deployed on Vercel.",
  },
};

export const links = {
  email: "arthurcassio@ymail.com",
  github: "https://github.com/arthuroliveira10",
  linkedin: "https://www.linkedin.com/in/arthur-oliveira-168488287/",
  cv: "/Curriculo_Arthur_Oliveira.pdf",
};
