export const fetchSportData = async (endpoint) => {
    try {
        const res = await fetch(
            `https://api.sportmonks.com/v3/${endpoint}?api_token=${process.env.NEXT_PUBLIC_SPORTMONKS_API_KEY}`
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching SportMonks data:", error);
        return null;
    }
};
