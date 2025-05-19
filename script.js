const USE_MOCK = true; // 改为 false 则使用真实 API
const API_KEY = "YOUR_OPENAI_API_KEY"; // 替换为你的 API Key

async function getAIResponse() {
  const userText = document.getElementById("userInput").value;
  const lang = document.getElementById("replyLang").value;
  const aiFeedback = document.getElementById("aiFeedback");

  aiFeedback.innerText = "AI 助手正在思考中，请稍候...";

  const prompt = `
你是一个语言学习助手。用户输入了一段目标语言的文案，请你提供以下反馈，用${lang}回复：

1. 必须修改的错误（语法、词汇、其他）；
2. 可改可不改的建议（语序、用词自然度等）；
3. 整体评价与改进建议（从语法、词汇、自然度角度）；

用户原文如下：
"${userText}"
`;

  if (USE_MOCK) {
    // 模拟数据，适合本地调试
    const mockResponse = `
1. 必须修改的错误：
- \"améliorer mon français\" 中的语法是正确的，无需修改。

2. 可改可不改的建议：
- 可将 \"Je voudrais\" 改为 \"J'aimerais\"，听起来更自然。

3. 整体评价与建议：
语法和词汇基本正确。建议多练习自然表达方式，例如用母语者常用的表达来替换正式或书面语言。
`;
    aiFeedback.innerText = mockResponse;
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    aiFeedback.innerText = data.choices[0].message.content;
  } catch (error) {
    aiFeedback.innerText = "❌ 出现错误，请检查网络或 API Key 设置。";
    console.error("API Error:", error);
  }
}
