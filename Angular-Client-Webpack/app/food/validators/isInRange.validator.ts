import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';

const INT_MAX = 2147483647;

@Directive({
    selector: '[isInRange][formControlName],[isInRange][formControl],[isInRange][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => IsInRangeValidator), multi: true }
    ]
})

export class IsInRangeValidator implements Validator {

    private _minValue: number;
    private _maxValue: number;

    constructor( @Attribute('minValue') minValue: number,
        @Attribute('maxValue') maxValue: number) {

        this._minValue = minValue || 0;
        this._maxValue = maxValue || INT_MAX;
    }

    validate(c: FormControl): { [key: string]: any } {

        if (+c.value > this._maxValue || +c.value < this._minValue) {
            return {
                isInRange: {
                    valid: false
                }
            };
        }

        return null;
    }
}
