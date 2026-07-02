import { useState } from "react";

function Form({ fields, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label><br />
          <input
            type={field.type}
            name={field.name}
            onChange={handleChange}
          />
          <br /><br />
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;