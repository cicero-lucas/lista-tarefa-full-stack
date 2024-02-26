const tbody=document.getElementById('tbody');
const formulario=document.querySelector('.addForm');
const inputTarefa=document.querySelector('.inputTarefa');

const addTarefa = async(event) =>{
    event.preventDefault();

    const tarefa= {title:inputTarefa.value}
    console.log(tarefa)
    await fetch("http://localhost:3000/tasks",{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    })
    
}

const fetchTarefas = async () => {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    return tasks;
}

const createElementos = (tag, innert = '', innerH = '') => {
    const element = document.createElement(tag);
    if (innert) {
        element.innerText = innert;
    }
    if (innerH) {
        element.innerHTML = innerH; // Corrigido para innerHTML
    }
    return element;
}

const createSelect = (value) => {
    const opc = `
        <option value="0">pendente</option>
        <option value="1">andamento</option>
        <option value="2">concluido</option>
    `;

    const selectElement = createElementos('select', '', opc);
    // Encontra o option com o valor correspondente e o torna selecionado
    selectElement.querySelector(`option[value="${value}"]`).selected = true;

    return selectElement;
}


const createRow = (tasks) => {
    const {id_tarefa,m_tarefa,status,data_criacao} = tasks;
        const tr = createElementos('tr');
        const tbTitulo = createElementos('td', m_tarefa);
        const datac = createElementos('td', data_criacao);
        const tStatus = createElementos('td');
        const tacao = createElementos('td');

        const editBnt = createElementos('button', '', '<span class="material-symbols-outlined">edit</span>');
        const deleterBnt = createElementos('button', '', '<span class="material-symbols-outlined">delete</span>');

        const selectm = createSelect(status);

        editBnt.classList.add("btn_ac");
        deleterBnt.classList.add("btn_ac");

        tStatus.appendChild(selectm)

        tacao.appendChild(editBnt);
        tacao.appendChild(deleterBnt);

        tr.appendChild(tbTitulo);
        tr.appendChild(datac);
        tr.appendChild(tStatus);
        tr.appendChild(tacao);

        tbody.appendChild(tr);
    }

    const  loadTask = async () => {
        const tasks= await fetchTarefas();
        tasks.forEach((task) => {
            const tr = createRow(task);
    
        });
    }

    formulario.addEventListener('submit',addTarefa);

loadTask()
