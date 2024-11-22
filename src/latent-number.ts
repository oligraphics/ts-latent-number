import { easeInOutQuad } from 'js-easing-functions';

export class LatentNumber {
  private _value: number;
  private _latentValue: number;

  private _transitionId = 0;
  private _lastUpdate = 0;
  private _previousValue = 0;
  private _delta = 0;
  private _progress = 0;

  private readonly _easingFunction: (x: number) => number;
  private readonly _delayMs: number;
  private readonly _transitionDurationMs: number;

  get value() {
    return this._value;
  }

  set value(value: number) {
    if (value === this._value) {
      return;
    }
    this._value = value;
    this._startTransition();
  }

  get latentValue() {
    return this._latentValue;
  }

  constructor(
    value = 0,
    options?: {
      delayMs?: number;
      transitionDurationMs?: number;
      easingFunction?: (x: number) => number;
    },
  ) {
    this._value = value;
    this._latentValue = value;

    this._delayMs = options?.delayMs ?? 0;
    this._transitionDurationMs = options?.transitionDurationMs ?? 1000;
    this._easingFunction =
      options?.easingFunction ??
      ((progress: number) => easeInOutQuad(progress, 0, 1, 1));
  }

  _startTransition() {
    this._transitionId++;
    if (this._transitionId >= Number.MAX_SAFE_INTEGER) {
      this._transitionId = 0;
    }
    const transitionId = this._transitionId;
    this._previousValue = this._latentValue;
    this._progress = 0;
    this._delta = this._value - this._previousValue;
    if (this._delayMs > 0) {
      setTimeout(() => {
        if (transitionId !== transitionId) {
          return;
        }
        this._lastUpdate = Date.now();
        requestAnimationFrame(() => this._update(transitionId));
      });
    } else {
      this._lastUpdate = Date.now();
      requestAnimationFrame(() => this._update(transitionId));
    }
  }

  _update(transitionId: number) {
    if (this._transitionId !== transitionId) {
      return;
    }
    const now = Date.now();
    const deltaMs = now - this._lastUpdate;
    const progress = Math.min(
      1,
      this._progress + deltaMs / this._transitionDurationMs,
    );
    this._progress = progress;
    this._latentValue =
      this._easingFunction(progress) * this._delta + this._previousValue;

    if (progress >= 1) {
      return;
    }
    this._lastUpdate = now;
    requestAnimationFrame(() => this._update(transitionId));
  }
}
