import React, { useEffect, useState } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Umbriel',
      url: 'http://titopal.com',
      techs: ['node', 'react'],
    });

    setRepositories([...repositories, response.data]); // principio de imutabilidade, precisa copiar os repositorios e adicionar novo
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(
      (repository) => repository.id !== id // mantendo apenas nos repositórios aonde o id é diferente do id que removeu
    );

    setRepositories(newRepositories);
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
