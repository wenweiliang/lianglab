
async function loadNews() {
    const container = document.querySelector(
        "#latest-news, #all-news"
    );

    if (!container) return;

    try {
        const response = await fetch("news.json");
        if (!response.ok) throw new Error("Failed to load news");

        const news = await response.json();

        news.sort((a, b) => b.date.localeCompare(a.date));

        const latestOnly = container.id === "latest-news";
        const items = latestOnly ? news.slice(0, 2) : news;

        container.replaceChildren();

        for (const item of items) {
            const article = document.createElement("article");
            article.className = "news-item";

            const date = document.createElement("p");
            date.className = "small";
            date.textContent = new Date(
                item.date + "T12:00:00"
            ).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric"
            });

            const title = document.createElement("h3");
            title.textContent = item.title;

            const description = document.createElement("p");
            description.textContent = item.description;


            article.append(date, title, description);

            // Show photos only on the full News page
            if (!latestOnly && item.image) {
                const img = document.createElement("img");

                img.src = item.image;
                img.alt = item.alt || item.title;
                img.className = "news-image";
                img.loading = "lazy";

                article.appendChild(img);
            }

            container.appendChild(article);
        }
    } catch (error) {
        container.textContent = "News is temporarily unavailable.";
        console.error(error);
    }
}

loadNews();
