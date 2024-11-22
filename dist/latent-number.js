"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatentNumber = void 0;
const js_easing_functions_1 = require("js-easing-functions");
class LatentNumber {
    _value;
    _latentValue;
    _transitionId = 0;
    _lastUpdate = 0;
    _previousValue = 0;
    _delta = 0;
    _progress = 0;
    _easingFunction;
    _delayMs;
    _transitionDurationMs;
    get value() {
        return this._value;
    }
    get latentValue() {
        return this._latentValue;
    }
    set value(value) {
        if (value === this._value) {
            return;
        }
        this._value = value;
        this._startTransition();
    }
    constructor(value = 0, options) {
        this._value = value;
        this._latentValue = value;
        this._delayMs = options?.delayMs ?? 0;
        this._transitionDurationMs = options?.transitionDurationMs ?? 1000;
        this._easingFunction =
            options?.easingFunction ??
                ((progress) => (0, js_easing_functions_1.easeInOutQuad)(progress, 0, 1, 1));
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
        }
        else {
            this._lastUpdate = Date.now();
            requestAnimationFrame(() => this._update(transitionId));
        }
    }
    _update(transitionId) {
        if (this._transitionId !== transitionId) {
            return;
        }
        const now = Date.now();
        const deltaMs = now - this._lastUpdate;
        const progress = Math.min(1, this._progress + deltaMs / this._transitionDurationMs);
        this._latentValue =
            this._easingFunction(progress) * this._delta + this._previousValue;
        if (progress >= 1) {
            return;
        }
        this._lastUpdate = now;
        requestAnimationFrame(() => this._update(transitionId));
    }
}
exports.LatentNumber = LatentNumber;
//# sourceMappingURL=latent-number.js.map