import React, { useEffect, useState } from "react";
import { GrMoney } from "react-icons/gr";

const financialTips = [
  {
    tip: "Live below your means",
    quote:
      "Do not save what is left after spending, but spend what is left after saving.",
    author: "Warren Buffett",
    meaning: "Always save first, then spend to build wealth over time.",
  },
  {
    tip: "Invest in knowledge",
    quote: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
    meaning: "Education and skills provide lifelong financial returns.",
  },
  {
    tip: "Think long-term",
    quote:
      "If you aren't willing to own a stock for 10 years, don’t think about owning it for 10 minutes.",
    author: "Warren Buffett",
    meaning: "Avoid short-term thinking and focus on long-term gains.",
  },
  {
    tip: "Control your spending habits",
    quote:
      "It’s not your salary that makes you rich, it’s your spending habits.",
    author: "Charles A. Jaffe",
    meaning: "Wealth comes from discipline, not just income.",
  },
  {
    tip: "Be patient in investing",
    quote:
      "The stock market is a device for transferring money from the impatient to the patient.",
    author: "Warren Buffett",
    meaning: "Patience is key to growing wealth.",
  },
  {
    tip: "Avoid speculation",
    quote:
      "The individual investor should act consistently as an investor and not as a speculator.",
    author: "Benjamin Graham",
    meaning: "Invest based on research, not gambling.",
  },
  {
    tip: "Don’t try to time the market",
    quote: "Don’t try to buy at the bottom and sell at the top.",
    author: "Bernard Baruch",
    meaning: "Consistency beats trying to predict market movements.",
  },
  {
    tip: "Understand risk",
    quote: "Risk comes from not knowing what you’re doing.",
    author: "Warren Buffett",
    meaning: "Knowledge reduces financial risk.",
  },
  {
    tip: "Stay rational, not emotional",
    quote:
      "Be fearful when others are greedy, and greedy when others are fearful.",
    author: "Warren Buffett",
    meaning: "Think independently instead of following the crowd.",
  },
  {
    tip: "Focus on long-term value",
    quote: "Price is what you pay; value is what you get.",
    author: "Benjamin Graham",
    meaning: "Look for real value, not just low prices.",
  },
];

const FinancialTips = () => {
  const [showQuote, setShowQuote] = useState(financialTips[0]);

  useEffect(() => {
    setInterval(() => {
      setShowQuote(
        financialTips[Math.floor(Math.random() * financialTips.length)],
      );
    }, 5000);
  });
  const { tip, quote, author, meaning } = showQuote;
  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{
        height: "100%",
      }}
    >
      <div className="mb-5">
        <GrMoney className="text-success" style={{ fontSize: "10rem" }} />
        <div>Watch your Money Grow!</div>
      </div>
      <h4>{tip}</h4>
      <div className="fw-bolder mb-4">
        "{quote}" - {author}
      </div>
      <p className="fw-bolder">{meaning}</p>
    </div>
  );
};

export default FinancialTips;
