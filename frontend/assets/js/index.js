const tbody=document.getElementById('tbody');
const formulario=document.querySelector('.addForm');
const inputTarefa=document.querySelector('.inputTarefa');

const addTarefa = async(event) =>{
    event.preventDefault();

    const tarefa= {title:inputTarefa.value}

    await fetch("http://localhost:3000/tasks",{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    })

    loadTask();
    inputTarefa.value="" 
}

const deleteTask = async (id) =>{
    await fetch(`http://localhost:3000/tasks/${id}`,{
        method:'DELETE',  
    })
    loadTask();

}

const updateTask = async({id_tarefa,m_tarefa,status}) =>{
        const options ={
            dateStyle:'short',timeStyle:'short'
        }

        const dataAtual = new Date();

        // Formate a data e hora no formato desejado (sem vírgula)
        let dataAtualizacao = dataAtual.toISOString().slice(0, 19).replace('T', ' ');
       dados={
            title:m_tarefa,
            status:status,
            dataAtualizacao:dataAtualizacao
       }
    await fetch(`http://localhost:3000/tasks/${id_tarefa}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
        
    })
    loadTask();
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

const formatarData=(dataUTC)=>{
    const options ={
        dateStyle:'long',timeStyle:'short'
    }
    const data= new Date(dataUTC).toLocaleString('pt-br',options);

    return data
}


const createRow = (tasks) => {
    const {id_tarefa,m_tarefa,status,data_criacao} = tasks;
        const tr = createElementos('tr');
        const tbTitulo = createElementos('td', m_tarefa);
        const datac = createElementos('td', formatarData(data_criacao));
        const tStatus = createElementos('td');
        const tacao = createElementos('td');

        const editBnt = createElementos('button', '', '<span class="material-symbols-outlined">edit</span>');

        const deleterBnt = createElementos('button', '', '<span class="material-symbols-outlined">delete</span>');

        const editForm = createElementos('form');
        const editInput= createElementos('input');
        editInput.value=m_tarefa

        editForm.appendChild(editInput);
        editForm.addEventListener('submit',(event)=>{
            event.preventDefault();
            updateTask({id_tarefa,m_tarefa:editInput.value,status})
        })

        editBnt.addEventListener('click',()=>{
            tbTitulo.innerText="";
            tbTitulo.appendChild(editForm);
        })

        deleterBnt.addEventListener('click',()=>{
            deleteTask(id_tarefa);
        })

        const selectm = createSelect(status);

        selectm.addEventListener('change',({target})=>{
            updateTask({...tasks,status:target.value});
        })

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
        tbody.innerHTML=""
        tasks.forEach((task) => {
            const tr = createRow(task);
    
        });
    }

    formulario.addEventListener('submit',addTarefa);

loadTask()
