export default async function handler(req, res) {
    console.log("cron job running");
    console.log(process.env.CRON_API);
    const response = await fetch(`https://tbo-api.niyi.com.ng/api/health-check`, {
        method: "GET",
        headers: {
            "Content-Type": "text/json",
        },
    });
    console.log(response);
    const data = await response.json();
    console.log("🚀 ~ handler ~ data:", data)
    res.status(200).end("Hello Cron!");
}
