import React, { useState, useEffect } from "react";

export default function Form({
  fields = [],
  onSubmit,
  onCancel,
  submitText = "Add",
  initialData = {},
}) {
  const [formData, setFormData] = useState(
    Object.fromEntries(
      fields.map((field) => [field.name, initialData[field.name] || ""])
    )
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(
      Object.fromEntries(
        fields.map((field) => [field.name, initialData[field.name] || ""])
      )
    );
  }, [initialData, fields]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      if (field.required && !value) {
        newErrors[field.name] = `${field.label || field.name} is required`;
      } else if (field.validate && !field.validate(value)) {
        newErrors[field.name] = `${field.label || field.name} is invalid`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // stop submission
    }

    setErrors({});
    onSubmit(formData);

    if (!initialData || Object.keys(initialData).length === 0) {
      setFormData(Object.fromEntries(fields.map((field) => [field.name, ""])));
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          {field.label && (
            <label className="mb-1 font-medium text-sm">{field.label}</label>
          )}

          {field.options ? (
            // Dropdown
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="px-2 py-1 border rounded"
            >
              <option value="">Select {field.label}</option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            // Checkbox
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: field.name,
                    value: e.target.checked, // boolean instead of string
                  },
                })
              }
              className="w-4 h-4"
            />
          ) : (
            // Normal text/number input
            <input
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder || ""}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="px-2 py-1 border rounded"
            />
          )}

          {errors[field.name] && (
            <span className="mt-1 text-red-500 text-sm">
              {errors[field.name]}
            </span>
          )}
        </div>
      ))}

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white"
        >
          {submitText}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
