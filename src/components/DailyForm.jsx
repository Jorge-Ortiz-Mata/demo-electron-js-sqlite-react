import React, { useState, useEffect } from 'react';

const DailyForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [severity, setSeverity] = useState('');
  const [values, setValues] = useState('');

  useEffect(() => {
    window.electronAPI.recordSaved((response) => {
      if (response.success) {
        console.log('Registro guardado:', response.record);
      } else {
        console.error('Error al guardar el registro:', response.error);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim() === '' || content.trim() === '' || severity.trim() === '') {
      alert('Todos los campos son obligatorios');
      return;
    } else if (isNaN(severity)) {
      alert('Severity debe ser un número');
      return;
    } else {
      window.electronAPI.saveRecord({
        title: title,
        content: content,
        severity: parseInt(severity, 10),
      });
      setValues(`Title: ${title}; Content: ${content}; Severity: ${severity}`);
    }
  };

  return (
    <div>
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
      {
        values.length > 0 && <p>{values}</p>
      }
    </div>
  );
};

export default DailyForm;
