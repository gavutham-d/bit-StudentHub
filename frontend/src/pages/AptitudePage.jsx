import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const questions = {
  quant: [
    {
      q: "A train 120m long crosses a pole in 12 seconds. What is the speed of the train in km/h?",
      opts: ["A) 30 km/h", "B) 36 km/h", "C) 40 km/h", "D) 48 km/h"],
      answer: 1,
      exp: "Speed = Distance / Time = 120/12 = 10 m/s. Convert: 10 × 18/5 = 36 km/h.",
    },
    {
      q: "If 15 workers can complete a project in 20 days, how many workers are needed to complete it in 12 days?",
      opts: ["A) 20", "B) 22", "C) 25", "D) 30"],
      answer: 2,
      exp: "Work = 15 × 20 = 300 worker-days. Workers needed = 300 / 12 = 25.",
    },
    {
      q: "The ratio of milk to water in a mixture is 3:2. If 10 litres of water is added, the ratio becomes 3:4. Find the initial quantity of milk.",
      opts: ["A) 10 L", "B) 12 L", "C) 15 L", "D) 18 L"],
      answer: 2,
      exp: "Let milk = 3x, water = 2x. After adding 10L water: 3x/(2x+10) = 3/4 → 12x = 6x+30 → x=5. Milk = 15L.",
    },
    {
      q: "A shopkeeper sells an item at 20% profit. If the cost price was ₹500, what is the selling price?",
      opts: ["A) ₹550", "B) ₹575", "C) ₹600", "D) ₹620"],
      answer: 2,
      exp: "SP = CP × (1 + P/100) = 500 × 1.20 = ₹600.",
    },
    {
      q: "Find the LCM of 12, 18, and 24.",
      opts: ["A) 48", "B) 60", "C) 72", "D) 96"],
      answer: 2,
      exp: "12 = 2²×3, 18 = 2×3², 24 = 2³×3. LCM = 2³×3² = 72.",
    },
  ],
  logical: [
    {
      q: "If all Roses are Flowers and some Flowers are Red, which conclusion is definitely true?",
      opts: [
        "A) All roses are red",
        "B) Some roses are red",
        "C) Some flowers are roses",
        "D) All flowers are roses",
      ],
      answer: 2,
      exp: "All roses are flowers → some flowers are roses. This is the valid reverse inference.",
    },
    {
      q: "In a series 2, 6, 18, 54, __, what comes next?",
      opts: ["A) 108", "B) 144", "C) 162", "D) 216"],
      answer: 2,
      exp: "Each term is multiplied by 3. 54 × 3 = 162.",
    },
    {
      q: "ABCD is a square. A is north of B. C is east of B. Where is D relative to A?",
      opts: ["A) East", "B) West", "C) South", "D) North-east"],
      answer: 0,
      exp: "In the square: B is south of A, C is east of B (south-east of A), D is north of C and east of A.",
    },
    {
      q: "If 'GRAPE' is coded as 'ITCRI', how is 'LEMON' coded?",
      opts: ["A) NGOQP", "B) NGOPQ", "C) NFOPQ", "D) NHOPQ"],
      answer: 0,
      exp: "Each letter is shifted +2 positions: L→N, E→G, M→O, O→Q, N→P. Answer: NGOQP.",
    },
    {
      q: "Five people A, B, C, D, E sit in a row. A is to the left of B, C is to the right of B, D is to the left of A, and E is to the right of C. What is the order?",
      opts: ["A) D A B C E", "B) A D B C E", "C) D B A C E", "D) E C B A D"],
      answer: 0,
      exp: "Building the order: D is left of A, A is left of B, B is left of C, C is left of E → D A B C E.",
    },
  ],
  verbal: [
    {
      q: "Choose the word most similar in meaning to 'BENEVOLENT':",
      opts: ["A) Malicious", "B) Charitable", "C) Ignorant", "D) Aggressive"],
      answer: 1,
      exp: "'Benevolent' means kind and generous. 'Charitable' is the closest synonym.",
    },
    {
      q: "Select the correctly spelt word:",
      opts: ["A) Accomodate", "B) Accommodate", "C) Acomodate", "D) Acommodate"],
      answer: 1,
      exp: "The correct spelling is 'Accommodate' — double 'c' and double 'm'.",
    },
    {
      q: "Fill in the blank: She was __ about the exam results, expecting the worst.",
      opts: ["A) Optimistic", "B) Elated", "C) Apprehensive", "D) Confident"],
      answer: 2,
      exp: "'Apprehensive' means anxious or worried, which matches 'expecting the worst'.",
    },
    {
      q: "Identify the error: 'He don't know the answer to the question.'",
      opts: [
        "A) He don't",
        "B) know the",
        "C) answer to",
        "D) the question",
      ],
      answer: 0,
      exp: "'Don't' should be 'doesn't' because the subject 'He' is singular third-person.",
    },
    {
      q: "Choose the antonym of 'VERBOSE':",
      opts: ["A) Wordy", "B) Loquacious", "C) Concise", "D) Garrulous"],
      answer: 2,
      exp: "'Verbose' means using too many words. 'Concise' is its antonym, meaning brief and clear.",
    },
  ],
};

const TAB_LABELS = {
  quant: "Quantitative Aptitude",
  logical: "Logical Reasoning",
  verbal: "Verbal Ability",
};

export default function AptitudePage() {
  const [activeTab, setActiveTab] = useState("quant");
  const [revealed, setRevealed] = useState({});

  const toggleReveal = (key) => {
    setRevealed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentQuestions = questions[activeTab];

  return (
    <>
      <div className="page-section-title">Aptitude Learning Hub</div>
      <div className="page-section-sub">
        Practice curated mock questions across all three sections.
      </div>

      {/* Tabs */}
      <div className="aptitude-tabs">
        {Object.entries(TAB_LABELS).map(([key, label]) => (
          <button
            key={key}
            className={`aptitude-tab${activeTab === key ? " active" : ""}`}
            onClick={() => {
              setActiveTab(key);
              setRevealed({});
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Score indicator */}
      <div style={{
        background: "white",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-md)",
        padding: "14px 20px",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "var(--shadow-card)",
      }}>
        <span style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 500 }}>
          📚 {TAB_LABELS[activeTab]} — {currentQuestions.length} Questions
        </span>
        <span style={{
          background: "var(--brand-light)",
          color: "var(--brand-primary)",
          fontSize: 12,
          fontWeight: 700,
          padding: "4px 10px",
          borderRadius: 20,
        }}>
          {Object.keys(revealed).filter((k) => k.startsWith(activeTab) && revealed[k]).length} / {currentQuestions.length} Revealed
        </span>
      </div>

      {/* Questions */}
      {currentQuestions.map((q, i) => {
        const key = `${activeTab}-${i}`;
        const isRevealed = revealed[key];

        return (
          <div className="question-card" key={key}>
            <div className="question-number">Q{i + 1}</div>
            <div className="question-text">{q.q}</div>

            <div className="options-list">
              {q.opts.map((opt, oi) => (
                <div
                  key={oi}
                  className={`option-item${isRevealed && oi === q.answer ? " correct" : ""}`}
                >
                  {isRevealed && oi === q.answer && (
                    <CheckCircle2
                      size={14}
                      style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }}
                    />
                  )}
                  {opt}
                </div>
              ))}
            </div>

            <button className="answer-btn" onClick={() => toggleReveal(key)}>
              {isRevealed ? "Hide Answer" : "Reveal Answer"}
            </button>

            {isRevealed && (
              <div className="answer-explanation">
                <strong>Explanation:</strong> {q.exp}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
