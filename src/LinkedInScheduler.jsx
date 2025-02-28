import React, { useState } from "react";
import axios from "axios";
import "./Scheduler.css";

const LinkedInScheduler = ({
    setScheduling,
    setScrapeTypeBtn,
    setMainScrape,
    setIsScraped,
    setIsSearchFilter,
    setIsScrapeData,
    setIsDashboard,
    setScheduler,
    setAfterSchedule,
    setScrapeNow,
    scheduler
}) => {
    const [form, setForm] = useState({ frequency: "daily" });

    const scheduleScraping = async () => {
        const token = localStorage.getItem("authToken") || "";

        if (!token) {
            alert("User not authenticated. Please log in.");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/api/schedule",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${String(token)}`, 
                    },
                }
            );

        if (response.status === 201) {
                alert("Scrape schedule saved successfully!");
            } else {
                alert("Failed to schedule scraping.");
            }
      } catch (error) {
            console.error("Error scheduling scraping:", error);
            alert(`Error: ${error.response?.data?.error || "Something went wrong!"}`);
        }

    };

    return (
        <>
            {scheduler && (
                <div className="scheduler-container">
                    <h1 className="scheduler-header">LinkedIn Scraper Scheduler</h1>

                    <label htmlFor="frequency" className="scheduler-form-label">
                        Frequency:
                    </label>
                    <select
                        id="frequency"
                        name="frequency"
                        value={form.frequency}
                        onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                        className="scheduler-form-input"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>

                    <button onClick={scheduleScraping} className="scheduler-button">
                        Save Schedule
                    </button>

                    <button
                        onClick={() => {
                            setIsScrapeData(true);
                            setIsSearchFilter(true);
                            setIsDashboard(true);
                            setScrapeTypeBtn(true);
                            setMainScrape(true);
                            setAfterSchedule(false);
                            setScrapeNow(false);
                            setScheduler(false);
                        }}
                        className="scheduler-button"
                    >
                        Back
                    </button>
                </div>
            )}
        </>
    );
};

export default LinkedInScheduler;
