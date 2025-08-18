import React, { useState } from "react";
import { courses } from "../data/courses";
import "./Courses.css";

const Courses = () => {
  const [filters, setFilters] = useState([]);

  const categories = [...new Set(courses.map((course) => course.category))];

  const handleFilterClick = (category) => {
    setFilters((prevFilters) => {
      if (prevFilters.includes(category)) {
        return prevFilters.filter((filter) => filter !== category);
      } else {
        return [...prevFilters, category];
      }
    });
  };

  const filteredCourses =
    filters.length === 0
      ? courses
      : courses.filter((course) => filters.includes(course.category));

  return (
    <section id="courses" className="courses-section">
      <div className="courses-container">
        <h1 className="courses-title">Courses</h1>
        <p className="courses-description">
          Here are some of the courses I've taken. You can filter them by
          category.
        </p>
        <div className="courses-filter-buttons">
          <button
            className={`filter-button ${filters.length === 0 ? "active" : ""}`}
            onClick={() => setFilters([])}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-button ${
                filters.includes(category) ? "active" : ""
              }`}
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="courses-grid">
          {filteredCourses.map((course, index) => (
            <div key={index} className="course-card">
              <div className="course-icon">{course.icon}</div>
              <h2 className="course-card-title">{course.title}</h2>
              <p className="course-card-description">{course.description}</p>
              <a
                href={course.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="course-certificate-link"
              >
                View Certificate
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
