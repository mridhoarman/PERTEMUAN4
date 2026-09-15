export type DummyJsonTodo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type DummyJsonTodoResponse = {
  todos: DummyJsonTodo[];
  total: number;
  skip: number;
  limit: number;
};

export type TodoMutationPayload = {
  todo?: string;
  completed?: boolean;
  userId?: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  meta?: Record<string, unknown>;
};
