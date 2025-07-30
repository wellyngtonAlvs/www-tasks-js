// Elementos do DOM
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const clearCompletedButton = document.getElementById('clearCompleted');
const clearAllButton = document.getElementById('clearAll');
const emptyState = document.getElementById('emptyState');
const toast = document.getElementById('toast');

// Elementos da notificação de armazenamento
const storageNotice = document.getElementById('storageNotice');
const closeStorageNotice = document.getElementById('closeStorageNotice');

// Elementos de categorias
const categorySelect = document.getElementById('categorySelect');
const categoriesList = document.getElementById('categoriesList');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const categoriesCountElement = document.getElementById('categoriesCount');

// Elementos de filtros
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const sortFilter = document.getElementById('sortFilter');

// Elementos do modal
const categoryModal = document.getElementById('categoryModal');
const modalTitle = document.getElementById('modalTitle');
const categoryName = document.getElementById('categoryName');
const categoryColor = document.getElementById('categoryColor');
const colorPreview = document.getElementById('colorPreview');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const modalSave = document.getElementById('modalSave');

// Elementos do modal de editar categoria de tarefa
const editTaskCategoryModal = document.getElementById('editTaskCategoryModal');
const editTaskCategorySelect = document.getElementById('editTaskCategorySelect');
const editTaskText = document.getElementById('editTaskText');
const editTaskCategoryModalClose = document.getElementById('editTaskCategoryModalClose');
const editTaskCategoryModalCancel = document.getElementById('editTaskCategoryModalCancel');
const editTaskCategoryModalSave = document.getElementById('editTaskCategoryModalSave');

// Elementos do modal de editar tarefa
const editTaskModal = document.getElementById('editTaskModal');
const editTaskTextInput = document.getElementById('editTaskTextInput');
const editTaskModalClose = document.getElementById('editTaskModalClose');
const editTaskModalCancel = document.getElementById('editTaskModalCancel');
const editTaskModalSave = document.getElementById('editTaskModalSave');

// Elementos do modal de confirmação
const confirmationModal = document.getElementById('confirmationModal');
const confirmationTitle = document.getElementById('confirmationTitle');
const confirmationMessage = document.getElementById('confirmationMessage');
const confirmationModalClose = document.getElementById('confirmationModalClose');
const confirmationModalCancel = document.getElementById('confirmationModalCancel');
const confirmationModalConfirm = document.getElementById('confirmationModalConfirm');

// Elementos de backup e restauração
const exportBackupBtn = document.getElementById('exportBackupBtn');
const importBackupBtn = document.getElementById('importBackupBtn');
const restoreAutoBackupBtn = document.getElementById('restoreAutoBackupBtn');
const backupFileInput = document.getElementById('backupFileInput');

// Elementos do modal de importação
const importBackupModal = document.getElementById('importBackupModal');
const importBackupModalClose = document.getElementById('importBackupModalClose');
const importBackupModalCancel = document.getElementById('importBackupModalCancel');
const importBackupModalConfirm = document.getElementById('importBackupModalConfirm');
const backupFileInputModal = document.getElementById('backupFileInputModal');
const mergeBackupCheckbox = document.getElementById('mergeBackupCheckbox');
const backupPreview = document.getElementById('backupPreview');
const backupPreviewContent = document.getElementById('backupPreviewContent');

// Elementos de estatísticas
const totalTasksElement = document.getElementById('totalTasks');
const completedTasksElement = document.getElementById('completedTasks');
const pendingTasksElement = document.getElementById('pendingTasks');
const taskCountElement = document.getElementById('taskCount');

// Estrutura de dados
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [
  {
    id: 1,
    name: 'Trabalho',
    color: '#667eea'
  },
  {
    id: 2,
    name: 'Pessoal',
    color: '#28a745'
  },
  {
    id: 3,
    name: 'Estudos',
    color: '#ffc107'
  }
];

// Filtros ativos
let activeFilters = {
  category: '',
  status: '',
  sort: 'newest'
};

// Estado do modal
let modalState = {
  isEditing: false,
  editingCategoryId: null
};

// Estado do modal de editar categoria de tarefa
let editTaskCategoryState = {
  taskId: null,
  currentCategoryId: null
};

// Estado do modal de editar tarefa
let editTaskState = {
  taskId: null,
  originalText: null
};

// Estado do modal de confirmação
let confirmationState = {
  action: null,
  data: null
};

// Classe para gerenciar tarefas
class TaskManager {
  constructor() {
    this.tasks = tasks;
    this.categories = categories;
    this.init();
  }

  init() {
    // Normalizar IDs de categoria nas tarefas existentes
    this.normalizeTaskCategories();
    
    this.renderTasks();
    this.renderCategories();
    this.updateStats();
    this.setupEventListeners();
    this.saveCategoriesToStorage();
    this.setupStorageNotice();
    
    // Configurar backup automático
    this.setupAutoBackup();
  }

