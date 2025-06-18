import { useState, useEffect } from 'react';
import styles from './News.module.scss';
import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner';

const RSS_FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/sport/football/rss.xml';

type FootballNewsProps = {
    title: string;
    link: string;
    guid: string;
    thumbnail: string;
    description: string;
    pubDate: string;
};

const FootballNews = () => {
    const [news, setNews] = useState<FootballNewsProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(RSS_FEED_URL)
            .then((response) => response.json())
            .then((data) => {
                setNews(data.items);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching RSS feed:', error);
                setError('No football data available');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles["newsContainer"]}>
            <h1 className="title title--fs24">BBC Sport Football News</h1>
            <div className={styles["newsGrid"]}>
                {news.map((item) => (
                    <article className={styles["newsItem"]} key={item.guid}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className={styles["newsImage"]}
                            />
                            <div className={styles.newsDetails}>
                                <h3 className={styles['newsDetails__newsDetailsTitle']}>{item.title}</h3>
                                <p className={styles['newsDetails__newsDetailsDescription']}>{item.description}</p>
                            </div>
                            <h4 className={styles["pubDate"]}>{item.pubDate}</h4>
                        </a>

                    </article>
                ))}
            </div>
        </div>
    );
};

export default FootballNews;
