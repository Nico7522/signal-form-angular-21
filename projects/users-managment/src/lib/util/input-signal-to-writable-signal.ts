import { signal, Signal, WritableSignal } from '@angular/core';

export function inputSignalToWritableSignal<T>(inputSignal: Signal<T>): WritableSignal<T> {
  const input = inputSignal();
  const output = signal<T>(input);

  return output;
}
