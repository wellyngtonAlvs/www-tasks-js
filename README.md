# 📋 Gerenciador de Tarefas

Uma aplicação web moderna e responsiva para gerenciar suas tarefas diárias por categorias de forma simples e eficiente.

## ✨ Funcionalidades

- ✅ **Adicionar tarefas** com timestamp automático
- ✅ **Categorização completa** com cores personalizadas
- ✅ **Gerenciamento de categorias** (criar, editar, excluir)
- ✅ **Editar categoria de tarefas** existentes
- ✅ **Editar tarefas** com modal interativo
- ✅ **Filtros avançados** por categoria e status
- ✅ **Marcar como concluída** com checkbox interativo
- ✅ **Excluir tarefas** com confirmação modal
- ✅ **Estatísticas em tempo real** (total, concluídas, pendentes, categorias)
- ✅ **Persistência local** usando localStorage
- ✅ **Interface responsiva** para desktop e mobile
- ✅ **Notificações toast** para feedback do usuário

## 🚀 Como usar

### Instalação

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` em seu navegador
3. Comece a organizar suas tarefas por categorias!

### Uso básico

1. **Gerenciar categorias**: Clique em "Nova Categoria" para criar categorias personalizadas
2. **Adicionar tarefa**: Digite no campo de texto, selecione uma categoria e pressione Enter
3. **Editar categoria de tarefa**: Clique no ícone 🏷️ ao lado da tarefa
4. **Editar tarefa**: Clique no botão "Editar" da tarefa desejada
5. **Filtrar tarefas**: Use os filtros por categoria e status para encontrar tarefas específicas
6. **Marcar como concluída**: Clique no checkbox ao lado da tarefa
7. **Excluir tarefa**: Clique no botão "Excluir" e confirme no modal
8. **Limpar tarefas**: Use os botões "Limpar Concluídas" ou "Limpar Todas" com confirmação

## 🛠️ Tecnologias utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno com Flexbox, Grid e animações
- **JavaScript ES6+**: Programação orientada a objetos e funcionalidades avançadas
- **LocalStorage**: Persistência de dados no navegador
- **Google Fonts**: Tipografia Inter para melhor legibilidade

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:

- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1200px+)

## 📊 Estrutura do projeto

```
www-tasks-js/
├── index.html          # Estrutura HTML principal
├── style.css           # Estilos CSS modernos
├── funcoes.js          # Lógica JavaScript
├── README.md           # Documentação do projeto
└── LICENSE             # Licença MIT
```

## 🔧 Funcionalidades técnicas

### Gerenciamento de estado
- Classe `TaskManager` para organização do código
- Estrutura de dados consistente para tarefas e categorias
- Persistência automática no localStorage
- Sistema de filtros em tempo real

### Categorização
- Categorias com cores personalizadas
- Validação de nomes únicos
- Integração completa com tarefas
- Gerenciamento seguro (confirmação ao excluir categorias em uso)

### Validação e segurança
- Validação de entrada com limite de 100 caracteres para tarefas
- Limite de 30 caracteres para nomes de categorias
- Escape de HTML para prevenir XSS
- Confirmações para ações destrutivas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**⭐ Se este projeto te ajudou, considere dar uma estrela!** 