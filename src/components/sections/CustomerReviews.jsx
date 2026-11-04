import { useMemo, useState, useEffect } from 'react';
import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { ratingBreakdown, reviews as seedReviews } from '../../data/reviews.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { shortDate } from '../../lib/format.js';
import './CustomerReviews.css';

const REVIEWS_PER_PAGE = 5;
const total = ratingBreakdown.reduce((n, r) => n + r.count, 0);

const sorters = {
  recent: (a, b) => b.date.localeCompare(a.date),
  high: (a, b) => b.rating - a.rating,
  low: (a, b) => a.rating - b.rating,
  helpful: (a, b) => (b.helpful || 0) - (a.helpful || 0),
  photos: (a, b) => (b.photos?.length || 0) - (a.photos?.length || 0),
};

function getVal(field, lang) {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.fr || field.en || '';
}

function ReviewForm({ onSubmit, onCancel, lang, t }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const ratingLabels = t('reviews_section.form_rating_labels') || [];
  const activeRating = hoverRating || rating;
  const ratingText = ratingLabels[activeRating - 1] || `${activeRating}/5`;

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({
      id: `rev-${Date.now()}`,
      name: name.trim() || (lang === 'fr' ? 'Client vérifié' : 'Verified Customer'),
      rating,
      title: title.trim() || (lang === 'fr' ? 'Très satisfait' : 'Highly satisfied'),
      text: text.trim(),
      date: new Date().toISOString().slice(0, 10),
      photos: [],
      verified: true,
      helpful: 1,
    });
  };

  return (
    <form className="review-form" onSubmit={submit}>
      <div className="review-form__header">
        <h3>{t('reviews_section.form_heading')}</h3>
        <button
          type="button"
          className="review-form__close"
          onClick={onCancel}
          aria-label={t('reviews_section.cancel')}
        >
          <Icon name="close" size={16} />
        </button>
      </div>

      <div className="review-form__rating-group">
        <label className="review-form__label">{t('reviews_section.form_rating')}</label>
        <div className="review-form__stars-row">
          <div className="review-form__stars" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                className={n <= activeRating ? 'is-on' : ''}
                onMouseEnter={() => setHoverRating(n)}
                onClick={() => setRating(n)}
                aria-label={t('reviews_section.stars_label', { n })}
              >
                ★
              </button>
            ))}
          </div>
          <span className="review-form__rating-caption">{ratingText}</span>
        </div>
      </div>

      <div className="review-form__grid">
        <div className="review-form__field">
          <label className="review-form__label">{t('reviews_section.form_title')}</label>
          <input
            placeholder={t('reviews_section.form_title_placeholder')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="review-form__field">
          <label className="review-form__label">{t('reviews_section.form_name')}</label>
          <input
            placeholder={t('reviews_section.form_name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="review-form__field">
        <label className="review-form__label">{t('reviews_section.form_text')}</label>
        <textarea
          placeholder={t('reviews_section.form_text_placeholder')}
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div className="review-form__actions">
        <button type="submit" className="btn btn--gold">
          {t('reviews_section.form_submit')}
        </button>
        <button type="button" className="btn btn--text" onClick={onCancel}>
          {t('reviews_section.cancel')}
        </button>
      </div>
    </form>
  );
}

function Review({ r, lang, t, onHelpful, hasVoted, onPhotoClick }) {
  const title = getVal(r.title, lang);
  const text = getVal(r.text, lang);
  const photos = Array.isArray(r.photos) ? r.photos : [];

  return (
    <article className="review">
      <header className="review__header">
        <div className="review__author">
          <span className="review__avatar" aria-hidden="true">
            {r.name ? r.name.charAt(0).toUpperCase() : 'V'}
          </span>
          <div className="review__author-info">
            <strong className="review__author-name">{r.name}</strong>
            {r.verified !== false && (
              <span className="review__verified-badge">
                <Icon name="check" size={11} strokeWidth={3} /> {t('reviews_section.verified_buyer')}
              </span>
            )}
          </div>
        </div>
        <time className="review__date" dateTime={r.date}>
          {shortDate(r.date, lang)}
        </time>
      </header>

      <div className="review__rating-row">
        <Stars value={r.rating} size={15} />
        {title && <h3 className="review__headline">{title}</h3>}
      </div>

      <p className="review__text">{text}</p>

      {photos.length > 0 && (
        <div className="review__photos">
          {photos.map((src, i) => {
            const isVideo = src.endsWith('.mp4') || src.endsWith('.mov');
            return (
              <button
                type="button"
                key={i}
                className={`review__photo-btn ${isVideo ? 'review__photo-btn--video' : ''}`}
                onClick={() => onPhotoClick({ src, isVideo, name: r.name, title })}
                title={isVideo ? (lang === 'fr' ? 'Voir la vidéo client' : 'Watch customer video') : t('reviews_section.photo_preview')}
              >
                {isVideo ? (
                  <>
                    <video
                      src={`${src}#t=0.001`}
                      preload="metadata"
                      muted
                      playsInline
                      className="review__photo-thumb review__video-thumb"
                    />
                    <span className="review__photo-play" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </span>
                  </>
                ) : (
                  <>
                    <img src={src} alt={`${r.name} review media ${i + 1}`} loading="lazy" />
                    <span className="review__photo-zoom" aria-hidden="true">
                      <Icon name="zoom" size={14} />
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      )}

      <footer className="review__footer">
        <span className="review__helpful-prompt">{t('reviews_section.helpful_question')}</span>
        <button
          type="button"
          className={`review__helpful-btn ${hasVoted ? 'is-voted' : ''}`}
          onClick={() => onHelpful(r.id || r.name)}
          disabled={hasVoted}
          aria-label={t('reviews_section.helpful_yes')}
        >
          <Icon name="thumb" size={13} />
          <span>{hasVoted ? t('reviews_section.helpful_voted') : t('reviews_section.helpful_yes')}</span>
          <b className="review__helpful-count">({(r.helpful || 0) + (hasVoted ? 1 : 0)})</b>
        </button>
      </footer>
    </article>
  );
}

export default function CustomerReviews() {
  const { lang, t } = useLanguage();
  const [list, setList] = useState(seedReviews);
  const [sort, setSort] = useState('recent');
  const [starFilter, setStarFilter] = useState(null);
  const [photosOnly, setPhotosOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [writing, setWriting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [votedMap, setVotedMap] = useState({});
  const [activePhoto, setActivePhoto] = useState(null);

  // Close photo modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activePhoto) {
        setActivePhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  // Filtering
  const filtered = useMemo(() => {
    return list.filter((r) => {
      if (starFilter !== null && r.rating !== starFilter) {
        return false;
      }
      if (photosOnly) {
        const pLen = Array.isArray(r.photos) ? r.photos.length : (typeof r.photos === 'number' ? r.photos : 0);
        if (pLen <= 0) return false;
      }
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const name = (r.name || '').toLowerCase();
        const title = getVal(r.title, lang).toLowerCase();
        const text = getVal(r.text, lang).toLowerCase();
        if (!name.includes(q) && !title.includes(q) && !text.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [list, starFilter, photosOnly, search, lang]);

  const sorted = useMemo(() => {
    return [...filtered].sort(sorters[sort] || sorters.recent);
  }, [filtered, sort]);

  const totalPages = Math.ceil(sorted.length / REVIEWS_PER_PAGE) || 1;
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (safePage - 1) * REVIEWS_PER_PAGE;
  const endIndex = Math.min(startIndex + REVIEWS_PER_PAGE, sorted.length);
  const visible = sorted.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === safePage) return;
    setPage(newPage);
    const reviewsEl = document.getElementById('reviews');
    if (reviewsEl) {
      reviewsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safePage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (safePage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', safePage - 1, safePage, safePage + 1, '...', totalPages];
  };

  const addReview = (r) => {
    setList((l) => [r, ...l]);
    setSort('recent');
    setStarFilter(null);
    setPhotosOnly(false);
    setSearch('');
    setPage(1);
    setWriting(false);
    setSuccessMessage(t('reviews_section.form_success'));
    setTimeout(() => setSuccessMessage(''), 6000);
  };

  const handleHelpful = (id) => {
    if (votedMap[id]) return;
    setVotedMap((prev) => ({ ...prev, [id]: true }));
  };

  const clearAllFilters = () => {
    setStarFilter(null);
    setPhotosOnly(false);
    setSearch('');
    setPage(1);
  };

  return (
    <section className="reviews container" id="reviews">
      <div className="reviews__intro">
        <h2 className="reviews__title">{t('reviews_section.title')}</h2>
      </div>

      {successMessage && (
        <div className="reviews__success" role="status">
          <Icon name="check" size={16} strokeWidth={3} />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="reviews__summary">
        <div className="reviews__score">
          <b>4.9</b>
          <Stars value={4.9} size={22} />
          <span>
            {total.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')} {t('reviews_section.count_label')}
          </span>
        </div>

        <ul className="reviews__bars">
          {ratingBreakdown.map((r) => {
            const isSelected = starFilter === r.stars;
            const pct = ((r.count / total) * 100).toFixed(1);
            return (
              <li key={r.stars}>
                <button
                  type="button"
                  className={`reviews__bar-btn ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => {
                    setStarFilter((curr) => (curr === r.stars ? null : r.stars));
                    setPage(1);
                    setTimeout(() => {
                      const listEl = document.querySelector('.reviews__list') || document.querySelector('.reviews__toolbar');
                      if (listEl) {
                        listEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }
                    }, 50);
                  }}
                  title={lang === 'fr' ? `Filtrer par ${r.stars} étoiles` : `Filter by ${r.stars} stars`}
                >
                  <span className="reviews__bar-label">{r.stars}★</span>
                  <span className="reviews__bar-track">
                    <span className="reviews__bar-fill" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="reviews__bar-count">{r.count}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="reviews__actions">
          <button
            className={`btn ${writing ? 'btn--dark' : 'btn--gold'}`}
            onClick={() => setWriting((w) => !w)}
          >
            {writing ? t('reviews_section.cancel') : t('reviews_section.write_review')}
          </button>
          <label className="select">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              aria-label={lang === 'fr' ? 'Trier les avis' : 'Sort reviews'}
            >
              <option value="recent">{t('reviews_section.sort_recent')}</option>
              <option value="high">{t('reviews_section.sort_high')}</option>
              <option value="low">{t('reviews_section.sort_low')}</option>
              <option value="helpful">{t('reviews_section.sort_helpful')}</option>
              <option value="photos">{t('reviews_section.sort_photos')}</option>
            </select>
            <Icon name="chevron" size={14} />
          </label>
        </div>
      </div>

      {writing && (
        <ReviewForm
          onSubmit={addReview}
          onCancel={() => setWriting(false)}
          lang={lang}
          t={t}
        />
      )}

      <div className="reviews__ai">
        <div className="reviews__ai-head">
          <span className="reviews__ai-badge">
            <Icon name="sparkle" size={13} /> {t('reviews_section.ai_badge')}
          </span>
          <strong>{t('reviews_section.ai_title')}</strong>
        </div>
        <p className="reviews__ai-text">{t('reviews_section.ai_text')}</p>
        <div className="reviews__ai-tags">
          <span className="reviews__ai-tag">✓ {t('reviews_section.ai_tag_invisible')}</span>
          <span className="reviews__ai-tag">✓ {t('reviews_section.ai_tag_posture')}</span>
          <span className="reviews__ai-tag">✓ {t('reviews_section.ai_tag_breathable')}</span>
          <span className="reviews__ai-tag">✓ {t('reviews_section.ai_tag_returns')}</span>
          <span className="reviews__ai-tag">✓ {t('reviews_section.ai_tag_fit')}</span>
        </div>
      </div>
      {/* Toolbar: Search and Filter Chips */}
      <div className="reviews__toolbar">
        <div className="reviews__search">
          <Icon name="search" size={16} className="reviews__search-icon" />
          <input
            type="text"
            placeholder={t('reviews_section.search_placeholder')}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          {search && (
            <button
              type="button"
              className="reviews__search-clear"
              onClick={() => setSearch('')}
              aria-label="Effacer recherche"
            >
              <Icon name="close" size={14} />
            </button>
          )}
        </div>

        <div className="reviews__quick-filters">
          <button
            type="button"
            className={`reviews__filter-btn ${starFilter === null && !photosOnly ? 'is-active' : ''}`}
            onClick={clearAllFilters}
          >
            {t('reviews_section.filter_all')} ({total.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')})
          </button>
          <button
            type="button"
            className={`reviews__filter-btn ${photosOnly ? 'is-active' : ''}`}
            onClick={() => {
              setPhotosOnly((p) => !p);
              setPage(1);
            }}
          >
            📷 {t('reviews_section.filter_photos')}
          </button>
        </div>
      </div>

      {/* Active filter chip bar */}
      {(starFilter !== null || photosOnly || search.trim()) && (
        <div className="reviews__active-filters">
          <span className="reviews__active-label">{t('reviews_section.filter_active')}</span>
          {starFilter !== null && (
            <span className="reviews__chip">
              {starFilter}★ ({ratingBreakdown.find((b) => b.stars === starFilter)?.count || 0})
              <button type="button" onClick={() => { setStarFilter(null); setPage(1); }} aria-label="Supprimer filtre">
                <Icon name="close" size={11} />
              </button>
            </span>
          )}
          {photosOnly && (
            <span className="reviews__chip">
              {t('reviews_section.filter_photos')}
              <button type="button" onClick={() => { setPhotosOnly(false); setPage(1); }} aria-label="Supprimer filtre">
                <Icon name="close" size={11} />
              </button>
            </span>
          )}
          {search.trim() && (
            <span className="reviews__chip">
              « {search} »
              <button type="button" onClick={() => { setSearch(''); setPage(1); }} aria-label="Supprimer filtre">
                <Icon name="close" size={11} />
              </button>
            </span>
          )}
          <button type="button" className="reviews__chip-clear" onClick={clearAllFilters}>
            {t('reviews_section.filter_clear')}
          </button>
        </div>
      )}

      {/* Review List or Empty state */}
      {visible.length === 0 ? (
        <div className="reviews__empty">
          <p>{t('reviews_section.no_reviews')}</p>
          <button type="button" className="btn btn--secondary" onClick={clearAllFilters}>
            {t('reviews_section.reset_search')}
          </button>
        </div>
      ) : (
        <div className="reviews__list">
          {visible.map((r, i) => (
            <Review
              key={r.id || r.name + r.date + i}
              r={r}
              lang={lang}
              t={t}
              hasVoted={Boolean(votedMap[r.id || r.name])}
              onHelpful={handleHelpful}
              onPhotoClick={setActivePhoto}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="reviews__pagination">
          <p className="reviews__pagination-info">
            {t('reviews_section.showing_count', {
              from: startIndex + 1,
              to: endIndex,
              total: sorted.length,
            })}
          </p>
          <nav className="pager" aria-label={t('reviews_section.page_label')}>
            <button
              type="button"
              className="pager__nav pager__nav--prev"
              onClick={() => handlePageChange(safePage - 1)}
              disabled={safePage <= 1}
              aria-label={t('reviews_section.page_prev')}
              title={t('reviews_section.page_prev')}
            >
              <Icon name="chevronLeft" size={16} strokeWidth={2.2} />
            </button>

            <div className="pager__pages">
              {getPageNumbers().map((p, idx) => {
                if (p === '...') {
                  return (
                    <span key={`dots-${idx}`} className="pager__dots" aria-hidden="true">
                      …
                    </span>
                  );
                }
                const isCurrent = p === safePage;
                return (
                  <button
                    key={p}
                    type="button"
                    className={`pager__page ${isCurrent ? 'is-active' : ''}`}
                    onClick={() => handlePageChange(p)}
                    aria-current={isCurrent ? 'page' : undefined}
                    aria-label={t('reviews_section.page_number', { n: p })}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="pager__nav pager__nav--next"
              onClick={() => handlePageChange(safePage + 1)}
              disabled={safePage >= totalPages}
              aria-label={t('reviews_section.page_next')}
              title={t('reviews_section.page_next')}
            >
              <Icon name="chevronRight" size={16} strokeWidth={2.2} />
            </button>
          </nav>
        </div>
      )}

      {/* Photo / Video Lightbox Modal */}
      {activePhoto && (
        <div
          className="reviews__modal-overlay"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="reviews__modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="reviews__modal-close"
              onClick={() => setActivePhoto(null)}
              aria-label={t('reviews_section.close_modal')}
            >
              <Icon name="close" size={18} />
            </button>
            {activePhoto.isVideo || activePhoto.src?.endsWith('.mp4') || activePhoto.src?.endsWith('.mov') ? (
              <video
                ref={(el) => {
                  if (el) el.muted = true;
                }}
                src={activePhoto.src}
                muted
                loop
                controls
                autoPlay
                playsInline
                className="reviews__modal-video"
              />
            ) : (
              <img
                src={activePhoto.src}
                alt={activePhoto.title || activePhoto.name}
                className="reviews__modal-img"
              />
            )}
            <div className="reviews__modal-caption">
              <strong>{activePhoto.name}</strong>
              {activePhoto.title && <span> · {activePhoto.title}</span>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
