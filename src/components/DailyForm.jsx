import React, { useState } from 'react';

const DailyForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [severity, setSeverity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación: verificar que todos los campos estén llenos
    if (title.trim() === '' || content.trim() === '' || severity.trim() === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Validar que severity sea un número
    if (isNaN(severity)) {
      alert('Severity debe ser un número');
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="severity">Severity:</label>
        <input
          type="number"
          id="severity"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default DailyForm;
