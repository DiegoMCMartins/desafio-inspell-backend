# Projeto Backend Desafio Inspell

## Link para testes em produção
[desafio-inspell-backend-production.up.railway.app/api](desafio-inspell-backend-production.up.railway.app/api)

## Requisitos
- Não é necessário utilizar um banco de dados. Os dados podem ser armazenados em memória no backend.
- Desenvolver uma API Restful em NestJS

### Endpoints

#### /api/periodos
- Método: POST
- Descrição: Recebe um novo período de trabalho.
- Corpo da Requisição: Um objeto JSON contendo dataInicial e dataFinal.
```json
{
  "dataInicial": "YYYY-MM-DDTHH:mm:ss",
  "dataFinal": "YYYY-MM-DDTHH:mm:ss"
}
```
- Comportamento:
  - Deve calcular a duração do período em segundos.
  - Deve somar a duração calculada ao total acumulado.
  - Deve retornar um objeto JSON com o novo total acumulado (em segundos).
- Tratamento de Erros: Se a dataFinal for anterior à dataInicial, a API deve retornar um erro (código HTTP 400 Bad Request) com uma mensagem clara.

#### /api/periodos
- Método: GET
- Descrição: Retornar os períodos cadastrados até o momento.
- Comportamento:
  - Deve retornar um objeto JSON com o períodos armazenados.
```json
[
  //...
  {
    "dataInicial": "YYYY-MM-DDTHH:mm:ss",
    "dataFinal": "YYYY-MM-DDTHH:mm:ss"
  },
  {
    "dataInicial": "YYYY-MM-DDTHH:mm:ss",
    "dataFinal": "YYYY-MM-DDTHH:mm:ss"
  }
  //...
]
```

#### /api/total
- Método: GET
- Descrição: Retorna o total de tempo trabalhado acumulado.
- Comportamento:
  - Deve retornar um objeto JSON contendo o tempo total em segundos.
  - Opcional: O candidato pode retornar a duração formatada em horas, minutos e segundos, demonstrando habilidade de manipulação de datas.

#### /api/periodos
- Método: DELETE
- Descrição: Reseta o total de tempo acumulado e limpa todos os períodos armazenados.
- Comportamento:
  - Deve redefinir o total para zero.
  - Deve retornar uma resposta de sucesso sem corpo.

## Como iniciar
1. Clone o projeto
```bash
git clone https://github.com/DiegoMCMartins/desafio-inspell-backend.git
```
2. Instale as dependências rodando
```bash
#npm (preferência)
npm i

#yarn
yarn
```
3. Execute o projeto
```bash
#npm (preferência)
npm run start:dev

#yarn
yarn start:dev
```
4. Acesse o projeto em [`http://localhost:3333/api`](`http://localhost:3333/api`)
