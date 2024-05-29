import { SourceType } from './sources';

export interface Task {
  title: string;
  source: SourceType;
  color?: string;
  url: string;
}

export interface TickTickTask extends Task {
  source: SourceType.TICK_TICK;
  description: string;
  parent?: string;
  priority: number;
  tags: string[];
  project: string;
}

export interface InternalTask extends Task {
  source: SourceType.INTERNAL;
  priority: 'none' | 'low' | 'medium' | 'high';
  description?: string;
}

export interface CreateNewTaskParams {
  title: string;
  description: string;
  color?: string;
  priority: string;
}
