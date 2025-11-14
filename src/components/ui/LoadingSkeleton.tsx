import "./LoadingSkeleton.css";

const LoadingSkeleton = () => {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-container">
        <div className="skeleton-header">
          <div className="skeleton-title"></div>
          <div className="skeleton-subtitle"></div>
        </div>
        <div className="skeleton-content">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
