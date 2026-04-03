export type ParsedResult = {
  id: string;
  description: string;
  amount: number;
  category: string;
  reason: string;
};

const KEYWORD_MAP: Record<string, string> = {
  // Infra
  'AWS': 'Infra',
  'Amazon': 'Infra',
  'Azure': 'Infra',
  'GCP': 'Infra',
  'Google Cloud': 'Infra',
  'DigitalOcean': 'Infra',
  'Cloudflare': 'Infra',
  'Oracle': 'Infra',
  'Vercel': 'Infra',
  'Netlify': 'Infra',
  'Heroku': 'Infra',
  'Infraestrutura': 'Infra',
  'Starten Host': 'Infra',
  // Database
  'MongoDB': 'Database',
  'Atlas': 'Database',
  'PostgreSQL': 'Database',
  'Redis': 'Database',
  'Supabase': 'Database',
  'PlanetScale': 'Database',
  'MySQL': 'Database',
  'Firebase': 'Database',
  // AI
  'OpenAI': 'AI',
  'Anthropic': 'AI',
  'HuggingFace': 'AI',
  'Midjourney': 'AI',
  'Perplexity': 'AI',
  'Gemini': 'AI',
  // DevOps
  'GitHub': 'DevOps',
  'GitLab': 'DevOps',
  'CircleCI': 'DevOps',
  'Bitbucket': 'DevOps',
  'New Relic': 'DevOps',
  'Datadog': 'DevOps',
  // SaaS
  'Slack': 'SaaS',
  'Jira': 'SaaS',
  'Zoom': 'SaaS',
  'Trello': 'SaaS',
  'Notion': 'SaaS',
};

export const parseInvoiceText = (text: string): ParsedResult[] => {
  if (!text || text.trim() === '') return [];

  const results: ParsedResult[] = [];
  // Procura por R$ seguido de número OU apenas números com vírgula/ponto duplo no final (ex: 540,00)
  const regex = /(?:R\$\s*)?(\d+(?:[.,]\d+)*)/gi;
  let match;
  let lastSearchIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    const rawMatch = match[0];
    let numberStr = match[1];

    if (!rawMatch.toLowerCase().includes('r$')) {
      // Se não tiver 'R$', consideramos despesa APENAS se terminar em ',XX' ou '.XX'
      if (!/^[.,]\d{2}$/.test(numberStr.slice(-3))) {
        continue;
      }
    }

    // Normalizar valor numérico flutuante
    if (numberStr.includes(',') && numberStr.includes('.')) {
      const lastComma = numberStr.lastIndexOf(',');
      const lastDot = numberStr.lastIndexOf('.');
      if (lastComma > lastDot) {
        numberStr = numberStr.replace(/\./g, '').replace(',', '.');
      } else {
        numberStr = numberStr.replace(/,/g, '');
      }
    } else if (numberStr.includes(',')) {
      numberStr = numberStr.replace(',', '.');
    }

    const amount = parseFloat(numberStr);

    if (amount > 0 && !isNaN(amount)) {
      // Associação por Proximidade: extrair string do texto anterior à despesa
      const blockText = text.substring(lastSearchIndex, match.index);

      let category = 'Outros';
      let reason = 'Nenhuma palavra-chave reconhecida -> Categoria Outros';
      let foundKeyword = '';

      for (const [keyword, cat] of Object.entries(KEYWORD_MAP)) {
        if (blockText.toLowerCase().includes(keyword.toLowerCase())) {
          category = cat;
          reason = `Encontrado '${keyword}' próximo ao valor -> Categoria ${cat}`;
          foundKeyword = keyword;
          break;
        }
      }

      results.push({
        id: Math.random().toString(36).substring(2, 9),
        description: foundKeyword ? foundKeyword : `Custo avulso (R$ ${amount.toFixed(2)})`,
        amount,
        category,
        reason
      });

      lastSearchIndex = match.index + rawMatch.length;
    }
  }

  return results;
};
