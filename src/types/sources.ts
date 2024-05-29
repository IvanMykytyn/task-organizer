export enum SourceType {
  TICK_TICK = 'tick_tick',
  INTERNAL = 'internal',
}

export interface Source {
  id: number;
  type: SourceType;
}
