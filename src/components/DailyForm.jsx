import React, { useState } from 'react';

const DailyForm = ({ fetchRecords }) => {
  const [params, setParams] = useState({ title: "", content: "", severity: "" });

  const handleOnChange = (e) =>  {
    const { name, value } = e.target;

    setParams(prevState => { return { ...prevState, [name]: value }});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    window.electronAPI.saveRecord({
      title: params.title,
      content: params.content,
      severity: parseInt(params.severity, 10),
    });

    window.electronAPI.onRecordSaved((response) => {
      if (response.success) {
        fetchRecords();  
      } else {
        console.error('Error al guardar el registro:', response.error);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            className='border rounded text-sm font-semibold'
            type="text"
            id="title"
            name="title"
            value={params.title}
            onChange={handleOnChange}
          />
        </div>
        
        <div>
          <label htmlFor="content">Content:</label>
          <input
            className='border rounded text-sm font-semibold'
            type="text"
            id="content"
            name="content"
            value={params.content}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label htmlFor="severity">Severity:</label>
          <input
            className='border rounded text-sm font-semibold'
            type="number"
            id="severity"
            name="severity"
            value={params.severity}
            onChange={handleOnChange}
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DailyForm;
