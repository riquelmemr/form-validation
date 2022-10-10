class ValidateForm {
    constructor() {
        this.form = document.querySelector('.form');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const validFields = this.validFields();
        const validPasswords = this.validatePasswords();

        if (validFields && validPasswords) {
            alert('Formulário enviado.');
            this.form.submit();
        }
    }

    validFields() {
        let valid = true;

        for (let textError of this.form.querySelectorAll('.text-error')) {
            textError.remove();
        }

        for (let field of this.form.querySelectorAll('.valid')) {

            const label = field.previousElementSibling.innerText;

            if (!field.value) {
                this.setError(field, `O campo "${label.toLowerCase()}" não pode estar em branco.`);
                valid = false;
            }

            if (field.classList.contains('cpf')) {
                if (!this.validateCPF(field)) valid = false;
            }

            if (field.classList.contains('user')) {
                if (!this.validateUser(field)) valid = false;
            }
        };

        return valid;
    }

    validateUser(field) {

        const user = field.value;
        let valid = true;

        if (user.length < 3 || user.length > 12) {
            this.setError(field, 'Usuário precisa conter entre 3 e 12 caracteres.');
            valid = false;
        }

        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.setError(field, 'Usuário precisa conter apenas letras ou números.');
            valid = false;
        }

        return valid;
    }

    validatePasswords() {

        const password = this.form.querySelector('.password');
        const repeatPassword = this.form.querySelector('.repeat-password');
        let valid = true;

        if (password.value !== repeatPassword.value) {
            this.setError(password, 'Os campos de senhas precisam ser iguais.');
            this.setError(repeatPassword, 'Os campos de senhas precisam ser iguais.');
            valid = false;
        }

        if (password.value.length < 6 || password.value.length > 12) {
            this.setError(password, 'Campo senha precisa conter entre 6 a 12 caracteres.');
        }

        return valid;
    }

    validateCPF(field) {

        const cpf = new ValidateCPF(field.value);

        if (!cpf.validate()) {
            this.setError(field, 'CPF inválido');
            return false;
        }

        return true;
    }

    setError(field, message) {
        const div = document.createElement('div');
        div.innerHTML = message;
        div.classList.add('text-error');

        field.insertAdjacentElement('afterend', div);
    }
}

const validateForm = new ValidateForm();
