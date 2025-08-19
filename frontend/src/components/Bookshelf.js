import React, { useEffect, useMemo, useState } from 'react';
import books from '../data/books';
import './Bookshelf.css';

function normalizeSessions(sessions, totalPages) {
  if (!Array.isArray(sessions)) return [];
  const cleaned = sessions
    .map(entry => {
      let from = Number(entry.from);
      let to = Number(entry.to);
      if (!Number.isFinite(from) || !Number.isFinite(to)) return null;
      if (from > to) [from, to] = [to, from];
      from = Math.max(1, Math.min(from, totalPages || Infinity));
      to = Math.max(1, Math.min(to, totalPages || Infinity));
      return { from, to };
    })
    .filter(Boolean);
  return cleaned;
}

function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];
  const sortedByStart = intervals.slice().sort((a, b) => a.from - b.from || a.to - b.to);
  const merged = [];
  for (const current of sortedByStart) {
    if (merged.length === 0) {
      merged.push({ ...current });
      continue;
    }
    const last = merged[merged.length - 1];
    if (current.from <= last.to + 1) {
      last.to = Math.max(last.to, current.to);
    } else {
      merged.push({ ...current });
    }
  }
  return merged;
}

function getBookStats(book) {
  const totalPages = Number(book.totalPages) || 0;
  const sessions = normalizeSessions(book.sessions || [], totalPages);
  const merged = mergeIntervals(sessions);
  const uniquePagesRead = merged.reduce((sum, range) => sum + (range.to - range.from + 1), 0);
  const percent = totalPages > 0 ? Math.min(100, Math.round((uniquePagesRead / totalPages) * 100)) : 0;
  const currentPage = sessions.length > 0 ? Math.max(...sessions.map(s => s.to)) : 0;
  return { totalPages, sessions, merged, uniquePagesRead, percent, currentPage };
}

function parsePublicationDate(input) {
  if (!input) return null;
  // Accepts 'YYYY', 'YYYY-MM', or 'YYYY-MM-DD'
  const normalized = String(input).trim();
  if (/^\d{4}$/.test(normalized)) return new Date(Number(normalized), 0, 1);
  if (/^\d{4}-\d{2}$/.test(normalized)) {
    const [y, m] = normalized.split('-').map(Number);
    return new Date(y, m - 1, 1);
  }
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d;
}

const statusOrder = { reading: 0, planned: 1, finished: 2, paused: 3 };

const SearchIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="#192A56" strokeWidth="2" />
    <line x1="16.65" y1="16.65" x2="22" y2="22" stroke="#192A56" strokeWidth="2" />
  </svg>
);

const CalendarIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="#2F4F2F" strokeWidth="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9" stroke="#2F4F2F" strokeWidth="2"></line>
  </svg>
);

const AuthorIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2C9.79 2 8 3.79 8 6C8 8.21 9.79 10 12 10C14.21 10 16 8.21 16 6C16 3.79 14.21 2 12 2Z" stroke="#800020" strokeWidth="2"/>
    <path d="M4 22C4 18.6863 6.68629 16 10 16H14C17.3137 16 20 18.6863 20 22" stroke="#800020" strokeWidth="2"/>
  </svg>
);

