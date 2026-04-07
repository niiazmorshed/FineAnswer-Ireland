import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../pages/Provider/ContextProvider";

export default function Topbar({
  sidebarCollapsed = false,
  onToggleSidebar,
  onToggleMobileSidebar,
}) {
  const { user } = useContext(AuthContext);
  const [imgError, setImgError] = useState(false);

  const profileImageUrl = user?.picture || user?.photoURL;
  const showImage = profileImageUrl && !imgError;

  const initials = (() => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  })();

  return (
    <div className="topbar">
      <div className="dashboard-topbar-titleRow">
        <button
          type="button"
          className="dashboard-topbar-burger"
          onClick={onToggleMobileSidebar}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>
        <input placeholder="Search universities, programs, documents..." />
      </div>

      <div className="topbar-right">
        <span className="notification">🔔</span>
        <div className="user">
          <span className="avatar">
            {showImage ? (
              <img
                src={profileImageUrl}
                alt={user?.name || "Profile"}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              initials
            )}
          </span>
          <span>{user?.name || user?.email?.split("@")?.[0] || "User"}</span>
        </div>
      </div>
    </div>
  );
}
