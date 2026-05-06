import { useState } from "react";
import bannerImg from "./assets/law.jpg";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("");

  const [playerName, setPlayerName] = useState("");
  const [numTeams, setNumTeams] = useState(2);
  const [teams, setTeams] = useState(["", "", "", ""]);

  const [scores, setScores] = useState([0, 0, 0, 0]);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [usedQuestions, setUsedQuestions] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  const categories = ["Treaties", "Customary Law", "War", "Law of the Sea"];
  const values = [200, 400, 600, 800];

  const questions = [
    // Treaties
    { id: 1, category: "Treaties", value: 200, question: "What is a treaty in international law?", answer: "A treaty is a formal written agreement between states that creates legally binding obligations under international law." },
    { id: 2, category: "Treaties", value: 400, question: "What is the difference between a bilateral treaty and a multilateral treaty?", answer: "A bilateral treaty is between two parties, while a multilateral treaty is between more than two parties." },
    { id: 3, category: "Treaties", value: 600, question: "What are the three main steps required before a treaty becomes legally binding?", answer: "Adoption, signature, and ratification." },
    { id: 4, category: "Treaties", value: 800, question: "If a state claims that circumstances have changed after signing a treaty, what legal doctrine may it rely on?", answer: "The doctrine of fundamental change of circumstances." },

    // Customary Law
    { id: 5, category: "Customary Law", value: 200, question: "What are the two elements required to establish customary international law?", answer: "General state practice and opinio juris." },
    { id: 6, category: "Customary Law", value: 400, question: "What does the term 'opinio juris' mean in international law?", answer: "It means that states follow a practice because they believe they are legally required to do so." },
    { id: 7, category: "Customary Law", value: 600, question: "What is the persistent objector rule in customary international law?", answer: "A state may avoid being bound by a customary rule if it objected clearly and consistently while the rule was forming." },
    { id: 8, category: "Customary Law", value: 800, question: "Why was the Nicaragua case important in relation to customary international law?", answer: "Because a rule can bind a state as customary law even if it is not bound by a treaty." },

    // War
    { id: 9, category: "War", value: 200, question: "What is the difference between jus ad bellum and jus in bello?", answer: "Jus ad bellum concerns when force may be used, while jus in bello regulates how war is conducted." },
    { id: 10, category: "War", value: 400, question: "Under Article 2(4) of the UN Charter, what are states prohibited from doing?", answer: "States are prohibited from using or threatening to use force against another state." },
    { id: 11, category: "War", value: 600, question: "What are the two main legal exceptions to the prohibition on the use of force?", answer: "Self-defense under Article 51 and authorization by the UN Security Council." },
    { id: 12, category: "War", value: 800, question: "Is preventive self-defense generally considered lawful under international law?", answer: "No, unless there is an imminent threat." },

    // Law of the Sea
    { id: 13, category: "Law of the Sea", value: 200, question: "What is a baseline in the law of the sea?", answer: "It is the starting line from which a state measures its maritime zones." },
    { id: 14, category: "Law of the Sea", value: 400, question: "How far does the territorial sea extend from the baseline?", answer: "Up to 12 nautical miles." },
    { id: 15, category: "Law of the Sea", value: 600, question: "What rights does a coastal state have in the Exclusive Economic Zone (EEZ)?", answer: "Control over economic resources such as fishing, oil, and gas up to 200 nautical miles." },
    { id: 16, category: "Law of the Sea", value: 800, question: "What is the difference between innocent passage and transit passage?", answer: "Innocent passage is peaceful navigation through territorial waters, while transit passage allows continuous passage through international straits." }
  ];

  return (
    <div style={containerStyle}>

      {/* HOME (UPDATED ONLY HERE) */}
      {screen === "home" && (
        <>
          <h1 style={titleStyle}>International Law Jeopardy</h1>

          <img src={bannerImg} style={imageStyle} />

          <div style={homeContent}>
            <button style={buttonStyle} onClick={() => {
              setMode("single");
              setScreen("single");
            }}>
              Single Player
            </button>

            <button style={buttonStyle} onClick={() => {
              setMode("multi");
              setScreen("multi");
            }}>
              Multiplayer
            </button>
          </div>
        </>
      )}

      {/* SINGLE */}
      {screen === "single" && (
        <>
          <h2>Enter Your Name</h2>

          <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={inputStyle}
          />

          <button
            style={buttonStyle}
            onClick={() => {
              if (playerName.trim()) setScreen("game");
              else alert("Enter your name");
            }}
          >
            Start Game
          </button>

          <button style={buttonStyle} onClick={() => setScreen("home")}>
            Back
          </button>
        </>
      )}

      {/* MULTI */}
      {screen === "multi" && (
        <>
          <h2>Multiplayer Setup</h2>

          <select
            value={numTeams}
            onChange={(e) => setNumTeams(Number(e.target.value))}
            style={inputStyle}
          >
            <option value={2}>2 Teams</option>
            <option value={3}>3 Teams</option>
            <option value={4}>4 Teams</option>
          </select>

          {[...Array(numTeams)].map((_, i) => (
            <input
              key={i}
              placeholder={`Team ${i + 1}`}
              value={teams[i]}
              onChange={(e) => {
                const t = [...teams];
                t[i] = e.target.value;
                setTeams(t);
              }}
              style={inputStyle}
            />
          ))}

          <button
            style={buttonStyle}
            onClick={() => {
              const valid = teams.slice(0, numTeams).every(t => t.trim());
              if (valid) setScreen("game");
              else alert("Enter all team names");
            }}
          >
            Start Game
          </button>

          <button style={buttonStyle} onClick={() => setScreen("home")}>
            Back
          </button>
        </>
      )}

      {/* GAME */}
      {screen === "game" && !currentQuestion && !gameEnded && (
        <>
          <h2>International Law Jeopardy</h2>

          <div style={{ marginBottom: "20px" }}>
            {mode === "single" ? (
              <div>{playerName}: {scores[0]}</div>
            ) : (
              [...Array(numTeams)].map((_, i) => (
                <div key={i}>{teams[i]}: {scores[i]}</div>
              ))
            )}
          </div>

          <div style={gridStyle}>
            {categories.map(cat => (
              <div key={cat} style={categoryStyle}>{cat}</div>
            ))}

            {values.map(val =>
              categories.map(cat => {
                const q = questions.find(q => q.category === cat && q.value === val);
                const used = usedQuestions.includes(q.id);

                return (
                  <button
                    key={q.id}
                    disabled={used}
                    onClick={() => setCurrentQuestion(q)}
                    style={{
                      ...cellStyle,
                      opacity: used ? 0.3 : 1
                    }}
                  >
                    ${val}
                  </button>
                );
              })
            )}
          </div>

          <button style={buttonStyle} onClick={() => setGameEnded(true)}>
            End Game
          </button>
        </>
      )}

      {/* QUESTION */}
      {currentQuestion && (
  <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center"
  }}>
          <h2>{currentQuestion.question}</h2>

          {!submitted && (
            <>
              <input
                placeholder="Type your answer..."
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                style={inputStyle}
              />

              <button style={buttonStyle} onClick={() => setSubmitted(true)}>
                Submit Answer
              </button>
            </>
          )}

          {submitted && (
            <>
              <h3>Your Answer: {answerText}</h3>
              <h3>Correct Answer: {currentQuestion.answer}</h3>

              {mode === "single" ? (
                <button
                  style={buttonStyle}
                  onClick={() => {
                    const newScores = [...scores];
                    newScores[0] += currentQuestion.value;
                    setScores(newScores);
                    finish();
                  }}
                >
                  ✅ Correct
                </button>
              ) : (
                [...Array(numTeams)].map((_, i) => (
                  <button
                    key={i}
                    style={buttonStyle}
                    onClick={() => {
                      const newScores = [...scores];
                      newScores[i] += currentQuestion.value;
                      setScores(newScores);
                      finish();
                    }}
                  >
                    {teams[i]} Correct
                  </button>
                ))
              )}

              <button style={buttonStyle} onClick={finish}>
                ❌ Wrong
              </button>
            </>
          )}
        </div>
      )}

      {/* FINAL */}
      {gameEnded && (
        <div style={{ textAlign: "center" }}>
          <h2>Final Scores</h2>

          {mode === "single" ? (
            <div>{playerName}: {scores[0]}</div>
          ) : (
            [...Array(numTeams)].map((_, i) => (
              <div key={i}>{teams[i]}: {scores[i]}</div>
            ))
          )}

          <button style={buttonStyle} onClick={() => window.location.reload()}>
            Back to Start
          </button>
        </div>
      )}

    </div>
  );

  function finish() {
    setUsedQuestions([...usedQuestions, currentQuestion.id]);
    setCurrentQuestion(null);
    setAnswerText("");
    setSubmitted(false);
  }
}

/* STYLES */

const containerStyle = {
  background: "radial-gradient(circle at top, #003366, #001f3f)",
  minHeight: "100vh",
  width: "100%",
  color: "#FFD700",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontFamily: "Trebuchet MS"
};

const titleStyle = {
  fontSize: "42px",
  textShadow: "0 0 15px gold",
  marginTop: "30px"
};

const imageStyle = {
  width: "500px",
  maxWidth: "90%",
  border: "3px solid gold",
  borderRadius: "10px",
  marginTop: "20px"
};

const homeContent = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "center",
  marginTop: "20px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 180px)",
  gap: "15px"
};

const categoryStyle = {
  textAlign: "center",
  fontWeight: "bold"
};

const cellStyle = {
  height: "110px",
  background: "#0074D9",
  color: "#FFD700",
  fontSize: "24px",
  border: "2px solid gold",
  borderRadius: "10px"
};

const buttonStyle = {
  padding: "14px 40px",
  fontSize: "18px",
  margin: "10px",
  background: "#0074D9",
  color: "#FFD700",
  border: "2px solid gold",
  cursor: "pointer"
};

const inputStyle = {
  padding: "10px",
  margin: "10px",
  textAlign: "center"
};
const questionContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  textAlign: "center"
};