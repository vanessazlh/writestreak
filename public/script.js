const USE_MOCK = false;

async function getAIResponse() {
  const userText = document.getElementById("userInput").value;
  const lang = document.getElementById("replyLang").value;
  const aiFeedback = document.getElementById("aiFeedback");
  const targetLang = document.getElementById("targetLang")

  aiFeedback.innerText = "AI 正在思考...";

  const prompt = `
You are a ${targetLang} languge teacher, please proofread my writing and provide feedback in ${lang}.

"${userText}"

`;

  try {
    const res = await fetch("http://localhost:3000/api/rewrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    console.log("AI response data:", data);

    if (data.choices && data.choices[0]) {
      aiFeedback.innerText = data.choices[0].message.content;
    } else if (data.error) {
      aiFeedback.innerText = "出错：" + data.error.message;
    } else {
      aiFeedback.innerText = "⚠️ AI 没有返回有效内容，请稍后再试。";
    }
  } catch (error) {
    console.error("Fetch 错误：", error);
    aiFeedback.innerText = "出现错误，请检查网络或服务器状态。";
  }
}
