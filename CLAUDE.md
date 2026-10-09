# CLAUDE.md

Biblioteca de filmes em React + TypeScript + Vite, com dados do TMDB servidos através de uma API própria (proxy). Publicada no GitHub Pages em `/movies-lib/`.

## Comandos

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção para `dist/`
- `npm run lint` — ESLint (atenção: só abrange `.js`/`.jsx`, não os ficheiros `.ts`/`.tsx`)
- `npm run preview` — pré-visualizar o build

Não há testes. O deploy é automático via GitHub Actions em cada push para `main` ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

## Configuração

Copiar `.env.example` para `.env` (desenvolvimento local):
- `VITE_API_ENDPOINT` — URL da API backend (não chama o TMDB diretamente)
- `VITE_API_TIMEOUT` — timeout do axios em ms

Em produção, o build usa o [.env.production](.env.production), que está versionado. O URL não é secreto porque fica no JS público. Não definir estas variáveis no workflow: as variáveis de ambiente do processo têm prioridade sobre os ficheiros `.env*`.

## Backoffice

A API está em `../studio-base-api` (Express + TypeScript), no módulo `src/modules/tmdb/`: um proxy só de leitura, com cache, para o TMDB.
- Este frontend usa a v2 (`/tmdb/v2`): os campos das respostas vêm em camelCase. Os valores enviados ao TMDB nos pedidos (`sort_by`, `append_to_response`) continuam em snake_case. A v1 (`/tmdb`) está deprecated.
- Os mappers em `src/modules/tmdb/mappers/` definem a forma das respostas. Se um campo mudar ou faltar, verificar lá antes de alterar os tipos em `src/types/`.

## Arquitetura

Fluxo de dados: `pages` → `hooks` (React Query) → `services` (axios) → API.

- `src/services/` — funções que chamam a API usando a instância axios de `api.ts`
- `src/hooks/` — um hook `useQuery` por recurso (ex.: `useMovie`), envolvendo os services
- `src/pages/<Nome>/` — páginas, cada uma com o seu `.tsx`, `.css` e por vezes um `Skeleton`
- `src/components/` — componentes reutilizáveis
- `src/types/` — tipos TypeScript das respostas da API
- `src/config/` — `env.ts` (variáveis validadas) e opções do Splide
- Rotas definidas em [src/main.tsx](src/main.tsx) com `basename="/movies-lib/"`

UI com Bootstrap 5 + Bootstrap Icons; carrosséis com Splide.

## Convenções

- Usar os aliases de import definidos em [vite.config.ts](vite.config.ts): `@components`, `@pages`, `@hooks`, `@services`, `@typesLocal` (tipos), `@config`, `@utils`, `@assets`, `@styles`, `@contexts`
- Indentação de 4 espaços, aspas duplas
- Novos endpoints: criar a função em `services/`, o hook em `hooks/` e os tipos em `types/`
- Tarefas pendentes em [TODO.md](TODO.md)
