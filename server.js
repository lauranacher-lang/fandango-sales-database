export default async function handler(req, res) {
  const APPS_SCRIPT_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnT3c2Fq8lyzz14znASb8FL6VV3-KJGHQVqEcD78WFKN_x0mDbZ05m2msTrX4EKez2UY-JDOvQqenCaRSfY_AafYDcqzPmq1Vn3nFEq19nEkcBhu8GqOOHE8YOF9fa0kWb0wCLE3zL7P96N0czBu9AZWWeKda7OBsyllJbxZWYBC_t5hT4eoP5Q0Ld2HQKGxBbat5QVgGi99YTO_iMGL9yR3pfilvNsnHW5B6Dr8nNDq6XwOq_0NV0Bu_OXWvc4fgQBh-Kuqku5k5NnTO37Gh1jKaJr4wQ&lib=M35mnJW96LB7gYUuIVOUOPefSiK4m_T-y";

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    try {
      const response = await fetch(APPS_SCRIPT_URL);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
