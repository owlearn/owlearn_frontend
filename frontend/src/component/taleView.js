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
  return Math.min(Math.max(1, page), total);
};

export default function TaleView({
  title = "",
  contents = [],
  imageUrls = [],
  initialPage = DEFAULT_INITIAL_PAGE,
  imageSrcBuilder = (src) => src,
  onPageChange,
  onReachEnd,
  renderFooter,
}) {
  const totalPages = contents.length;
  const [page, setPage] = useState(clampPage(initialPage, totalPages));

  useEffect(() => {
    setPage(clampPage(initialPage, totalPages));
  }, [initialPage, totalPages]);

  useEffect(() => {
    if (onPageChange) onPageChange(page, totalPages);
    if (page === totalPages && onReachEnd) onReachEnd();
  }, [page, totalPages]);

  const normalizedContents = useMemo(
    () => contents.map((p) => formatParagraph(p)),
    [contents]
  );
  const currentContent = normalizedContents[page - 1] ?? "";

  /* 이미지 */
  const rawImage = imageUrls[page - 1];
  const imageSrc = rawImage ? imageSrcBuilder(rawImage) : null;

  /* 모르는 단어 */
  const [selectedWords, setSelectedWords] = useState([]);

  const toggleWord = (w) =>
    setSelectedWords((prev) =>
      prev.includes(w) ? prev.filter((x) => x !== w) : [...prev, w]
    );

  const removeWord = (w) =>
    setSelectedWords((prev) => prev.filter((x) => x !== w));

  const wordSpans = useMemo(() => {
    if (!currentContent) return null;

    return currentContent.split(/\s+/).map((token, i) => {
      const clean = token.replace(/[.,!?;:]/g, "").trim();
      const punctuation = token.match(/[.,!?;:]+$/)?.[0] ?? "";
      const isSelected = selectedWords.includes(clean);

      return (
        <span key={i} className={styles.wordWrapper}>
          <span
            className={`${styles.word} ${
              isSelected ? styles.wordSelected : ""
            }`}
            onClick={() => toggleWord(clean)}
          >
            {clean}
          </span>
          {punctuation}{" "}
        </span>
      );
    });
  }, [currentContent, selectedWords]);

  /* 페이지 네비 */
  const goPrev = () => page > 1 && setPage(page - 1);
  const goNext = () => page < totalPages && setPage(page + 1);

  const nav = (
    <div className={styles.pageNav}>
      <button className={styles.arrow} onClick={goPrev} disabled={page <= 1}>
        <IoIosArrowBack />
      </button>

      <span className={styles.pageIndicator}>
        {page}/{totalPages}
      </span>

      <button
        className={styles.arrow}
        onClick={goNext}
        disabled={page >= totalPages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );

  const footerContent = renderFooter
    ? renderFooter({ page, totalPages })
    : null;

  return (
    <div className={styles.page}>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.contentRow}>

        <div className={styles.leftWrapper}>

          <div className={styles.imageCard}>
            {imageSrc && <img src={imageSrc} className={styles.image} alt="" />}

            <div className={styles.textBox}>
              <p className={styles.storyText}>{wordSpans}</p>
            </div>
          </div>

          <div className={styles.bottomControls}>
            {nav}
            {footerContent}
          </div>

        </div>

        <div className={styles.wordPanelWrapper}>
          <div className={styles.wordPanel}>

            <div className={styles.wordPanelTitle}>⭐ 모르는 단어 모음</div>

            <p className={styles.wordGuide}>
              문장을 읽다가 이해하기 어려운 단어를 클릭해 보세요.
              <br />
              체크한 단어는 여기에서 한 번에 볼 수 있어요.
            </p>

            <div className={styles.wordListWrapper}>
              {selectedWords.length === 0 ? (
                <div className={styles.wordHint}>아직 체크한 단어가 없어요.</div>
              ) : (
                selectedWords.map((w) => (
                  <div key={w} className={styles.wordItem}>
                    <span>{w}</span>
                    <span
                      className={styles.wordRemove}
                      onClick={() => removeWord(w)}
                    >
                      ✕
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className={styles.wordHintBox}>
              💡 같은 단어를 다시 클릭하면 목록에서 제거돼요.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
