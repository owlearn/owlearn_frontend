import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./taleView.module.css";

const DEFAULT_INITIAL_PAGE = 1;

const formatParagraph = (text) =>
  typeof text === "string"
    ? text
        .replace(/([.?!])\s*/g, "$1\n\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
    : "";

const clampPage = (page, total) => {
  if (total <= 0) return 1;
  if (page < 1) return 1;
  if (page > total) return total;
  return page;
};

function TaleView({
  title = "",
  contents = [],
  imageUrls = [],
  initialPage = DEFAULT_INITIAL_PAGE,
  imageSrcBuilder = (src) => src,
  onPageChange,
  onReachEnd,
  variant = "child",
  renderFooter,
  className = "",
}) {
  const totalPages = Array.isArray(contents) ? contents.length : 0;
  const [page, setPage] = useState(
    clampPage(initialPage ?? DEFAULT_INITIAL_PAGE, totalPages)
  );

  useEffect(() => {
    setPage(clampPage(initialPage ?? DEFAULT_INITIAL_PAGE, totalPages));
  }, [initialPage, totalPages]);

  useEffect(() => {
    if (onPageChange) onPageChange(page, totalPages);
  }, [page, totalPages, onPageChange]);

  useEffect(() => {
    if (totalPages > 0 && page === totalPages && onReachEnd) {
      onReachEnd();
    }
  }, [page, totalPages, onReachEnd]);

  const normalisedContents = useMemo(() => {
    if (!Array.isArray(contents)) return [];
    return contents.map((paragraph) => formatParagraph(paragraph));
  }, [contents]);

  const currentContent =
    totalPages > 0 ? normalisedContents[page - 1] || "" : "";

  const rawImage =
    Array.isArray(imageUrls) && imageUrls.length > 0
      ? imageUrls[page - 1]
      : undefined;
  const imageSrc = rawImage ? imageSrcBuilder(rawImage) : undefined;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const goPrev = () => {
    if (canGoPrev) setPage((prev) => Math.max(prev - 1, 1));
  };

  const goNext = () => {
    if (canGoNext) setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const footerContent = renderFooter
    ? renderFooter({ page, totalPages })
    : null;
  const hasFooter = Boolean(footerContent);

  const nav = (
    <div className={styles.pageNav}>
      <button
        type="button"
        className={styles.arrow}
        onClick={goPrev}
        disabled={!canGoPrev}
        aria-label="이전 페이지"
      >
        <IoIosArrowBack />
      </button>
      <span className={styles.pageIndicator}>
        {totalPages > 0 ? `${page}/${totalPages}` : "0/0"}
      </span>
      <button
        type="button"
        className={styles.arrow}
        onClick={goNext}
        disabled={!canGoNext}
        aria-label="다음 페이지"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );

  return (
    <div className={[styles.wrapper, className].join(" ").trim()}>
      {title && (
        <h1
          className={[
            styles.title,
            variant === "admin" ? styles.titleAdmin : styles.titleChild,
          ]
            .join(" ")
            .trim()}
        >
          {title}
        </h1>
      )}

      <div className={styles.body}>
        {imageSrc ? (
          <figure className={styles.imageWrap}>
            <img
              src={imageSrc}
              alt={`${title || "동화"} ${page}페이지 삽화`}
              className={styles.image}
            />
            <section className={styles.storyBox}>
              {totalPages === 0 ? (
                <div className={styles.emptyContent}>
                  아직 등록된 본문이 없습니다.
                </div>
              ) : (
                <p className={styles.storyText}>{currentContent}</p>
              )}
            </section>
          </figure>
        ) : (
          <section className={styles.storyBoxStandalone}>
            {totalPages === 0 ? (
              <div className={styles.emptyContent}>
                아직 등록된 본문이 없습니다.
              </div>
            ) : (
              <p className={styles.storyText}>{currentContent}</p>
            )}
          </section>
        )}
      </div>

      <div className={styles.controlsRow}>
        <div className={styles.navWrap}>{nav}</div>
        {hasFooter && <div className={styles.footer}>{footerContent}</div>}
      </div>
    </div>
  );
}

export default TaleView;
