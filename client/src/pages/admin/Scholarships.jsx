import { useEffect, useState } from "react";
import {
  FaAward,
  FaCloudUploadAlt,
  FaEdit,
  FaPlus,
  FaSpinner,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { API_BASE_URL } from "../../config/api";
import { getToken } from "../../utils/tokenStorage";
import { uploadImageToS3 } from "../../utils/s3Upload";
import { scholarshipImage } from "../../utils/scholarshipImage";
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
  image: "",
  logo: "",
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

  /**
   * Picked files live outside formData because they are File objects, not the
   * URL strings the record stores. They are uploaded on submit and only then
   * become URLs — the same two-step Success Stories uses, so nothing reaches S3
   * for a form the admin abandons.
   *
   * The preview is a local data URL for a fresh pick, or the stored S3 URL when
   * editing a record that already has one.
   */
  const [imageFile, setImageFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

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
        image: scholarship.image || "",
        logo: scholarship.logo || "",
      });
      setImagePreview(scholarship.image || null);
      setLogoPreview(scholarship.logo || null);
    } else {
      setEditing(null);
      setFormData(EMPTY_FORM);
      setImagePreview(null);
      setLogoPreview(null);
    }
    setImageFile(null);
    setLogoFile(null);
    setFormError(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditing(null);
    setFormData(EMPTY_FORM);
    setImageFile(null);
    setLogoFile(null);
    setImagePreview(null);
    setLogoPreview(null);
    setFormError(null);
  };

  /** Validates locally and shows an instant preview; the upload waits for submit. */
  const handleFileChange = (event, setFile, setPreview) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Please choose an image file.");
      return;
    }
    // Matches the 5 MB ceiling the presigned-url endpoint enforces, so an
    // oversized file is rejected here rather than after a failed round trip.
    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image is too large. Maximum size is 5 MB.");
      return;
    }

    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    setFormError(null);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const clearLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setFormData((prev) => ({ ...prev, logo: "" }));
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

      // Upload only what was newly picked; an untouched field keeps whatever URL
      // the record already held.
      const [imageUrl, logoUrl] = await Promise.all([
        imageFile ? uploadImageToS3(imageFile) : Promise.resolve(formData.image),
        logoFile ? uploadImageToS3(logoFile) : Promise.resolve(formData.logo),
      ]);

      const payload = { ...formData, image: imageUrl, logo: logoUrl };

      const response = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
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
                <img
                  className="scholarship-card-thumb"
                  src={scholarshipImage(item)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div className="scholarship-card-main">
                  <h3 className="scholarship-card-title">
                    {item.logo && (
                      <img
                        className="scholarship-card-logo"
                        src={item.logo}
                        alt=""
                        loading="lazy"
                      />
                    )}
                    {item.name}
                  </h3>
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

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="logo">Scholarship Logo</label>
                  <div className="upload-field">
                    <input
                      type="file"
                      id="logo"
                      accept="image/*"
                      className="upload-input"
                      onChange={(e) =>
                        handleFileChange(e, setLogoFile, setLogoPreview)
                      }
                    />
                    <label htmlFor="logo" className="upload-label">
                      <FaCloudUploadAlt />
                      <span>{logoPreview ? "Change logo" : "Choose logo"}</span>
                    </label>
                    {logoPreview && (
                      <div className="upload-preview upload-preview--logo">
                        <img src={logoPreview} alt="" />
                        <button
                          type="button"
                          className="upload-clear"
                          onClick={clearLogo}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  <small className="form-hint">
                    The provider&apos;s mark, shown beside the scholarship name.
                    PNG with a transparent background works best.
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="image">Card Photo</label>
                  <div className="upload-field">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      className="upload-input"
                      onChange={(e) =>
                        handleFileChange(e, setImageFile, setImagePreview)
                      }
                    />
                    <label htmlFor="image" className="upload-label">
                      <FaCloudUploadAlt />
                      <span>{imagePreview ? "Change photo" : "Choose photo"}</span>
                    </label>
                    <div className="upload-preview">
                      <img
                        src={
                          imagePreview ||
                          scholarshipImage({
                            ...formData,
                            _id: editing?._id ?? editing?.id,
                          })
                        }
                        alt=""
                      />
                      {imagePreview && (
                        <button
                          type="button"
                          className="upload-clear"
                          onClick={clearImage}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                  <small className="form-hint">
                    Banner across the top of the card. Leave empty to use one of
                    the built-in university photos, shown above.
                  </small>
                </div>
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
                    ? imageFile || logoFile
                      ? "Uploading..."
                      : "Saving..."
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
