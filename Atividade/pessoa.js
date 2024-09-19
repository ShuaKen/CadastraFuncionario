export class Pessoa {
    constructor(firstName, lastName, dateOfBirth, cpf, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfbirth = new Date(dateOfBirth);
        this.cpf = cpf;
        this.phone = phone;
        this.email = email;        
    }

    calculateAge() {
        const today = new Date();
        const birth = this.dateOfbirth;

        let age = today.getFullYear() - birth.getFullYear();
        const currentMonth = today.getMonth();
        const birthMonth = birth.getMonth();

        if (currentMonth < birthMonth || (currentMonth === birthMonth && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    }

    validateCPF() {
        const list = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'];
        const strCPF = this.cpf.replace(/\D/g, '');
        if (strCPF.length !== 11 || list.includes(strCPF)) {
            return false;
        }

        function calcularDigito(cpf, weight) {
            let sum = 0;
            for (let i = 0; i < weight; i++) {
                sum += parseInt(cpf.charAt(i)) * (weight + 1 - i);
            }
            const resto = sum % 11;
            return resto < 2 ? 0 : 11 - resto;
        }

        const firstDigit = calcularDigito(strCPF, 9);
        if (firstDigit !== parseInt(strCPF.charAt(9))) {
            return false;
        }

        const secondDigit = calcularDigito(strCPF, 10);
        if (secondDigit !== parseInt(strCPF.charAt(10))) {
            return false;
        }

        return true;
    }

    validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(this.email);
    }
}
