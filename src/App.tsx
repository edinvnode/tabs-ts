import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import "./styles.css";

const url = "https://course-api.com/react-tabs-project";

// Define a type for the job data
interface Job {
  id: string;
  order: number;
  title: string;
  dates: string;
  duties: string[];
  company: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [value, setValue] = useState<number>(0);

  const fetchJobs = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newJobs: Job[] = await response.json();
      setJobs(newJobs);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }

  // Ensure jobs[value] exists before destructuring
  const { company, dates, duties, title } = jobs[value] || {};

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`job-btn ${index === value ? "active-btn" : ""}`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        {title && (
          <article className="job-info">
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className="job-date">{dates}</p>
            {duties.map((duty, index) => {
              return (
                <div key={index} className="job-desc">
                  <FaAngleDoubleRight className="job-icon" />
                  <p>{duty}</p>
                </div>
              );
            })}
          </article>
        )}
      </div>
    </section>
  );
}

export default App;
