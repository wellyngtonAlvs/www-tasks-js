# 📋 Gerenciador de Tarefas

Uma aplicação web moderna e responsiva para gerenciar suas tarefas diárias por categorias de forma simples e eficiente.

![Gerenciador de Tarefas](https://img.shields.io/badge/Status-Concluído-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![CSS](https://img.shields.io/badge/CSS3-Modern-blue)
![HTML](https://img.shields.io/badge/HTML5-Semântico-orange)

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
- ✅ **Estado vazio** com mensagem amigável
- ✅ **Limpar tarefas** com confirmação modal
- ✅ **Validação de entrada** com limites de caracteres
- ✅ **Animações suaves** e transições
- ✅ **Modais interativos** para todas as ações
- ✅ **Sistema de ordenação** completo
- ✅ **Design compacto** e otimizado

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

### Gerenciamento de Categorias

- **Criar categoria**: Clique em "Nova Categoria", digite o nome e escolha uma cor
- **Editar categoria**: Clique no ícone de edição (✏️) na categoria
- **Excluir categoria**: Clique no ícone de lixeira (🗑️) na categoria
- **Categorias padrão**: O sistema vem com 3 categorias pré-definidas (Trabalho, Pessoal, Estudos)

### Editar Categoria de Tarefas

- **Acessar**: Clique no ícone 🏷️ ao lado de qualquer tarefa
- **Selecionar**: Escolha a nova categoria no modal que aparece
- **Visualizar**: Veja o texto da tarefa no modal para confirmação
- **Salvar**: Clique em "Salvar" para aplicar a mudança
- **Feedback**: Receba notificação da alteração realizada

### Modais Interativos

- **Editar tarefa**: Modal para alterar o texto da tarefa
- **Editar categoria**: Modal para alterar a categoria da tarefa
- **Confirmações**: Modais para confirmar exclusões e limpezas
- **Gerenciar categorias**: Modal para criar e editar categorias
- **Fechamento intuitivo**: Clique fora ou no X para fechar

### Design Compacto

- **Elementos reduzidos**: Botões, inputs e componentes menores
- **Layout otimizado**: Melhor aproveitamento do espaço
- **Responsividade**: Adaptação perfeita para todos os dispositivos
- **Animações suaves**: Transições elegantes e fluidas

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

## 🎨 Design

- **Paleta de cores**: Gradientes modernos em tons de azul e roxo
- **Categorias coloridas**: Cada categoria tem sua própria cor personalizada
- **Tipografia**: Fonte Inter para melhor legibilidade
- **Animações**: Transições suaves e feedback visual
- **Estados**: Hover, focus e estados ativos bem definidos
- **Acessibilidade**: Contraste adequado e navegação por teclado

## 📊 Estrutura do projeto

```
www-tasks-js/
├── index.html          # Estrutura HTML principal
├── style.css           # Estilos CSS modernos
├── funcoes.js          # Lógica JavaScript
├── README.md           # Documentação do projeto
├── LICENSE             # Licença MIT
└── .gitignore          # Configuração Git
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

### Performance
- Renderização eficiente com DOM manipulation
- Filtros otimizados
- Animações otimizadas com CSS transforms

## 🚀 Melhorias implementadas

### Comparado à versão original:
- ✅ **Interface moderna** com design atualizado
- ✅ **Sistema completo de categorização** com cores personalizadas
- ✅ **Filtros avançados** por categoria e status
- ✅ **Gerenciamento de categorias** (CRUD completo)
- ✅ **Edição de categoria de tarefas** com modal interativo
- ✅ **Modal interativo** para criar/editar categorias
- ✅ **Funcionalidade de edição** de tarefas
- ✅ **Sistema de estatísticas** em tempo real
- ✅ **Notificações toast** para feedback
- ✅ **Estado vazio** com mensagem amigável
- ✅ **Responsividade completa** para mobile
- ✅ **Código refatorado** com classes ES6
- ✅ **Validação melhorada** de entrada
- ✅ **Correção de bugs** na lógica de exclusão
- ✅ **Melhor UX** com animações e transições

## 🔮 Próximas funcionalidades

- [ ] Busca de tarefas
- [ ] Exportação de dados
- [ ] Temas claro/escuro
- [ ] Sincronização com backend
- [ ] Notificações push
- [ ] Lembretes com data/hora
- [ ] Prioridades de tarefas
- [ ] Subtarefas
- [ ] Tags adicionais
- [ ] Relatórios e gráficos

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para ajudar na organização pessoal e produtividade.

---

**⭐ Se este projeto te ajudou, considere dar uma estrela!** 