# 📋 Gerenciador de Tarefas

Um aplicativo web simples e eficiente para gerenciar suas tarefas diárias, organizadas por categorias.

## ✨ Funcionalidades

### 📝 Gerenciamento de Tarefas
- ✅ Adicionar, editar e excluir tarefas
- ✅ Marcar tarefas como concluídas
- ✅ Organizar tarefas por categorias
- ✅ Filtros por categoria e status
- ✅ Ordenação por data, alfabética e status
- ✅ Estatísticas em tempo real

### 🏷️ Sistema de Categorias
- ✅ Criar e editar categorias personalizadas
- ✅ Cores personalizadas para cada categoria
- ✅ Associar tarefas a categorias
- ✅ Editar categoria de tarefas existentes

### 💾 Backup e Restauração
- ✅ **Exportar Backup**: Salvar todos os dados em arquivo JSON
- ✅ **Importar Backup**: Restaurar dados de arquivo JSON
- ✅ **Backup Automático**: Criação automática de backups diários
- ✅ **Restaurar Auto-Backup**: Recuperar último backup automático
- ✅ **Modo Mesclagem**: Importar dados sem substituir existentes
- ✅ **Validação de Dados**: Verificação de integridade dos backups
- ✅ **Preview de Backup**: Visualizar conteúdo antes de importar

## 🚀 Como Usar

### Backup Manual
1. Clique no botão **"Exportar Backup"** para baixar um arquivo JSON
2. O arquivo será salvo com timestamp no nome: `backup-tarefas-YYYY-MM-DD-HH-MM-SS.json`

### Restauração Manual
1. Clique no botão **"Importar Backup"**
2. Selecione um arquivo JSON de backup
3. Escolha se deseja mesclar ou substituir dados existentes
4. Confirme a importação

### Backup Automático
- O sistema cria backups automáticos a cada 24 horas
- Backups automáticos são salvos no localStorage do navegador
- Os últimos 7 backups automáticos são mantidos
- Use **"Restaurar Auto-Backup"** para recuperar o mais recente

## 📁 Estrutura do Backup

O arquivo de backup contém:
```json
{
  "version": "1.0",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "tasks": [...],
  "categories": [...],
  "metadata": {
    "totalTasks": 10,
    "completedTasks": 5,
    "totalCategories": 3,
    "createdWith": "Gerenciador de Tarefas"
  }
}
```

## 🛡️ Segurança e Validação

- **Validação de Estrutura**: Verifica se o arquivo tem formato correto
- **Validação de Dados**: Confirma integridade de tarefas e categorias
- **Avisos**: Alerta sobre possíveis problemas nos dados
- **Modo Seguro**: Permite mesclar dados sem perder informações existentes

## 🎨 Interface

- Design responsivo e moderno
- Animações suaves
- Notificações toast para feedback
- Modais de confirmação para ações importantes
- Preview de backup antes da importação

## 💻 Tecnologias

- HTML5
- CSS3 (com Flexbox e Grid)
- JavaScript (ES6+)
- LocalStorage para persistência
- File API para importação/exportação

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona bem em:
- Desktop
- Tablet
- Smartphone

## 🔧 Instalação

1. Clone ou baixe os arquivos
2. Abra `index.html` em um navegador moderno
3. Ou use um servidor local:
   ```bash
   python3 -m http.server 8000
   # ou
   npx serve .
   ```

## 📊 Armazenamento

- **LocalStorage**: Dados salvos no navegador do usuário
- **Backup Automático**: Mantém últimos 7 backups diários
- **Exportação**: Arquivos JSON para backup externo
- **Importação**: Restauração de dados de arquivos JSON

## 🚨 Limitações

- Dados salvos apenas no navegador local
- Não há sincronização entre dispositivos
- Backup automático limitado a 7 dias
- Tamanho máximo de tarefa: 100 caracteres
- Tamanho máximo de categoria: 30 caracteres

## 🔄 Atualizações Futuras

- [ ] Sincronização em nuvem
- [ ] Compartilhamento de tarefas
- [ ] Lembretes e notificações
- [ ] Temas personalizáveis
- [ ] Exportação em outros formatos (CSV, PDF)
- [ ] Backup em nuvem automático

---

Desenvolvido com ❤️ para organização pessoal e produtividade. 