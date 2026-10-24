import { useMemo, useState, useEffect } from 'react';
import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { ratingBreakdown, reviews as seedReviews } from '../../data/reviews.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { shortDate } from '../../lib/format.js';
import './CustomerReviews.css';

const PER_PAGE = 5;
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
  const [product, setProduct] = useState('tank');
  const [fit, setFit] = useState('true');
  const [text, setText] = useState('');

  const productLabels = {
    tank: t('reviews_section.form_product_options.tank'),
    short: t('reviews_section.form_product_options.short'),
    long: t('reviews_section.form_product_options.long'),
    pack: t('reviews_section.form_product_options.pack'),
  };

  const fitLabels = {
    true: t('reviews_section.form_fit_true'),
    small: t('reviews_section.form_fit_small'),
    large: t('reviews_section.form_fit_large'),
  };

  const ratingLabels = t('reviews_section.form_rating_labels') || [];
  const activeRating = hoverRating || rating;
  const ratingText = ratingLabels[activeRating - 1] || `${activeRating}/5`;

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({
      id: `rev-${Date.now()}`,
      name: name.trim() || (lang === 'fr' ? 'Client Vérifié' : 'Verified Customer'),
      rating,
      title: title.trim() || (lang === 'fr' ? 'Très satisfait' : 'Highly satisfied'),
      text: text.trim(),
      product: productLabels[product] || '',
      fit: fitLabels[fit] || '',
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

      <div className="review-form__grid">
        <div className="review-form__field">
          <label className="review-form__label">{t('reviews_section.form_product')}</label>
          <select value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value="tank">{productLabels.tank}</option>
            <option value="short">{productLabels.short}</option>
            <option value="long">{productLabels.long}</option>
            <option value="pack">{productLabels.pack}</option>
          </select>
        </div>
        <div className="review-form__field">
          <label className="review-form__label">{t('reviews_section.form_fit')}</label>
          <select value={fit} onChange={(e) => setFit(e.target.value)}>
            <option value="true">{fitLabels.true}</option>
            <option value="small">{fitLabels.small}</option>
            <option value="large">{fitLabels.large}</option>
          </select>
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
  const product = getVal(r.product, lang);
  const fit = getVal(r.fit, lang);
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

      {(product || fit) && (
        <div className="review__tags">
          {product && <span className="review__tag review__tag--product">{product}</span>}
          {fit && <span className="review__tag review__tag--fit">{fit}</span>}
        </div>
      )}

      <p className="review__text">{text}</p>

      {photos.length > 0 && (
        <div className="review__photos">
          {photos.map((src, i) => (
            <button
              type="button"
              key={i}
              className="review__photo-btn"
              onClick={() => onPhotoClick({ src, name: r.name, title })}
              title={t('reviews_section.photo_preview')}
            >
              <img src={src} alt={`${r.name} review photo ${i + 1}`} loading="lazy" />
              <span className="review__photo-zoom" aria-hidden="true">
                <Icon name="zoom" size={14} />
              </span>
            </button>
          ))}
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
  const [page, setPage] = useState(0);
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
        const product = getVal(r.product, lang).toLowerCase();
        if (!name.includes(q) && !title.includes(q) && !text.includes(q) && !product.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [list, starFilter, photosOnly, search, lang]);

  const sorted = useMemo(() => {
    return [...filtered].sort(sorters[sort] || sorters.recent);
  }, [filtered, sort]);

  const pages = Math.ceil(sorted.length / PER_PAGE);
  const visible = sorted.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const addReview = (r) => {
    setList((l) => [r, ...l]);
    setSort('recent');
    setStarFilter(null);
    setPhotosOnly(false);
    setSearch('');
    setPage(0);
    setWriting(false);
    setSuccessMessage(t('reviews_section.form_success'));
    setTimeout(() => setSuccessMessage(''), 6000);
  };

  const handleHelpful = (id) => {
    if (votedMap[id]) return;
    setVotedMap((prev) => ({ ...prev, [id]: true }));
  };

  const changePage = (p) => {
    setPage(p);
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const clearAllFilters = () => {
    setStarFilter(null);
    setPhotosOnly(false);
    setSearch('');
    setPage(0);
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
                    setPage(0);
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
                setPage(0);
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
              setPage(0);
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
              setPage(0);
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
              <button type="button" onClick={() => setStarFilter(null)} aria-label="Supprimer filtre">
                <Icon name="close" size={11} />
              </button>
            </span>
          )}
          {photosOnly && (
            <span className="reviews__chip">
              {t('reviews_section.filter_photos')}
              <button type="button" onClick={() => setPhotosOnly(false)} aria-label="Supprimer filtre">
                <Icon name="close" size={11} />
              </button>
            </span>
          )}
          {search.trim() && (
            <span className="reviews__chip">
              « {search} »
              <button type="button" onClick={() => setSearch('')} aria-label="Supprimer filtre">
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

      {/* Pagination */}
      {pages > 1 && (
        <nav className="pager" aria-label={t('reviews_section.page_label')}>
          <button
            type="button"
            className="pager__nav"
            disabled={page === 0}
            onClick={() => changePage(page - 1)}
            aria-label="Précédent"
          >
            ‹
          </button>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={i === page ? 'is-active' : ''}
              onClick={() => changePage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            className="pager__nav"
            disabled={page === pages - 1}
            onClick={() => changePage(page + 1)}
            aria-label="Suivant"
          >
            ›
          </button>
        </nav>
      )}

      {/* Photo Lightbox Modal */}
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
            <img
              src={activePhoto.src}
              alt={activePhoto.title || activePhoto.name}
              className="reviews__modal-img"
            />
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
