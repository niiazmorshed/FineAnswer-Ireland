import { useEffect, useState } from "react";
import {
  FaAward,
  FaEdit,
  FaPlus,
  FaSpinner,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { API_BASE_URL } from "../../config/api";
import { getToken } from "../../utils/tokenStorage";
import "./Scholarships.css";

// Mirrors the canonical levels used by the programs search so the public
// section can be filtered consistently later.
const LEVELS = [
  "All levels",
  "Master's (Postgraduate)",
  "Bachelor's (Undergraduate)",
  "Postgraduate Diploma",
  "Higher Diploma",
];

const EMPTY_FORM = {
  name: "",
  provider: "",
  amount: "",
  level: "All levels",
  deadline: "",
  eligibility: "",
  link: "",
};

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/scholarships`);
      const data = await response.json();
      if (data.success) setScholarships(data.data);
      setError(null);
    } catch {
      setError("Failed to load scholarships");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (scholarship = null) => {
    if (scholarship) {
      setEditing(scholarship);
      setFormData({
        name: scholarship.name || "",
        provider: scholarship.provider || "",
        amount: scholarship.amount || "",
        level: scholarship.level || "All levels",
        deadline: scholarship.deadline || "",
        eligibility: scholarship.eligibility || "",
        link: scholarship.link || "",
      });
    } else {
      setEditing(null);
      setFormData(EMPTY_FORM);
    }
    setFormError(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditing(null);
    setFormData(EMPTY_FORM);
    setFormError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      const token = getToken();
      const editId = editing && (editing._id ?? editing.id);
      const url = editId
        ? `${API_BASE_URL}/scholarships/${editId}`
        : `${API_BASE_URL}/scholarships`;

      const response = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchScholarships();
        handleCloseForm();
      } else {
        setFormError(data.message || "Failed to save scholarship");
      }
    } catch {
      setFormError("An error occurred while saving the scholarship");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this scholarship? This cannot be undone.")) {
      return;
    }
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/scholarships/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        await fetchScholarships();
      } else {
        alert(data.message || "Failed to delete scholarship");
      }
    } catch {
      alert("An error occurred while deleting the scholarship");
    }
  };

  return (
    <div className="scholarship-page">
      <div className="scholarship-header">
        <h2>Scholarship Management</h2>
        <button
          className="scholarship-create-btn"
          onClick={() => handleOpenForm()}
        >
          <FaPlus /> Add Scholarship
        </button>
      </div>

      {loading && (
        <div className="scholarship-loading">
          <FaSpinner className="scholarship-loading-spinner" />
          <p>Loading scholarships...</p>
        </div>
      )}

      {error && <div className="scholarship-error">{error}</div>}

      {!loading && !error && scholarships.length === 0 && (
        <div className="scholarship-empty">
          <FaAward />
          <h3>No scholarships yet</h3>
          <p>Add your first scholarship to show it on the landing page</p>
        </div>
      )}

      {!loading && !error && scholarships.length > 0 && (
        <div className="scholarship-list">
          {scholarships.map((item) => {
            const id = item._id ?? item.id;
            return (
              <div key={id} className="scholarship-card">
                <div className="scholarship-card-main">
                  <h3 className="scholarship-card-title">{item.name}</h3>
                  <p className="scholarship-card-provider">{item.provider}</p>

                  <div className="scholarship-card-meta">
                    {item.amount && (
                      <span className="scholarship-tag scholarship-tag--amount">
                        {item.amount}
                      </span>
                    )}
                    {item.level && (
                      <span className="scholarship-tag">{item.level}</span>
                    )}
                    {item.deadline && (
                      <span className="scholarship-tag">
                        Deadline: {item.deadline}
                      </span>
                    )}
                  </div>

                  {item.eligibility && (
                    <p className="scholarship-card-eligibility">
                      {item.eligibility}
                    </p>
                  )}

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="scholarship-card-link"
                    >
                      {item.link}
                    </a>
                  )}
                </div>

                <div className="scholarship-card-actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleOpenForm(item)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => id && handleDelete(id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <div className="scholarship-form-modal">
          <div className="scholarship-form-container">
            <div className="scholarship-form-header">
              <h3>{editing ? "Edit Scholarship" : "Add Scholarship"}</h3>
              <button className="close-modal-btn" onClick={handleCloseForm}>
                <FaTimes />
              </button>
            </div>

            <form className="scholarship-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Scholarship Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Government of Ireland International Education Scholarship"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="provider">Provider *</label>
                  <input
                    type="text"
                    id="provider"
                    name="provider"
                    value={formData.provider}
                    onChange={handleInputChange}
                    placeholder="e.g. Higher Education Authority"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="e.g. €10,000 or Full tuition"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="level">Study Level</label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                  >
                    {LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="deadline">Deadline</label>
                  <input
                    type="text"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    placeholder="e.g. 31 March 2027"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="eligibility">Eligibility</label>
                <textarea
                  id="eligibility"
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  placeholder="Who can apply, required grades, nationality restrictions..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="link">Official Link</label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
              </div>

              {formError && (
                <div className="scholarship-form-error">{formError}</div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={submitting}
                >
                  {submitting
                    ? "Saving..."
                    : editing
                      ? "Update Scholarship"
                      : "Add Scholarship"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
