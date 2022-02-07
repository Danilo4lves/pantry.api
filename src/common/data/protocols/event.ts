export interface Event {
  emit(event: string, ...values: any[]): boolean;
  emitAsync(event: string, ...values: any[]): Promise<any[]>;
}
