import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../config/api";
import { resolveMediaUrl } from "../utils/resolveMediaUrl";
import TopUtilityBar from "../components/TopUtilityBar";
import Navbar3 from "../components/navbar3";
import Footer from "../components/Footer";
import "../styles/Blog.css";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      } else {
        setError("Failed to load blogs");
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stripMarkdownBold = (text) =>
    text ? text.replace(/\*\*(.+?)\*\*/g, "$1") : "";

  const truncateContent = (content, maxLength = 120) => {
    if (!content) return "No preview available...";
    const plain = stripMarkdownBold(content);
    return plain.length > maxLength
      ? plain.substring(0, maxLength) + "..."
      : plain;
  };

  const monthKey = (dateString) => {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const monthIndex = d.getMonth();
    const monthName = d.toLocaleString("en-US", { month: "long" });
    return { key: `${year}-${monthIndex}`, label: `${monthName} ${year}` };
  };

  const filteredBlogs = blogs.filter((b) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const title = String(b.title || "").toLowerCase();
    const content = String(stripMarkdownBold(b.content || "")).toLowerCase();
    const author = String(b.author || "").toLowerCase();
    return title.includes(q) || content.includes(q) || author.includes(q);
  });

  const featured = filteredBlogs[0] || null;
  const rest = filteredBlogs.slice(1);

  const archive = filteredBlogs.reduce((acc, b) => {
    const created = b?.createdAt;
    if (!created) return acc;
    const k = monthKey(created);
    acc[k.key] = acc[k.key] || { label: k.label, count: 0 };
    acc[k.key].count += 1;
    return acc;
  }, {});

  const archiveItems = Object.entries(archive)
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => (a.key < b.key ? 1 : -1))
    .slice(0, 6);

  if (loading) {
    return (
      <div className="LandingPage blog-shell">
        <div className="landing-top">
          <TopUtilityBar />
          <Navbar3 />
        </div>
        <div className="blog-page">
          <div className="blog-loader">Loading articles</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="LandingPage blog-shell">
        <div className="landing-top">
          <TopUtilityBar />
          <Navbar3 />
        </div>
        <div className="blog-page">
          <div className="blog-empty">
            <p>{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="LandingPage blog-shell">
      <div className="landing-top">
        <TopUtilityBar />
        <Navbar3 />
      </div>

      <div className="blog-page">
        {/* Header Section */}
        <section className="blog-header" aria-label="Blogs and articles header">
          <h1>Blogs and Articles</h1>
          <p>
            Curated reading material to keep you equipped with correct information and knowledge. Explore practical
            guides, study abroad tips, visa and admission updates, and student success insights — designed to help you
            make confident decisions about your next step.
          </p>
        </section>

        <main className="blog-container">
          {filteredBlogs.length === 0 ? (
            <div className="blog-empty">
              <p>No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* Featured strip (screenshot style) */}
              {featured ? (
                <section className="blog-featured" aria-label="Featured article">
                  <article className="blog-featuredCard">
                    <div className="blog-featuredMedia" aria-hidden="true">
                      {featured.image ? (
                        <img src={resolveMediaUrl(featured.image)} alt="" loading="eager" decoding="async" />
                      ) : (
                        <div className="blog-featuredPlaceholder" />
                      )}
                    </div>
                    <div className="blog-featuredBody">
                      <div className="blog-featuredMeta">
                        <span className="blog-featuredRead">5 min read</span>
                        <span className="blog-featuredDot">•</span>
                        <time dateTime={featured.createdAt}>{formatDate(featured.createdAt)}</time>
                      </div>
                      <h2 className="blog-featuredTitle">{featured.title}</h2>
                      <p className="blog-featuredExcerpt">{truncateContent(featured.content, 170)}</p>
                      <div className="blog-featuredBottom">
                        <span className="blog-featuredBy">
                          by <strong>{featured.author || "Admin"}</strong>
                        </span>
                        <Link to={`/blog/${featured._id}`} className="blog-featuredCta">
                          Read article →
                        </Link>
                      </div>
                    </div>
                  </article>
                </section>
              ) : null}

              {/* Two-column: All articles + Archive */}
              <section className="blog-lower" aria-label="All articles and archive">
                <div className="blog-lower__main">
                  <div className="blog-lower__topbar">
                    <h3 className="blog-lower__title">All articles</h3>
                    <div className="blog-lower__search">
                      <FaSearch aria-hidden="true" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search articles"
                        aria-label="Search articles"
                      />
                    </div>
                  </div>

                  <div className="blog-list" role="list">
                    {rest.length ? (
                      rest.map((blog) => (
                        <article className="blog-row" key={blog._id} role="listitem">
                          <div className="blog-row__body">
                            <h4 className="blog-row__title">{blog.title}</h4>
                            <p className="blog-row__excerpt">{truncateContent(blog.content, 120)}</p>
                            <div className="blog-row__meta">
                              <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
                              <span className="blog-row__metaDot">•</span>
                              <span>{blog.author || "Admin"}</span>
                            </div>
                          </div>
                          <div className="blog-row__thumb" aria-hidden="true">
                            {blog.image ? (
                              <img src={resolveMediaUrl(blog.image)} alt="" loading="lazy" decoding="async" />
                            ) : (
                              <div className="blog-row__thumbPlaceholder" />
                            )}
                          </div>
                          <Link
                            to={`/blog/${blog._id}`}
                            className="blog-row__link"
                            aria-label={`Read more about ${blog.title}`}
                          />
                        </article>
                      ))
                    ) : (
                      <div className="blog-empty">
                        <p>No more articles match your search.</p>
                      </div>
                    )}
                  </div>
                </div>

                <aside className="blog-lower__aside" aria-label="Archive">
                  <div className="blog-archiveCard">
                    <div className="blog-archiveTitle">Archive</div>
                    <div className="blog-archiveList">
                      {archiveItems.map((a) => (
                        <div key={a.key} className="blog-archiveRow">
                          <div className="blog-archiveLabel">{a.label}</div>
                          <div className="blog-archiveCount">{a.count} Articles</div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="blog-archiveMore"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                      View More ↓
                    </button>
                  </div>
                </aside>
              </section>
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
