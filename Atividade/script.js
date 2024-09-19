import { Funcionario } from './funcionario.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('infoForm');
    const output = document.getElementById('output');
    const listContainer = document.getElementById('funcionario-list');
    const funcionarios = []; // Array para armazenar os funcionários

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio do formulário

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const dateOfBirth = document.getElementById('date-of-birth').value;
        const cpf = document.getElementById('cpf').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const enterpriseId = document.getElementById('enterprise-id').value;
        const jobTitle = document.getElementById('job-title').value;
        const startDate = document.getElementById('start-date').value;

        const funcionario = new Funcionario(firstName, lastName, dateOfBirth, cpf, phone, email, enterpriseId, jobTitle, startDate);

        // Validação do CPF
        const cpfValidationMessage = funcionario.validateCPF() ? '' : 'CPF inválido. Verifique se o CPF possui 11 dígitos e é válido.';
        if (cpfValidationMessage) {
            output.innerHTML = `<p style="color: red;">${cpfValidationMessage}</p>`;
            return; // Impede a execução posterior
        }

        // Validação do e-mail
        const emailValidationMessage = funcionario.validateEmail() ? '' : 'E-mail inválido. Verifique o formato do e-mail.';
        if (emailValidationMessage) {
            output.innerHTML = `<p style="color: red;">${emailValidationMessage}</p>`;
            return; // Impede a execução posterior
        }

        // Validação da data de início
        const startDateValidation = funcionario.validateStartDate();
        if (startDateValidation === 'Data de início inválida') {
            output.innerHTML = `<p style="color: red;">${startDateValidation}</p>`;
            return; // Impede a execução posterior
        }

        // Adiciona o funcionário ao array
        funcionarios.push(funcionario);

        // Limpa a saída anterior e exibe as informações do último funcionário
        output.innerHTML = `
            <p><strong>FUNCIONARIO ADICIONADO:</strong> ${funcionario.firstName} ${funcionario.lastName} (${enterpriseId})</p>
        `;

        // Atualiza a lista de funcionários
        updateFuncionarioList();
    });

    function updateFuncionarioList() {
        // Limpa a lista atual
        listContainer.innerHTML = '';

        // Adiciona cada funcionário na lista
        funcionarios.forEach((funcionario) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${funcionario.firstName} ${funcionario.lastName}</strong> <br>
                Idade: ${funcionario.calculateAge()} anos <br>
                CPF: ${funcionario.cpf} <br>
                E-mail: ${funcionario.email} <br>
                Cargo: ${funcionario.jobTitle} (${funcionario.enterpriseId}) <br>
                Data de Nascimento: ${funcionario.dateOfbirth.toLocaleDateString()} <br>
                Data de Início: ${funcionario.startDate.toLocaleDateString()} <br>
                ${funcionario.timeInCompany()}
            `;
            listContainer.appendChild(listItem);
        });
    }
});
