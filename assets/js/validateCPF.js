class ValidateCPF {
    constructor(cpf) {
        Object.defineProperty(this, 'cleanCPF', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpf.replace(/\D+/g, '')
        })
    }

    validate() {

        if (typeof this.cleanCPF === 'undefined') return false;
        if (this.cleanCPF.length !== 11) return false;
        if (this.isSequential()) return false;

        const baseCPF = this.generateFirstNineNumbers();

        const firstDigit = ValidateCPF.generateDigit(baseCPF);
        const secondDigit = ValidateCPF.generateDigit(baseCPF + firstDigit);

        const newCPF = baseCPF + firstDigit + secondDigit;

        return newCPF === this.cleanCPF;
    }

    generateFirstNineNumbers() {
        return this.cleanCPF.slice(0, -2);
    }

    isSequential() {
        return this.cleanCPF[0].repeat(this.cleanCPF.length) === this.cleanCPF;
    }

    static generateDigit(baseCPF) {
        
        const array = Array.from(baseCPF);
        let regressive = array.length + 1;
        
        const total = array.reduce((acumulator, value) => {
            acumulator += (regressive * Number(value));
            regressive--;

            return acumulator;
        }, 0);

        let digit = 11 - (total % 11);

        return digit > 9 ? '0' : String(digit);
    }
}
