// Elementos do DOM
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const clearCompletedButton = document.getElementById('clearCompleted');
const clearAllButton = document.getElementById('clearAll');
const emptyState = document.getElementById('emptyState');
const toast = document.getElementById('toast');

// Elementos de estatísticas
const totalTasksElement = document.getElementById('totalTasks');
const completedTasksElement = document.getElementById('completedTasks');
const pendingTasksElement = document.getElementById('pendingTasks');

// Estrutura de dados para tarefas
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Classe para gerenciar tarefas
class TaskManager {
  constructor() {
    this.tasks = tasks;
    this.init();
  }

  init() {
    this.renderTasks();
    this.updateStats();
    this.setupEventListeners();
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

    // Foco no input ao carregar
    taskInput.focus();
  }

  addTask() {
    const text = taskInput.value.trim();
    
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
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    this.tasks.unshift(task);
    this.saveToStorage();
    this.renderTasks();
    this.updateStats();
    
    taskInput.value = '';
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

    const newText = prompt('Editar tarefa:', task.text);
    if (newText !== null && newText.trim() !== '') {
      if (newText.trim().length > 100) {
        this.showToast('A tarefa deve ter no máximo 100 caracteres!', 'error');
        return;
      }
      
      task.text = newText.trim();
      this.saveToStorage();
      this.renderTasks();
      this.showToast('Tarefa editada com sucesso!', 'success');
    }
  }

  deleteTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    const confirmed = confirm(`Deseja realmente excluir a tarefa "${task.text}"?`);
    if (confirmed) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.saveToStorage();
      this.renderTasks();
      this.updateStats();
      this.showToast('Tarefa excluída!', 'info');
    }
  }

  clearCompleted() {
    const completedTasks = this.tasks.filter(t => t.completed);
    if (completedTasks.length === 0) {
      this.showToast('Não há tarefas concluídas para limpar!', 'info');
      return;
    }

    const confirmed = confirm(`Deseja limpar ${completedTasks.length} tarefa(s) concluída(s)?`);
    if (confirmed) {
      this.tasks = this.tasks.filter(t => !t.completed);
      this.saveToStorage();
      this.renderTasks();
      this.updateStats();
      this.showToast(`${completedTasks.length} tarefa(s) removida(s)!`, 'success');
    }
  }

  clearAll() {
    if (this.tasks.length === 0) {
      this.showToast('Não há tarefas para limpar!', 'info');
      return;
    }

    const confirmed = confirm(`Deseja limpar todas as ${this.tasks.length} tarefa(s)?`);
    if (confirmed) {
      this.tasks = [];
      this.saveToStorage();
      this.renderTasks();
      this.updateStats();
      this.showToast('Todas as tarefas foram removidas!', 'success');
    }
  }

  renderTasks() {
    if (this.tasks.length === 0) {
      taskList.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';
    
    taskList.innerHTML = this.tasks.map(task => `
      <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''}
          onchange="taskManager.toggleTask(${task.id})"
        >
        <div class="task-content">
          <span class="task-text">${this.escapeHtml(task.text)}</span>
          <span class="task-time">
            Criada: ${this.formatDate(task.createdAt)}
            ${task.completedAt ? ` | Concluída: ${this.formatDate(task.completedAt)}` : ''}
          </span>
        </div>
        <div class="task-actions">
          <button class="btn-task btn-edit" onclick="taskManager.editTask(${task.id})">
            Editar
          </button>
          <button class="btn-task btn-delete" onclick="taskManager.deleteTask(${task.id})">
            Excluir
          </button>
        </div>
      </li>
    `).join('');
  }

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalTasksElement.textContent = total;
    completedTasksElement.textContent = completed;
    pendingTasksElement.textContent = pending;

    // Atualizar visibilidade dos botões
    clearCompletedButton.style.display = completed > 0 ? 'inline-flex' : 'none';
    clearAllButton.style.display = total > 0 ? 'inline-flex' : 'none';
  }

  saveToStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
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
}

// Inicializar o gerenciador de tarefas
const taskManager = new TaskManager();

// Função global para compatibilidade (se necessário)
function addTarefa() {
  taskManager.addTask();
}

function delTarefa(id) {
  taskManager.deleteTask(id);
}
