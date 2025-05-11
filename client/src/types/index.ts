export interface Todo {
  id: string | number;
  text: string;
  completed?: boolean;
  createdAt?: string | Date;
}