  setupEventListeners() {
    // Adicionar tarefa
    addButton.addEventListener('click', () => this.addTask());
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTask();
    });

    // Limpar tarefas
    clearCompletedButton.addEventListener('click', () => this.clearCompleted());
    clearAllButton.addEventListener('click', () => this.clearAll());

    // Categorias
    addCategoryBtn.addEventListener('click', () => this.openCategoryModal());

    // Filtros
    categoryFilter.addEventListener('change', (e) => {
      activeFilters.category = e.target.value;
      this.renderTasks();
    });

    statusFilter.addEventListener('change', (e) => {
      activeFilters.status = e.target.value;
      this.renderTasks();
    });

    sortFilter.addEventListener('change', (e) => {
      activeFilters.sort = e.target.value;
      this.renderTasks();
    });

    // Modal
    modalClose.addEventListener('click', () => this.closeCategoryModal());
    modalCancel.addEventListener('click', () => this.closeCategoryModal());
    modalSave.addEventListener('click', () => this.saveCategory());
    categoryColor.addEventListener('input', (e) => {
      colorPreview.style.backgroundColor = e.target.value;
    });

    // Modal de editar categoria de tarefa
    editTaskCategoryModalClose.addEventListener('click', () => this.closeEditTaskCategoryModal());
    editTaskCategoryModalCancel.addEventListener('click', () => this.closeEditTaskCategoryModal());
    editTaskCategoryModalSave.addEventListener('click', () => this.saveTaskCategory());

    // Modal de editar tarefa
    editTaskModalClose.addEventListener('click', () => this.closeEditTaskModal());
    editTaskModalCancel.addEventListener('click', () => this.closeEditTaskModal());
    editTaskModalSave.addEventListener('click', () => this.saveTaskEdit());

    // Modal de confirmação
    confirmationModalClose.addEventListener('click', () => this.closeConfirmationModal());
    confirmationModalCancel.addEventListener('click', () => this.closeConfirmationModal());
    confirmationModalConfirm.addEventListener('click', () => this.executeConfirmedAction());

    // Foco no input ao carregar
    taskInput.focus();
    
    // Event listener para fechar a notificação de armazenamento
    closeStorageNotice.addEventListener('click', () => this.closeStorageNotice());

    // Event listeners para backup e restauração
    exportBackupBtn.addEventListener('click', () => this.exportBackup());
    importBackupBtn.addEventListener('click', () => this.openImportModal());
    restoreAutoBackupBtn.addEventListener('click', () => this.restoreLastAutoBackup());
    
    // Event listeners do modal de importação
    importBackupModalClose.addEventListener('click', () => this.closeImportModal());
    importBackupModalCancel.addEventListener('click', () => this.closeImportModal());
    importBackupModalConfirm.addEventListener('click', () => this.confirmImport());
    backupFileInputModal.addEventListener('change', (e) => this.handleFileSelect(e));
  }

  addTask() {
    const text = taskInput.value.trim();
    const categoryId = categorySelect.value;
    
    if (!text) {
      this.showToast('Por favor, digite uma tarefa!', 'error');
      taskInput.focus();
      return;
    }

    if (text.length > 100) {
      this.showToast('A tarefa deve ter no máximo 100 caracteres!', 'error');
      return;
    }

    const task = {
      id: Date.now(),
      text: text,
      categoryId: categoryId ? parseInt(categoryId) : null,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    this.tasks.unshift(task);
    this.saveToStorage();
    this.renderTasks();
    this.updateStats();
    
    taskInput.value = '';
    categorySelect.value = '';
    taskInput.focus();
    
    this.showToast('Tarefa adicionada com sucesso!', 'success');
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date().toISOString() : null;
      this.saveToStorage();
      this.renderTasks();
      this.updateStats();
      
      const message = task.completed ? 'Tarefa concluída!' : 'Tarefa reaberta!';
      this.showToast(message, 'info');
    }
  }

  editTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    editTaskState.taskId = id;
    editTaskState.originalText = task.text;

    editTaskTextInput.value = task.text;
    editTaskModal.classList.add('show');
    editTaskTextInput.focus();
  }

  deleteTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    confirmationState.action = 'deleteTask';
    confirmationState.data = { taskId: id, taskText: task.text };
    
    confirmationTitle.textContent = 'Excluir Tarefa';
    confirmationMessage.textContent = `Deseja realmente excluir a tarefa "${task.text}"?`;
    
    confirmationModal.classList.add('show');
  }

  clearCompleted() {
    const completedTasks = this.tasks.filter(t => t.completed);
    if (completedTasks.length === 0) {
      this.showToast('Não há tarefas concluídas para limpar!', 'info');
      return;
    }

    confirmationState.action = 'clearCompleted';
    confirmationState.data = { count: completedTasks.length };
    
    confirmationTitle.textContent = 'Limpar Tarefas Concluídas';
    confirmationMessage.textContent = `Deseja limpar ${completedTasks.length} tarefa(s) concluída(s)?`;
    
    confirmationModal.classList.add('show');
  }

  clearAll() {
    if (this.tasks.length === 0) {
      this.showToast('Não há tarefas para limpar!', 'info');
      return;
    }

    confirmationState.action = 'clearAll';
    confirmationState.data = { count: this.tasks.length };
    
    confirmationTitle.textContent = 'Limpar Todas as Tarefas';
    confirmationMessage.textContent = `Deseja limpar todas as ${this.tasks.length} tarefa(s)?`;
    
    confirmationModal.classList.add('show');
  }

  // Métodos de categoria
  openCategoryModal(categoryId = null) {
    modalState.isEditing = !!categoryId;
    modalState.editingCategoryId = categoryId;

    if (categoryId) {
      const category = this.categories.find(c => c.id === categoryId);
      if (category) {
        modalTitle.textContent = 'Editar Categoria';
        categoryName.value = category.name;
        categoryColor.value = category.color;
        colorPreview.style.backgroundColor = category.color;
      }
    } else {
      modalTitle.textContent = 'Nova Categoria';
      categoryName.value = '';
      categoryColor.value = '#667eea';
      colorPreview.style.backgroundColor = '#667eea';
    }

    categoryModal.classList.add('show');
    categoryName.focus();
  }

  closeCategoryModal() {
    categoryModal.classList.remove('show');
    modalState.isEditing = false;
    modalState.editingCategoryId = null;
  }

  saveCategory() {
    const name = categoryName.value.trim();
    const color = categoryColor.value;

    if (!name) {
      this.showToast('Por favor, digite um nome para a categoria!', 'error');
      categoryName.focus();
      return;
    }

    if (name.length > 30) {
      this.showToast('O nome da categoria deve ter no máximo 30 caracteres!', 'error');
      return;
    }

    // Verificar se já existe uma categoria com o mesmo nome
    const existingCategory = this.categories.find(c => 
      c.name.toLowerCase() === name.toLowerCase() && c.id !== modalState.editingCategoryId
    );

    if (existingCategory) {
      this.showToast('Já existe uma categoria com este nome!', 'error');
      return;
    }

    if (modalState.isEditing) {
      // Editar categoria existente
      const category = this.categories.find(c => c.id === modalState.editingCategoryId);
      if (category) {
        category.name = name;
        category.color = color;
        this.showToast('Categoria editada com sucesso!', 'success');
      }
    } else {
      // Adicionar nova categoria
      const newCategory = {
        id: Date.now(),
        name: name,
        color: color
      };
      this.categories.push(newCategory);
      this.showToast('Categoria criada com sucesso!', 'success');
    }

    this.saveCategoriesToStorage();
    this.renderCategories();
    this.updateStats();
    this.closeCategoryModal();
  }

  deleteCategory(categoryId) {
    const category = this.categories.find(c => c.id === categoryId);
    if (!category) return;

    // Verificar se há tarefas usando esta categoria
    const tasksWithCategory = this.tasks.filter(t => t.categoryId === categoryId);
    
    if (tasksWithCategory.length > 0) {
      confirmationState.action = 'deleteCategory';
      confirmationState.data = { 
        categoryId: categoryId, 
        categoryName: category.name, 
        tasksCount: tasksWithCategory.length 
      };
      
      confirmationTitle.textContent = 'Excluir Categoria';
      confirmationMessage.textContent = 
        `A categoria "${category.name}" está sendo usada por ${tasksWithCategory.length} tarefa(s). ` +
        'Deseja remover a categoria e deixar essas tarefas sem categoria?';
      
      confirmationModal.classList.add('show');
    } else {
      // Se não há tarefas usando a categoria, excluir diretamente
      this.executeDeleteCategory(categoryId);
    }
  }

  renderCategories() {
    // Renderizar lista de categorias
    categoriesList.innerHTML = this.categories.map(category => `
      <div class="category-tag" style="background-color: ${category.color}">
        <div class="category-color" style="background-color: ${category.color}"></div>
        <span>${this.escapeHtml(category.name)}</span>
        <div class="category-actions">
          <button class="category-action" onclick="taskManager.openCategoryModal(${category.id})" title="Editar">
            ✏️
          </button>
          <button class="category-action" onclick="taskManager.deleteCategory(${category.id})" title="Excluir">
            🗑️
          </button>
        </div>
      </div>
    `).join('');

    // Atualizar opções dos selects
    const categoryOptions = this.categories.map(category => 
      `<option value="${category.id}">${this.escapeHtml(category.name)}</option>`
    ).join('');

    categorySelect.innerHTML = '<option value="">Sem categoria</option>' + categoryOptions;
    categoryFilter.innerHTML = '<option value="">Todas as categorias</option><option value="none">Sem categoria</option>' + categoryOptions;
    
    // Debug: verificar se as opções foram criadas corretamente
    console.log('Opções de categoria criadas:', categoryOptions);
    console.log('Categorias disponíveis:', this.categories.map(c => ({ id: c.id, name: c.name })));
  }

  renderTasks() {
    // Filtrar tarefas
    let filteredTasks = [...this.tasks]; // Criar cópia para não modificar o array original

    // Filtro por categoria
    if (activeFilters.category && activeFilters.category !== '') {
      if (activeFilters.category === 'none') {
        // Mostrar apenas tarefas sem categoria
        filteredTasks = filteredTasks.filter(task => {
          return task.categoryId === null || task.categoryId === undefined || task.categoryId === '';
        });
      } else {
        // Mostrar tarefas da categoria selecionada
        const selectedCategoryId = parseInt(activeFilters.category);
        
        filteredTasks = filteredTasks.filter(task => {
          // Converter o categoryId da tarefa para número se existir
          const taskCategoryId = task.categoryId ? parseInt(task.categoryId) : null;
          return taskCategoryId === selectedCategoryId;
        });
      }
    }

    // Filtro por status
    if (activeFilters.status) {
      if (activeFilters.status === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.completed);
      } else if (activeFilters.status === 'pending') {
        filteredTasks = filteredTasks.filter(task => !task.completed);
      }
    }

    // Ordenação
    if (activeFilters.sort === 'newest') {
      filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (activeFilters.sort === 'oldest') {
      filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (activeFilters.sort === 'alphabetical') {
      filteredTasks.sort((a, b) => a.text.localeCompare(b.text, 'pt-BR'));
    } else if (activeFilters.sort === 'completed') {
      filteredTasks.sort((a, b) => {
        if (a.completed === b.completed) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return a.completed ? -1 : 1;
      });
    } else if (activeFilters.sort === 'pending') {
      filteredTasks.sort((a, b) => {
        if (a.completed === b.completed) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return a.completed ? 1 : -1;
      });
    }

    // Atualizar contador de tarefas filtradas
    taskCountElement.textContent = `${filteredTasks.length} tarefa${filteredTasks.length !== 1 ? 's' : ''}`;

    if (filteredTasks.length === 0) {
      taskList.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';
    
    taskList.innerHTML = filteredTasks.map(task => {
      const category = task.categoryId ? this.categories.find(c => c.id === task.categoryId) : null;
      
      return `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
          <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? 'checked' : ''}
            onchange="taskManager.toggleTask(${task.id})"
          >
          <div class="task-content">
            <span class="task-text">${this.escapeHtml(task.text)}</span>
            <div class="task-meta">
              <span class="task-time">
                Criada: ${this.formatDate(task.createdAt)}
                ${task.completedAt ? ` | Concluída: ${this.formatDate(task.completedAt)}` : ''}
              </span>
              ${category ? `
                <span class="task-category" style="background-color: ${category.color}">
                  ${this.escapeHtml(category.name)}
                </span>
              ` : ''}
            </div>
          </div>
          <div class="task-actions">
            <button class="btn-task btn-category" onclick="taskManager.editTaskCategory(${task.id})" title="Editar categoria">
              🏷️
            </button>
            <button class="btn-task btn-edit" onclick="taskManager.editTask(${task.id})">
              Editar
            </button>
            <button class="btn-task btn-delete" onclick="taskManager.deleteTask(${task.id})">
              Excluir
            </button>
          </div>
        </li>
      `;
    }).join('');
  }

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const categoriesCount = this.categories.length;

    totalTasksElement.textContent = total;
    completedTasksElement.textContent = completed;
    pendingTasksElement.textContent = pending;
    categoriesCountElement.textContent = categoriesCount;

    // Atualizar visibilidade dos botões
    clearCompletedButton.style.display = completed > 0 ? 'inline-flex' : 'none';
    clearAllButton.style.display = total > 0 ? 'inline-flex' : 'none';
  }

  saveToStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  saveCategoriesToStorage() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  normalizeTaskCategories() {
    // Normalizar IDs de categoria nas tarefas existentes
    let hasChanges = false;
    
    this.tasks.forEach(task => {
      if (task.categoryId !== null && task.categoryId !== undefined) {
        const originalId = task.categoryId;
        const normalizedId = parseInt(task.categoryId);
        
        if (originalId !== normalizedId) {
          task.categoryId = normalizedId;
          hasChanges = true;
        }
      }
    });
    
    // Se houve mudanças, salvar novamente
    if (hasChanges) {
      this.saveToStorage();
    }
  }

  // Métodos para editar categoria de tarefa
  editTaskCategory(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    editTaskCategoryState.taskId = taskId;
    editTaskCategoryState.currentCategoryId = task.categoryId;

    // Atualizar o texto da tarefa no modal
    editTaskText.textContent = task.text;

    // Atualizar opções do select
    const categoryOptions = this.categories.map(category => 
      `<option value="${category.id}" ${task.categoryId === category.id ? 'selected' : ''}>${this.escapeHtml(category.name)}</option>`
    ).join('');

    editTaskCategorySelect.innerHTML = '<option value="">Sem categoria</option>' + categoryOptions;

    // Abrir modal
    editTaskCategoryModal.classList.add('show');
  }

  closeEditTaskCategoryModal() {
    editTaskCategoryModal.classList.remove('show');
    editTaskCategoryState.taskId = null;
    editTaskCategoryState.currentCategoryId = null;
  }

  saveTaskCategory() {
    const taskId = editTaskCategoryState.taskId;
    const newCategoryId = editTaskCategorySelect.value ? parseInt(editTaskCategorySelect.value) : null;
    
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    const oldCategoryId = task.categoryId;
    task.categoryId = newCategoryId;

    this.saveToStorage();
    this.renderTasks();
    this.closeEditTaskCategoryModal();

    // Mostrar feedback
    if (oldCategoryId !== newCategoryId) {
      const categoryName = newCategoryId ? this.categories.find(c => c.id === newCategoryId)?.name : 'Sem categoria';
      this.showToast(`Categoria alterada para: ${categoryName}`, 'success');
    } else {
      this.showToast('Nenhuma alteração foi feita', 'info');
    }
  }

  // Métodos para editar tarefa
  closeEditTaskModal() {
    editTaskModal.classList.remove('show');
    editTaskState.taskId = null;
    editTaskState.originalText = null;
  }

  saveTaskEdit() {
    const taskId = editTaskState.taskId;
    const newText = editTaskTextInput.value.trim();
    
    if (!newText) {
      this.showToast('Por favor, digite um texto para a tarefa!', 'error');
      editTaskTextInput.focus();
      return;
    }

    if (newText.length > 100) {
      this.showToast('A tarefa deve ter no máximo 100 caracteres!', 'error');
      return;
    }

    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.text = newText;
    this.saveToStorage();
    this.renderTasks();
    this.closeEditTaskModal();
    
    this.showToast('Tarefa editada com sucesso!', 'success');
  }

  // Métodos para modal de confirmação
  closeConfirmationModal() {
    confirmationModal.classList.remove('show');
    confirmationState.action = null;
    confirmationState.data = null;
  }

  executeConfirmedAction() {
    const { action, data } = confirmationState;

    switch (action) {
      case 'deleteTask':
        this.executeDeleteTask(data.taskId);
        break;
      case 'clearCompleted':
        this.executeClearCompleted();
        break;
      case 'clearAll':
        this.executeClearAll();
        break;
      case 'deleteCategory':
        this.executeDeleteCategory(data.categoryId);
        break;
    }

    this.closeConfirmationModal();
  }

  executeDeleteTask(taskId) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.saveToStorage();
    this.renderTasks();
    this.updateStats();
    this.showToast('Tarefa excluída!', 'info');
  }

  executeClearCompleted() {
    const completedTasks = this.tasks.filter(t => t.completed);
    this.tasks = this.tasks.filter(t => !t.completed);
    this.saveToStorage();
    this.renderTasks();
    this.updateStats();
    this.showToast(`${completedTasks.length} tarefa(s) removida(s)!`, 'success');
  }

  executeClearAll() {
    this.tasks = [];
    this.saveToStorage();
    this.renderTasks();
    this.updateStats();
    this.showToast('Todas as tarefas foram removidas!', 'success');
  }

  executeDeleteCategory(categoryId) {
    const category = this.categories.find(c => c.id === categoryId);
    if (!category) return;

    // Remover categoria das tarefas
    this.tasks.forEach(task => {
      if (task.categoryId === categoryId) {
        task.categoryId = null;
      }
    });
    this.saveToStorage();
    this.renderTasks();

    this.categories = this.categories.filter(c => c.id !== categoryId);
    this.saveCategoriesToStorage();
    this.renderCategories();
    this.updateStats();
    this.showToast('Categoria removida!', 'info');
  }

  showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return diffInMinutes < 1 ? 'Agora mesmo' : `${diffInMinutes} min atrás`;
      }
      return `${diffInHours}h atrás`;
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Métodos para gerenciar a notificação de armazenamento
  setupStorageNotice() {
    // Verificar se o usuário já fechou a notificação anteriormente
    const noticeClosed = localStorage.getItem('storageNoticeClosed');
    
    if (noticeClosed === 'true') {
      storageNotice.classList.add('hidden');
    }
  }

  closeStorageNotice() {
    storageNotice.classList.add('hidden');
    localStorage.setItem('storageNoticeClosed', 'true');
    this.showToast('Aviso fechado!', 'info');
  }

  // ===== FUNÇÕES DE BACKUP E RESTAURAÇÃO =====

  /**
   * Cria um backup completo dos dados (tarefas e categorias)
   * @returns {Object} Objeto com os dados do backup
   */
  createBackup() {
    const backup = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      tasks: this.tasks,
      categories: this.categories,
      metadata: {
        totalTasks: this.tasks.length,
        completedTasks: this.tasks.filter(t => t.completed).length,
        totalCategories: this.categories.length,
        createdWith: 'Gerenciador de Tarefas'
      }
    };
    
    return backup;
  }

  /**
   * Exporta o backup para um arquivo JSON
   */
  exportBackup() {
    try {
      const backup = this.createBackup();
      const dataStr = JSON.stringify(backup, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      // Criar nome do arquivo com timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `backup-tarefas-${timestamp}.json`;
      
      // Criar link de download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Limpar URL do objeto
      URL.revokeObjectURL(link.href);
      
      this.showToast('Backup exportado com sucesso!', 'success');
      
      // Log para debug
      console.log('Backup exportado:', backup);
      
    } catch (error) {
      console.error('Erro ao exportar backup:', error);
      this.showToast('Erro ao exportar backup!', 'error');
    }
  }

  /**
   * Valida se um arquivo de backup é válido
   * @param {Object} backup - Objeto do backup
   * @returns {Object} Resultado da validação
   */
  validateBackup(backup) {
    const result = {
      isValid: false,
      errors: [],
      warnings: []
    };

    try {
      // Verificar estrutura básica
      if (!backup || typeof backup !== 'object') {
        result.errors.push('Arquivo de backup inválido');
        return result;
      }

      // Verificar versão
      if (!backup.version) {
        result.warnings.push('Versão do backup não especificada');
      }

      // Verificar timestamp
      if (!backup.timestamp) {
        result.warnings.push('Timestamp do backup não especificado');
      }

      // Verificar tarefas
      if (!Array.isArray(backup.tasks)) {
        result.errors.push('Dados de tarefas inválidos');
      } else {
        // Validar cada tarefa
        backup.tasks.forEach((task, index) => {
          if (!task.id || !task.text || typeof task.completed !== 'boolean') {
            result.errors.push(`Tarefa ${index + 1} tem dados inválidos`);
          }
          
          if (task.text.length > 100) {
            result.warnings.push(`Tarefa "${task.text.substring(0, 20)}..." excede 100 caracteres`);
          }
        });
      }

      // Verificar categorias
      if (!Array.isArray(backup.categories)) {
        result.errors.push('Dados de categorias inválidos');
      } else {
        // Validar cada categoria
        backup.categories.forEach((category, index) => {
          if (!category.id || !category.name || !category.color) {
            result.errors.push(`Categoria ${index + 1} tem dados inválidos`);
          }
          
          if (category.name.length > 30) {
            result.warnings.push(`Categoria "${category.name}" excede 30 caracteres`);
          }
        });
      }

      // Se não há erros, o backup é válido
      if (result.errors.length === 0) {
        result.isValid = true;
      }

    } catch (error) {
      result.errors.push(`Erro ao validar backup: ${error.message}`);
    }

    return result;
  }

  /**
   * Restaura dados de um backup
   * @param {Object} backup - Objeto do backup
   * @param {boolean} merge - Se true, mescla com dados existentes. Se false, substitui completamente
   */
  restoreBackup(backup, merge = false) {
    try {
      // Validar backup
      const validation = this.validateBackup(backup);
      
      if (!validation.isValid) {
        const errorMessage = `Backup inválido: ${validation.errors.join(', ')}`;
        this.showToast(errorMessage, 'error');
        console.error('Erro de validação:', validation.errors);
        return false;
      }

      // Mostrar avisos se houver
      if (validation.warnings.length > 0) {
        console.warn('Avisos de validação:', validation.warnings);
      }

      if (merge) {
        // Modo mesclagem: adicionar novos dados sem duplicar
        this.mergeBackupData(backup);
        this.showToast('Backup mesclado com sucesso!', 'success');
      } else {
        // Modo substituição: substituir completamente
        this.tasks = [...backup.tasks];
        this.categories = [...backup.categories];
        this.showToast('Backup restaurado com sucesso!', 'success');
      }

      // Salvar no localStorage
      this.saveToStorage();
      this.saveCategoriesToStorage();
      
      // Atualizar interface
      this.renderTasks();
      this.renderCategories();
      this.updateStats();
      
      // Log para debug
      console.log('Backup restaurado:', backup);
      
      return true;
      
    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      this.showToast('Erro ao restaurar backup!', 'error');
      return false;
    }
  }

  /**
   * Mescla dados do backup com dados existentes
   * @param {Object} backup - Objeto do backup
   */
  mergeBackupData(backup) {
    // Mesclar categorias
    const existingCategoryIds = new Set(this.categories.map(c => c.id));
    const newCategories = backup.categories.filter(c => !existingCategoryIds.has(c.id));
    
    if (newCategories.length > 0) {
      this.categories.push(...newCategories);
      this.showToast(`${newCategories.length} nova(s) categoria(s) adicionada(s)`, 'info');
    }

    // Mesclar tarefas
    const existingTaskIds = new Set(this.tasks.map(t => t.id));
    const newTasks = backup.tasks.filter(t => !existingTaskIds.has(t.id));
    
    if (newTasks.length > 0) {
      this.tasks.push(...newTasks);
      this.showToast(`${newTasks.length} nova(s) tarefa(s) adicionada(s)`, 'info');
    }

    // Normalizar IDs de categoria nas tarefas
    this.normalizeTaskCategories();
  }

  /**
   * Importa backup de um arquivo
   * @param {File} file - Arquivo JSON do backup
   * @param {boolean} merge - Se deve mesclar com dados existentes
   */
  importBackupFromFile(file, merge = false) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        this.restoreBackup(backup, merge);
      } catch (error) {
        console.error('Erro ao ler arquivo:', error);
        this.showToast('Arquivo de backup inválido!', 'error');
      }
    };
    
    reader.onerror = () => {
      this.showToast('Erro ao ler arquivo!', 'error');
    };
    
    reader.readAsText(file);
  }

  /**
   * Cria backup automático (para uso interno)
   */
  createAutoBackup() {
    try {
      const backup = this.createBackup();
      const autoBackupKey = 'autoBackup_' + new Date().toISOString().slice(0, 10);
      
      // Salvar backup automático no localStorage
      localStorage.setItem(autoBackupKey, JSON.stringify(backup));
      
      // Manter apenas os últimos 7 backups automáticos
      this.cleanupAutoBackups();
      
      console.log('Backup automático criado:', autoBackupKey);
      
    } catch (error) {
      console.error('Erro ao criar backup automático:', error);
    }
  }

  /**
   * Remove backups automáticos antigos (mantém apenas os últimos 7 dias)
   */
  cleanupAutoBackups() {
    const keys = Object.keys(localStorage);
    const autoBackupKeys = keys.filter(key => key.startsWith('autoBackup_'));
    
    if (autoBackupKeys.length > 7) {
      // Ordenar por data e remover os mais antigos
      autoBackupKeys.sort();
      const keysToRemove = autoBackupKeys.slice(0, autoBackupKeys.length - 7);
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log('Backup automático removido:', key);
      });
    }
  }

  /**
   * Restaura o último backup automático disponível
   */
  restoreLastAutoBackup() {
    const keys = Object.keys(localStorage);
    const autoBackupKeys = keys.filter(key => key.startsWith('autoBackup_'));
    
    if (autoBackupKeys.length === 0) {
      this.showToast('Nenhum backup automático encontrado!', 'info');
      return false;
    }
    
    // Pegar o backup mais recente
    const latestKey = autoBackupKeys.sort().pop();
    const backupData = localStorage.getItem(latestKey);
    
    try {
      const backup = JSON.parse(backupData);
      const success = this.restoreBackup(backup, false);
      
      if (success) {
        this.showToast(`Backup automático restaurado (${latestKey})`, 'success');
      }
      
      return success;
      
    } catch (error) {
      console.error('Erro ao restaurar backup automático:', error);
      this.showToast('Erro ao restaurar backup automático!', 'error');
      return false;
    }
  }

  /**
   * Lista todos os backups automáticos disponíveis
   * @returns {Array} Lista de backups automáticos
   */
  listAutoBackups() {
    const keys = Object.keys(localStorage);
    const autoBackupKeys = keys.filter(key => key.startsWith('autoBackup_'));
    
    return autoBackupKeys.map(key => {
      try {
        const backupData = localStorage.getItem(key);
        const backup = JSON.parse(backupData);
        return {
          key: key,
          date: key.replace('autoBackup_', ''),
          timestamp: backup.timestamp,
          totalTasks: backup.metadata?.totalTasks || 0,
          totalCategories: backup.metadata?.totalCategories || 0
        };
      } catch (error) {
        return {
          key: key,
          date: key.replace('autoBackup_', ''),
          error: 'Erro ao ler backup'
        };
      }
    }).sort((a, b) => b.date.localeCompare(a.date));
  }

  // ===== MÉTODOS DO MODAL DE IMPORTAÇÃO =====

  /**
   * Abre o modal de importação
   */
  openImportModal() {
    importBackupModal.classList.add('show');
    backupFileInputModal.value = '';
    backupPreview.style.display = 'none';
    importBackupModalConfirm.disabled = true;
    mergeBackupCheckbox.checked = false;
  }

  /**
   * Fecha o modal de importação
   */
  closeImportModal() {
    importBackupModal.classList.remove('show');
    backupFileInputModal.value = '';
    backupPreview.style.display = 'none';
    importBackupModalConfirm.disabled = true;
  }

  /**
   * Manipula a seleção de arquivo
   * @param {Event} event - Evento de mudança do input file
   */
  handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) {
      backupPreview.style.display = 'none';
      importBackupModalConfirm.disabled = true;
      return;
    }

    // Verificar se é um arquivo JSON
    if (!file.name.endsWith('.json')) {
      this.showToast('Por favor, selecione um arquivo JSON válido!', 'error');
      backupFileInputModal.value = '';
      backupPreview.style.display = 'none';
      importBackupModalConfirm.disabled = true;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        this.showBackupPreview(backup);
        importBackupModalConfirm.disabled = false;
      } catch (error) {
        this.showToast('Arquivo JSON inválido!', 'error');
        backupFileInputModal.value = '';
        backupPreview.style.display = 'none';
        importBackupModalConfirm.disabled = true;
      }
    };
    
    reader.onerror = () => {
      this.showToast('Erro ao ler arquivo!', 'error');
      backupFileInputModal.value = '';
      backupPreview.style.display = 'none';
      importBackupModalConfirm.disabled = true;
    };
    
    reader.readAsText(file);
  }

  /**
   * Mostra preview do backup selecionado
   * @param {Object} backup - Objeto do backup
   */
  showBackupPreview(backup) {
    const validation = this.validateBackup(backup);
    
    let previewHtml = `
      <div class="backup-info">
        <div class="backup-info-item">
          <span class="backup-info-label">Versão:</span>
          <span class="backup-info-value">${backup.version || 'Não especificada'}</span>
        </div>
        <div class="backup-info-item">
          <span class="backup-info-label">Data:</span>
          <span class="backup-info-value">${backup.timestamp ? new Date(backup.timestamp).toLocaleString('pt-BR') : 'Não especificada'}</span>
        </div>
        <div class="backup-info-item">
          <span class="backup-info-label">Tarefas:</span>
          <span class="backup-info-value">${backup.tasks?.length || 0}</span>
        </div>
        <div class="backup-info-item">
          <span class="backup-info-label">Categorias:</span>
          <span class="backup-info-value">${backup.categories?.length || 0}</span>
        </div>
      </div>
    `;

    if (validation.errors.length > 0) {
      previewHtml += `
        <div style="color: #dc3545; margin-top: 1rem;">
          <strong>Erros encontrados:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1rem;">
            ${validation.errors.map(error => `<li>${error}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (validation.warnings.length > 0) {
      previewHtml += `
        <div style="color: #ffc107; margin-top: 1rem;">
          <strong>Avisos:</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1rem;">
            ${validation.warnings.map(warning => `<li>${warning}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    backupPreviewContent.innerHTML = previewHtml;
    backupPreview.style.display = 'block';
  }

  /**
   * Confirma a importação do backup
   */
  confirmImport() {
    const file = backupFileInputModal.files[0];
    if (!file) {
      this.showToast('Por favor, selecione um arquivo!', 'error');
      return;
    }

    const merge = mergeBackupCheckbox.checked;
    this.importBackupFromFile(file, merge);
    this.closeImportModal();
  }

  /**
   * Configurar backup automático
   */
  setupAutoBackup() {
    // Criar backup automático a cada 24 horas
    setInterval(() => {
      this.createAutoBackup();
    }, 24 * 60 * 60 * 1000); // 24 horas em milissegundos
    
    // Criar backup automático quando a página for fechada
    window.addEventListener('beforeunload', () => {
      this.createAutoBackup();
    });
    
    console.log('Backup automático configurado');
  }
}

// Inicializar o gerenciador de tarefas
const taskManager = new TaskManager();

// Fechar modal ao clicar fora dele
categoryModal.addEventListener('click', (e) => {
  if (e.target === categoryModal) {
    taskManager.closeCategoryModal();
  }
});

// Fechar modal de editar categoria ao clicar fora dele
editTaskCategoryModal.addEventListener('click', (e) => {
  if (e.target === editTaskCategoryModal) {
    taskManager.closeEditTaskCategoryModal();
  }
});

// Fechar modal de editar tarefa ao clicar fora dele
editTaskModal.addEventListener('click', (e) => {
  if (e.target === editTaskModal) {
    taskManager.closeEditTaskModal();
  }
});

// Fechar modal de confirmação ao clicar fora dele
confirmationModal.addEventListener('click', (e) => {
  if (e.target === confirmationModal) {
    taskManager.closeConfirmationModal();
  }
});

// Fechar modal de importação ao clicar fora dele
importBackupModal.addEventListener('click', (e) => {
  if (e.target === importBackupModal) {
    taskManager.closeImportModal();
  }
});

// Função global para compatibilidade (se necessário)
function addTarefa() {
  taskManager.addTask();
}

function delTarefa(id) {
  taskManager.deleteTask(id);
}
