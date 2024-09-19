import { Pessoa } from './pessoa.js';

export class Funcionario extends Pessoa {
    constructor(firstName, lastName, dateOfBirth, cpf, phone, email, enterpriseId, jobTitle, startDate) {
        super(firstName, lastName, dateOfBirth, cpf, phone, email);
        this.enterpriseId = enterpriseId;
        this.jobTitle = jobTitle;
        this.startDate = new Date(startDate);
    }

    validateStartDate() {
        const today = new Date();
        const start = this.startDate;
        return start >= today ? 'Data de início inválida' : 'Data de início válida';
    }

    timeInCompany() {
        const today = new Date();
        const start = this.startDate;
        return (today.getFullYear() - start.getFullYear()) >= 5 ? "Mais de 5 anos na Empresa" : "Menos de 5 anos na empresa";
    }
}
