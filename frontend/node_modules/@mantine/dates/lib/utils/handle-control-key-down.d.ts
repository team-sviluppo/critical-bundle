import { RefObject } from 'react';
import type { ControlKeydownPayload } from '../types';
type ControlsRef = RefObject<HTMLButtonElement[][][]>;
interface HandleControlKeydownInput {
    controlsRef: ControlsRef;
    numberOfColumns: number;
    index: number;
    payload: ControlKeydownPayload;
    event: React.KeyboardEvent<HTMLButtonElement>;
    controlsPerRow: number | number[];
}
export declare function handleControlKeyDown({ controlsRef, index, payload, event, numberOfColumns, controlsPerRow, }: HandleControlKeydownInput): void;
export {};
//# sourceMappingURL=handle-control-key-down.d.ts.map