"use client";

import { useEffect, useState } from "react";
import styles from "./ClubHistory.module.scss";
import LoadingSpinner from "@components/ui/LoadingSpinner/LoadingSpinner";
import { BookOpen, Clock, MapPin } from "lucide-react";

type Props = {
  clubName: string;
};

export const ClubHistory = ({ clubName }: Props) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [foundedYear, setFoundedYear] = useState<string | null>(null);
  const [stadium, setStadium] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubDescription = async () => {
      try {
        setLoading(true);

        // Spróbuj wyszukać z "F.C."
        let searchQuery = `${clubName} F.C.`;
        let searchRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
            searchQuery
          )}&format=json&origin=*`
        );
        let searchData = await searchRes.json();

        let pageTitle = searchData?.query?.search?.[0]?.title;

        // Jeśli nie znaleziono strony, spróbuj bez "F.C."
        if (!pageTitle) {
          searchQuery = clubName;
          searchRes = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
              searchQuery
            )}&format=json&origin=*`
          );
          searchData = await searchRes.json();
          pageTitle = searchData?.query?.search?.[0]?.title;
        }

        if (!pageTitle) {
          setDescription("No matching page found.");
          return;
        }

        const summaryRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            pageTitle
          )}`
        );
        const summaryData = await summaryRes.json();

        setDescription(summaryData.extract || "No description available.");

        const foundedMatch = summaryData.extract?.match(
          /[Ff]ounded in (\d{4})/
        );
        if (foundedMatch ?? foundedMatch[1]) {
          setFoundedYear(foundedMatch[1]);
        }
        const stadiumMatch = summaryData.extract?.match(
          /home (?:games|matches) at ([A-Za-z\s]+)/
        );
        if (stadiumMatch ?? stadiumMatch[1]) {
          setStadium(stadiumMatch[1].trim());
        }
      } catch (error) {
        console.error("Failed to fetch club description:", error);
        setDescription("Could not load club description.");
      } finally {
        setLoading(false);
      }
    };

    fetchClubDescription();
  }, [clubName]);
  
  return (
    <div className={styles.historyCard}>
      <div className={styles.header}>
        <BookOpen className={styles.icon} />
        <h2>Club History</h2>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.mainText}>
            <p>{description}</p>
          </div>

          {(foundedYear || stadium) && (
            <div className={styles.highlights}>
              {foundedYear && (
                <div className={styles.highlight}>
                  <Clock className={styles.highlightIcon} />
                  <div>
                    <span className={styles.label}>Founded</span>
                    <span className={styles.value}>{foundedYear}</span>
                  </div>
                </div>
              )}

              {stadium && (
                <div className={styles.highlight}>
                  <MapPin className={styles.highlightIcon} />
                  <div>
                    <span className={styles.label}>Home</span>
                    <span className={styles.value}>{stadium}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
