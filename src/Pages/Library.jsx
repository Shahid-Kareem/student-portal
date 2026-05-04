import React, { useState } from "react";
import "./Library.css";
import Topbar from '../Components/Topbar'
import {library} from '../Data/Library';
import Card from "../Components/Card";
import CardHeader from "../Components/CardHeader";

const Library = () => {
  const [search, setSearch] = useState("");

  const catalog = [
    { title: "Conceptual Physics", author: "Hewitt", cat: "Science", available: true },
    { title: "Python Crash Course", author: "Matthes", cat: "Programming", available: false },
    { title: "To Kill a Mockingbird", author: "Harper Lee", cat: "Fiction", available: true },
    { title: "A Brief History of Time", author: "Hawking", cat: "Science", available: true },
    { title: "The Alchemist", author: "Coelho", cat: "Fiction", available: true },
    { title: "Clean Code", author: "Robert Martin", cat: "Programming", available: true },
    { title: "Surely You're Joking", author: "Feynman", cat: "Science", available: true },
    { title: "Atomic Habits", author: "James Clear", cat: "Self-Help", available: false },
    { title: "1984", author: "George Orwell", cat: "Fiction", available: true },
    { title: "Pakistan Studies", author: "Official Textbook", cat: "Academics", available: true },
  ];

  const filtered = catalog.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.cat.toLowerCase().includes(search.toLowerCase())
  );
  // ✅ FINE SYSTEM
const FINE_PER_DAY = 10;

// get overdue books
const overdueBooks = library.filter(b => b.status === "overdue");

// total fine
const totalFine = overdueBooks.reduce((total, book) => {
  return total + (book.daysLate || 1) * FINE_PER_DAY;
}, 0);

  return (
    <>
       <Topbar 
        page="library" 
        pageTitles={{ library: "Library" }} 
      />
    <div className="library-page">

      {/* STATS */}
      <div className="stats-grid">
        <StatCard label="Borrowed" value={library.filter(b => b.status !== "returned").length} icon="📚" color="var(--accent)" />
        <StatCard label="Returned" value={library.filter(b => b.status === "returned").length} icon="✅" color="var(--success)" />
        <StatCard label="Overdue" value={library.filter(b => b.status === "overdue").length} icon="⚠️" color="var(--danger)" />
        <StatCard label="Fine" value={`PKR. ${totalFine}`} icon="💸" color="var(--warn)" />
      </div>

      {/* MAIN SECTION */}
      <div className="main-grid">

        {/* MY BOOKS */}
        <Card>
          <CardHeader title="📖 My Books" />
          {library.map((b, i) => (
            <div key={i} className="book-row">
              <div className="book-icon">📘</div>

              <div className="book-info">
                <div className="title">{b.title}</div>
                <div className="author">by {b.author}</div>
                <div className="meta">
                  Issued: {b.issued} · Due: {b.due}
                </div>
              </div>

              <span className={`status ${b.status}`}>
                {b.status === "ok" ? "✓ On Time" :
                 b.status === "overdue" ? "⚠ Overdue" :
                 "↩ Returned"}
              </span>
            </div>
          ))}
        </Card>

        {/* RIGHT SIDE */}
        <div className="right-side">

          <Card>
            <CardHeader title="🔍 Recommended Books" />
            {catalog.slice(0,4).map((b, i) => (
              <div key={i} className="rec-row">
                <div className="rec-icon">📕</div>
                <div className="rec-info">
                  <div>{b.title}</div>
                  <span>{b.author} · {b.cat}</span>
                </div>
                <button className="btn">Reserve</button>
              </div>
            ))}
          </Card>

          <div className="fine-box">
            <div className="fine-title">📚 Overdue Fine</div>
            <p>
              You have <strong>{overdueBooks.length}</strong> overdue book(s).  
              Fine: <strong>PKR {totalFine}</strong> <br/>
              <strong>Per Day Fine:</strong> PKR 10 for each book.
            </p>
          </div>

        </div>
      </div>

      {/* SEARCH */}
      <Card>
        <CardHeader title="🔍 Search Library Catalog" />

        <input
          className="search-input"
          placeholder="Search by Title, Author, or Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="catalog-grid">
          {(search ? filtered : catalog).map((b, i) => (
            <div key={i} className="catalog-item">
              <div className="catalog-icon">📗</div>

              <div className="catalog-info">
                <div>{b.title}</div>
                <span>{b.author} · {b.cat}</span>

                <div className={b.available ? "available" : "not-available"}>
                  {b.available ? "✓ Available" : "✗ Borrowed"}
                </div>
              </div>

              {b.available && <button className="btn">Reserve</button>}
            </div>
          ))}
        </div>

        {search && filtered.length === 0 && (
          <div className="no-results">No books found</div>
        )}
      </Card>

    </div>
    </>
  );
};

// reusable stat card
const StatCard = ({ label, value, icon, color }) => (
  <div className="stat-card">
    <div className="icon">{icon}</div>
    <div>
      <h3 style={{ color }}>{value}</h3>
      <p>{label}</p>
    </div>
  </div>

);

export default Library;