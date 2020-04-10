import React, {useEffect, useState} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log(repositories);
    });
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Desafio ReactJS ${Date.now()}`,
      url: 'http://github.com/test',
      techs: ['Node','React','React Native']
    });
    
    setRepositories([...repositories, response.data]);

    //console.log(response.data);
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if(repositoryIndex > -1){
      const response = await api.delete(`repositories/${id}`);
      if(response.status == 204){
        const repos = repositories;
        repos.splice(repositoryIndex,1);
        setRepositories([...repos]);
      }
    }
    console.log(id);
  }

  return (
    <div>

      <ul data-testid="repository-list">  
      {repositories.map(repository =>  ( 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )
      )}  
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
