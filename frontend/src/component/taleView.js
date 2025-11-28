import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./taleView.module.css";

export default function TaleView({
  title,
  contents = [],
  imageUrls = [],
  imageSrcBuilder,
  onPageChange,
  onFinish,
  isLastPage,
}) {
  const totalPages = contents.length;
  const [page, setPage] = useState(1);
  const [selectedWords, setSelectedWords] = useState([]);

  useEffect(() => {
    onPageChange && onPageChange(page, totalPages);
  }, [page]);

  const goPrev = () => page > 1 && setPage(page - 1);
  const goNext = () => page < totalPages && setPage(page + 1);

  const current = contents[page - 1] || "";
  const image = imageUrls[page - 1]
    ? imageSrcBuilder(imageUrls[page - 1])
    : null;

  const words = current.split(/\s+/).map((token, i) => {
    const clean = token.replace(/[.,!?;]/g, "");
    const selected = selectedWords.includes(clean);

    return (
      <span key={i} className={styles.wordWrapper}>
        <span
          className={`${styles.word} ${selected ? styles.wordSelected : ""}`}
          onClick={() =>
            setSelectedWords((prev) =>
              prev.includes(clean)
                ? prev.filter((v) => v !== clean)
                : [...prev, clean]
            )
          }
        >
          {clean}
        </span>{" "}
      </span>
    );
  });

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.contentRow}>
        {/* LEFT: 이미지 */}
        <div className={styles.leftColumn}>
          <div className={styles.imageCard}>
            {image && <img src={image} className={styles.image} />}

            {/* 이미지 위 화살표 */}
            <div className={styles.imageNav}>
              <button
                className={styles.arrow}
                onClick={goPrev}
                disabled={page <= 1}
              >
                <IoIosArrowBack />
              </button>

              <div className={styles.pageBadge}>
                {page}/{totalPages}
              </div>

              <button
                className={styles.arrow}
                onClick={goNext}
                disabled={page >= totalPages}
              >
                <IoIosArrowForward />
              </button>
            </div>

            <div className={styles.textBox}>
              <p className={styles.storyText}>{words}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: 단어장 + FINISH */}
        <div className={styles.wordPanelWrapper}>
          <div className={styles.wordPanel}>
            <div className={styles.wordPanelTitle}>⭐ 모르는 단어 모음</div>

            <p className={styles.wordGuide}>
              문장을 읽다가 이해하기 어려운 단어를 클릭해 보세요.
              <br />
              체크한 단어는 여기에서 모아볼 수 있어요.
            </p>

            {/* 🔥 스크롤 영역 */}
            <div className={styles.wordListWrapper}>
              {selectedWords.length === 0 ? (
                <div className={styles.wordHint}>
                  아직 체크한 단어가 없어요.
                </div>
              ) : (
                selectedWords.map((w) => (
                  <div key={w} className={styles.wordItem}>
                    {w}
                    <span
                      className={styles.wordRemove}
                      onClick={() =>
                        setSelectedWords((prev) => prev.filter((v) => v !== w))
                      }
                    >
                      ✕
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className={styles.wordHintBox}>
              💡 단어를 다시 클릭하면 목록에서 사라져요.
            </div>

            {/* 🔥 패널 하단 고정 FINISH 버튼 */}
            <button
              className={`${styles.finishBtn} ${
                isLastPage ? styles.finishActive : styles.finishDisabled
              }`}
              disabled={!isLastPage}
              onClick={onFinish}
            >
              FINISH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
