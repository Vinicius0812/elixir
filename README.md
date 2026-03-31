<div align="center">
	<h1>🍸 Elixir</h1>
	<strong>Biblioteca Digital de Coquetelaria</strong>
</div>

---

## 🚀 Como Rodar o Aplicativo

Para testar o Elixir no seu celular ou simulador, siga estas etapas:

### Pré-requisitos
- Node.js instalado
- App <b>Expo Go</b> no seu celular (Android/iOS)

### Instalação de Dependências

```bash
npm install
```

### Iniciar o Servidor

```bash
npx expo start
```

### Conexão
1. Abra o Expo Go no celular
2. Escaneie o QR Code que aparecerá no terminal
3. Certifique-se de que o computador e o celular estão no mesmo Wi-Fi

---

## 📝 Resumo do Projeto
O Elixir é uma biblioteca digital de coquetelaria desenvolvida em <b>React Native</b>. O app permite explorar receitas de drinks famosos, visualizar ingredientes e instruções de preparo em uma interface moderna e fluida.

---

## 🛠️ Pilha Tecnológica
- <b>Base:</b> React Native (Expo)
- <b>Linguagem:</b> JavaScript (ES6+)
- <b>Navegação:</b> React Navigation Stack
- <b>Estilização:</b> StyleSheet (Nativo)

---

## 📂 Estrutura de Arquivos
O projeto segue um padrão modular para facilitar a manutenção:
```
elixir/
├── App.js                # Configuração de rotas e navegação
├── src/
│   ├── assets/           # Imagens e ícones estáticos
│   ├── components/       # Componentes reutilizáveis (Ex: DrinkCard)
│   ├── data/             # Banco de dados local (drinkData.js)
│   └── screens/          # Telas (HomeScreen e DrinkDetailScreen)
```

---

## 🔍 Funcionalidades Implementadas

1. **Navegação Dinâmica**
	- Pilha de navegação (Stack Navigator)
	- Transição entre lista e detalhes com cabeçalho inteligente

2. **Catálogo de Drinks (Mock Data)**
	- Dados centralizados em `src/data/drinkData.js`
	- Cada drink possui:
	  - Nome e ID
	  - URL da imagem (busca real)
	  - Lista de ingredientes
	  - Instruções passo a passo

3. **UI/UX Customizada**
	- Cards com elevação (sombra), bordas arredondadas e feedback visual
	- Lista otimizada com FlatList para alta performance


---

## 🗺️ Roadmap de Desenvolvimento

- [ ] Pesquisa em Tempo Real: Barra de busca para filtrar drinks por nome
- [ ] Filtro por Categorias: Separar por tipo de base (Gin, Vodka, Rum)
- [ ] Favoritos: Salvar receitas localmente no dispositivo
- [ ] Modo Noturno: Suporte a temas claros e escuros

---

<div align="center">
	Feito com ❤️ por Vinícius Araujo, Gepeto e Gemini
</div>