import { useMemo, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { ratingBreakdown, reviewSummary, reviews as seedReviews } from '../../data/reviews.js';
import { shortDate } from '../../lib/format.js';
import './CustomerReviews.css';

const PER_PAGE = 5;
const total = ratingBreakdown.reduce((n, r) => n + r.count, 0);

const sorters = {
  recent: (a, b) => b.date.localeCompare(a.date),
  high: (a, b) => b.rating - a.rating,
  low: (a, b) => a.rating - b.rating,
  photos: (a, b) => b.photos - a.photos,
};

function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ name: name.trim() || 'Anonymous', rating, text: text.trim(), date: new Date().toISOString().slice(0, 10), photos: 0 });
  };
  return (
    <form className="review-form" onSubmit={submit}>
      <div className="review-form__stars">
        {[1, 2, 3, 4, 5].map((n) => (
          <button type="button" key={n} className={n <= rating ? 'is-on' : ''} onClick={() => setRating(n)} aria-label={`${n} stars`}>
            ★
          </button>
        ))}
      </div>
      <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="How do they feel?" rows={3} value={text} onChange={(e) => setText(e.target.value)} required />
      <button className="btn btn--dark">Submit review</button>
    </form>
  );
}

function Review({ r }) {
  return (
    <article className="review">
      <Stars value={r.rating} size={16} />
      <header>
        <span className="review__avatar">{r.name[0]}</span>
        <strong>{r.name}</strong>
        <em>
          <Icon name="check" size={11} strokeWidth={3} /> Verified
        </em>
        <time>{shortDate(r.date)}</time>
      </header>
      <p>{r.text}</p>
      {r.photos > 0 && (
        <div className="review__photos">
          {Array.from({ length: r.photos }, (_, i) => (
            <span key={i} style={{ '--h': (r.name.length * 37 + i * 50) % 360 }} />
          ))}
        </div>
      )}
    </article>
  );
}

export default function CustomerReviews() {
  const [list, setList] = useState(seedReviews);
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(0);
  const [writing, setWriting] = useState(false);

  const sorted = useMemo(() => {
    const filtered = sort === 'photos' ? list.filter((r) => r.photos > 0) : list;
    return [...filtered].sort(sorters[sort]);
  }, [list, sort]);
  const pages = Math.ceil(sorted.length / PER_PAGE);
  const visible = sorted.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const addReview = (r) => {
    setList((l) => [r, ...l]);
    setSort('recent');
    setPage(0);
    setWriting(false);
  };

  return (
    <section className="reviews container" id="reviews">
      <h2 className="reviews__title">Customer Reviews</h2>

      <div className="reviews__summary">
        <div className="reviews__score">
          <b>4.8</b>
          <Stars value={4.8} size={20} />
          <span>{total.toLocaleString('en-US')} reviews</span>
        </div>
        <ul className="reviews__bars">
          {ratingBreakdown.map((r) => (
            <li key={r.stars}>
              <span>{r.stars}★</span>
              <i>
                <i style={{ width: `${(r.count / total) * 100}%` }} />
              </i>
              <span>{r.count}</span>
            </li>
          ))}
        </ul>
        <div className="reviews__actions">
          <button className="btn btn--gold" onClick={() => setWriting((w) => !w)}>
            {writing ? 'Cancel' : 'Write a review'}
          </button>
          <label className="select">
            <select value={sort} onChange={(e) => (setSort(e.target.value), setPage(0))} aria-label="Sort reviews">
              <option value="recent">Most recent</option>
              <option value="high">Highest rating</option>
              <option value="low">Lowest rating</option>
              <option value="photos">Only pictures</option>
            </select>
            <Icon name="chevron" size={14} />
          </label>
        </div>
      </div>

      {writing && <ReviewForm onSubmit={addReview} />}

      <div className="reviews__ai">
        <strong>Customers say</strong>
        <p>{reviewSummary}</p>
      </div>

      <div className="reviews__list">
        {visible.map((r, i) => (
          <Review key={r.name + r.date + i} r={r} />
        ))}
      </div>

      {pages > 1 && (
        <nav className="pager" aria-label="Review pages">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} className={i === page ? 'is-active' : ''} onClick={() => setPage(i)}>
              {i + 1}
            </button>
          ))}
        </nav>
      )}
    </section>
  );
}
