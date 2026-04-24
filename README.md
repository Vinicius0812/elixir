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

### Configuração da API

O projeto já pode usar um arquivo `.env` na raiz:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

Se estiver testando no celular com Expo Go, troque `localhost` pelo IP local da sua máquina.

Depois reinicie o Expo com cache limpo:

```bash
npx expo start -c
```

Se a variável não for definida, o login e o cadastro ficam indisponíveis, mas o catálogo continua funcionando com fallback local.

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
|   |-- contexts/         # Estado global de autenticação
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
5. Login, cadastro e restauração de sessão com armazenamento seguro