const Bookshelf = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setSelectedBook(null);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const enriched = useMemo(() => {
    return (books || []).map(source => {
      const stats = getBookStats(source);
      const pubDate = parsePublicationDate(source.publicationDate);
      const computedStatus = source.status || (stats.percent >= 100 ? 'finished' : stats.percent > 0 ? 'reading' : 'planned');
      return { book: source, stats, pubDate, status: computedStatus };
    });
  }, []);

  const filteredAndSorted = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let working = enriched;
    if (statusFilter !== 'all') {
      working = working.filter(entry => entry.status === statusFilter);
    }
    if (q) {
      working = working.filter(entry => {
        const { title, author, description } = entry.book;
        return (
          (title || '').toLowerCase().includes(q) ||
          (author || '').toLowerCase().includes(q) ||
          (description || '').toLowerCase().includes(q)
        );
      });
    }

    const compare = (a, b) => {
      if (sortBy === 'title') {
        return a.book.title.localeCompare(b.book.title);
      }
      if (sortBy === 'author') {
        return a.book.author.localeCompare(b.book.author);
      }
      if (sortBy === 'date') {
        const at = a.pubDate ? a.pubDate.getTime() : 0;
        const bt = b.pubDate ? b.pubDate.getTime() : 0;
        return at - bt;
      }
      if (sortBy === 'progress') {
        return a.stats.percent - b.stats.percent;
      }
      if (sortBy === 'status') {
        return (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
      }
      return 0;
    };

    const sorted = working.slice().sort(compare);
    if (sortDir === 'desc') sorted.reverse();
    return sorted;
  }, [enriched, searchQuery, statusFilter, sortBy, sortDir]);

  const currentlyReading = useMemo(() => {
    return enriched
      .filter(entry => entry.status === 'reading')
      .sort((a, b) => b.stats.percent - a.stats.percent)
      .slice(0, 5);
  }, [enriched]);

  return (
    <div className="bookshelf-page px-6 py-28">
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <header className="mb-8">
          <h1 className="section-heading ui-font text-3xl md:text-4xl">My Bookshelf</h1>
        </header>

        <div className="filter-bar mb-6">
          <div className="control" role="search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search by title, author, or description"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search books"
            />
          </div>
          <div className="control ui-font">
            <label htmlFor="status" className="sr-only">Filter status</label>
            <select id="status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Filter by status">
              <option value="all">All statuses</option>
              <option value="reading">Currently reading</option>
              <option value="planned">Planned</option>
              <option value="finished">Finished</option>
              <option value="paused">Paused</option>
            </select>
          </div>
          <div className="control ui-font">
            <label htmlFor="sort" className="sr-only">Sort</label>
            <select id="sort" value={`${sortBy}:${sortDir}`} onChange={e => {
              const [by, dir] = e.target.value.split(':');
              setSortBy(by);
              setSortDir(dir);
            }} aria-label="Sort books">
              <option value="date:desc">Newest first</option>
              <option value="date:asc">Oldest first</option>
              <option value="author:asc">Author A→Z</option>
              <option value="author:desc">Author Z→A</option>
              <option value="title:asc">Title A→Z</option>
              <option value="title:desc">Title Z→A</option>
              <option value="progress:desc">Progress high→low</option>
              <option value="progress:asc">Progress low→high</option>
              <option value="status:asc">Status</option>
            </select>
          </div>
        </div>

        <div className="bookshelf-layout">
          <section>
            <div className="books-grid" aria-live="polite">
              {filteredAndSorted.map(({ book, stats, pubDate, status }) => {
                const hasCover = Boolean(book.cover);
                const initial = (book.title || '?').charAt(0).toUpperCase();
                const year = pubDate ? String(pubDate.getFullYear()) : '—';
                return (
                  <article key={book.id} className="book-card" onClick={() => setSelectedBook({ book, stats, pubDate, status })}>
                    <div className="book-cover" aria-hidden="true">
                      {hasCover ? (
                        <img src={book.cover} alt="" loading="lazy" />
                      ) : (
                        <div className="placeholder-initial ui-font" aria-hidden>{initial}</div>
                      )}
                    </div>
                    <div className="book-meta">
                      <div className="ui-font book-title">{book.title}</div>
                      <div className="book-author flex items-center gap-1"><AuthorIcon /><span>{book.author}</span></div>
                      {book.description && (
                        <p className="book-description mt-1">{book.description}</p>
                      )}
                      <div className="book-date mt-1 flex items-center gap-1"><CalendarIcon /><span>{year}</span></div>
                      <div className="mt-2">
                        <div className="progress-outer" aria-label={`Progress ${stats.percent}%`} role="progressbar" aria-valuenow={stats.percent} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-inner" style={{ width: `${stats.percent}%` }} />
                        </div>
                        <div className="book-date mt-1">{stats.uniquePagesRead}/{stats.totalPages} • {stats.percent}%</div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="sidebar" aria-label="Currently reading">
            <h2 className="section-heading ui-font text-xl">Currently Reading</h2>
            {currentlyReading.length === 0 ? (
              <p className="book-description mt-3">No active books. Select a book to begin.</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {currentlyReading.map(({ book, stats }) => (
                  <li key={`cr-${book.id}`} className="item" onClick={() => setSelectedBook({ book, stats })}>
                    <div className="thumb" aria-hidden>
                      {book.cover ? <img src={book.cover} alt="" loading="lazy" /> : null}
                    </div>
                    <div>
                      <div className="ui-font font-semibold">{book.title}</div>
                      <div className="book-author">{book.author}</div>
                      <div className="progress-outer mt-1">
                        <div className="progress-inner" style={{ width: `${stats.percent}%` }} />
                      </div>
                      <div className="book-date mt-1">Page {stats.currentPage} of {stats.totalPages}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>

      {selectedBook && (
        <div className="bs-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setSelectedBook(null); }} role="dialog" aria-modal="true">
          <div className="bs-modal" aria-labelledby="modal-title">
            <header>
              <div>
                <div id="modal-title" className="ui-font text-xl font-bold">{selectedBook.book.title}</div>
                <div className="book-author">{selectedBook.book.author}</div>
              </div>
              <button className="pill ui-font" onClick={() => setSelectedBook(null)} aria-label="Close modal">Close</button>
            </header>
            <div className="content">
              <div className="grid md:grid-cols-3 gap-4 items-start">
                <div>
                  <div className="book-cover" aria-hidden>
                    {selectedBook.book.cover ? (
                      <img src={selectedBook.book.cover} alt="" />
                    ) : (
                      <div className="placeholder-initial ui-font">{(selectedBook.book.title || '?').charAt(0).toUpperCase()}</div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedBook.pubDate && (
                      <span className="pill"><CalendarIcon size={14} /><span>{selectedBook.pubDate.getFullYear()}</span></span>
                    )}
                    <span className="pill">{selectedBook.status}</span>
                    <span className="pill">{selectedBook.stats.uniquePagesRead}/{selectedBook.stats.totalPages} • {selectedBook.stats.percent}%</span>
                  </div>
                  {selectedBook.book.review && (
                    <p className="mt-3">{selectedBook.book.review}</p>
                  )}
                  {Array.isArray(selectedBook.book.quotes) && selectedBook.book.quotes.length > 0 && (
                    <div className="mt-4">
                      <div className="ui-font font-semibold">Key Quotes</div>
                      <ul className="mt-1 space-y-2">
                        {selectedBook.book.quotes.map((q, i) => (
                          <li key={`q-${i}`} className="quote">“{q}”</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-4">
                    <div className="ui-font font-semibold">Progress</div>
                    <div className="progress-outer mt-1">
                      <div className="progress-inner" style={{ width: `${selectedBook.stats.percent}%` }} />
                    </div>
                    <div className="book-date mt-1">Page {selectedBook.stats.currentPage} of {selectedBook.stats.totalPages}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookshelf;

