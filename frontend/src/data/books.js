const books = [
  {
    id: 'database-internals',
    title: 'Database Internals',
    author: 'Alex Petrov',
    totalPages: 370,
    publicationDate: '2019-10-15',
    status: 'reading',
    cover: 'https://covers.openlibrary.org/b/isbn/1492040347-L.jpg',
    description: 'A deep dive into the foundations of storage engines, replication, and distributed systems in modern databases.',
    review: 'Meticulous and practical; the replication chapters clarified nuances I had previously glossed over.',
    quotes: [
      'Distributed systems are fundamentally about managing and minimizing uncertainty.',
      'Replication is a spectrum of trade-offs between latency, throughput, and consistency.'
    ],
    sessions: [
      { from: 1, to: 25 },
      { from: 26, to: 60 }
    ]
  },
  {
    id: 'ddia',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    totalPages: 616,
    publicationDate: '2017-03-16',
    status: 'reading',
    cover: 'https://covers.openlibrary.org/b/isbn/1449373321-L.jpg',
    description: 'Foundational patterns and trade-offs for building reliable, scalable, maintainable systems.',
    review: 'A modern classic that unifies concepts across storage, stream processing, and distributed design with unusual clarity.',
    quotes: [
      'The biggest cause of outages is not hardware failure but human error.',
      'Data systems are moving from batch to stream; the boundary is increasingly blurred.'
    ],
    sessions: [
      { from: 1, to: 30 },
    ]
  },
  {
    id: 'sicp',
    title: 'Structure and Interpretation of Computer Programs',
    author: 'Harold Abelson, Gerald Jay Sussman, Julie Sussman',
    totalPages: 657,
    publicationDate: '1996-07-25',
    status: 'planned',
    cover: 'https://covers.openlibrary.org/b/isbn/0262510871-L.jpg',
    description: 'A rigorous exploration of abstraction, metalinguistic programming, and interpreters.',
    review: 'Plan: Work through exercises to deepen understanding of evaluation and abstraction.',
    quotes: [
      'Programs must be written for people to read, and only incidentally for machines to execute.'
    ],
    sessions: []
  },
  {
    id: 'clean-architecture',
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    totalPages: 432,
    publicationDate: '2017-09-20',
    status: 'paused',
    cover: 'https://covers.openlibrary.org/b/isbn/0134494164-L.jpg',
    description: 'Design principles and boundaries for building maintainable software systems.',
    review: 'Good survey of boundaries and dependency rules; pausing to apply ideas in a side project before continuing.',
    quotes: [
      'A good architecture allows decisions to be deferred for as long as possible.'
    ],
    sessions: [
      { from: 1, to: 10 }
    ]
  },
  {
    id: 'pragmatic-programmer',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    totalPages: 352,
    publicationDate: '1999-10-30',
    status: 'finished',
    cover: 'https://covers.openlibrary.org/b/isbn/020161622X-L.jpg',
    description: 'Practical tips and timeless practices for effective software craftsmanship.',
    review: 'Still relevant decades later; the emphasis on automation and feedback loops remains essential.',
    quotes: [
      'Care and feeding of gurus is a delicate art.',
      'Program for today and design for tomorrow.'
    ],
    sessions: [
      { from: 1, to: 2 }
    ]
  }
];

export default books;


