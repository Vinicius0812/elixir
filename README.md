<div align="center">
	<h1>Elixir</h1>
	<strong>Biblioteca Digital de Coquetelaria</strong>
</div>

---

## Como rodar o aplicativo

Para testar o Elixir no celular, no emulador ou no navegador:

### Pré-requisitos

- Node.js instalado
- Expo Go no celular, se quiser testar em dispositivo físico
- `elixir-api` rodando localmente, se quiser consumir dados reais

### Instalação de dependências

```bash
npm install
```

### Configuração opcional da API

Defina a URL base da API antes de iniciar o Expo:

```bash
set EXPO_PUBLIC_API_URL=http://SEU-IP-LOCAL:3000
```

Se a variável não for definida, o app usa automaticamente o catálogo local em `src/data/drinkData.js`.

### Iniciar o projeto

```bash
npx expo start
```

### Conexão

1. Abra o Expo Go no celular ou escolha Web/Android/iOS no terminal.
2. Escaneie o QR Code gerado pelo Expo.
3. Mantenha celular e computador na mesma rede se estiver usando a API local.

---

## Resumo do projeto

O Elixir é um aplicativo React Native com foco em navegação de catálogo de drinks. A tela inicial tenta carregar o catálogo pela API e, se ela não estiver disponível, cai automaticamente para os dados mockados para manter a experiência utilizável.

---

## Pilha tecnológica

- React Native com Expo
- React Navigation
- JavaScript
- API própria com fallback para mock local

---

## Estrutura de arquivos

```text
elixir/
|-- App.js
|-- src/
|   |-- assets/           # Imagens e ícones estáticos
|   |-- components/       # Componentes reutilizáveis
|   |-- data/             # Fallback local do catálogo
|   |-- screens/          # Telas principais
|   |-- services/         # Integração com a API
|   `-- theme/            # Paleta e tokens visuais
```

---

## Funcionalidades atuais

1. Navegação entre catálogo e detalhes do drink
2. Busca em tempo real por nome
3. Consumo da API quando `EXPO_PUBLIC_API_URL` está configurada
4. Fallback automático para mock local quando a API falha, não existe ou está sem drinks publicados
5. Indicação visual da origem dos dados na home
