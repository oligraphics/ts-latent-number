export type CreateLatentNumberOptions = {
    delayMs?: number;
    transitionDurationMs?: number;
    easingFunction?: (x: number) => number;
};
export declare class LatentNumber {
    private _value;
    private _latentValue;
    private _transitionId;
    private _lastUpdate;
    private _previousValue;
    private _delta;
    private _progress;
    private readonly _easingFunction;
    private readonly _delayMs;
    private readonly _transitionDurationMs;
    get value(): number;
    set value(value: number);
    get latentValue(): number;
    constructor(value?: number, options?: CreateLatentNumberOptions);
    _startTransition(): void;
    _update(transitionId: number): void;
}
//# sourceMappingURL=latent-number.d.ts.map