import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: 'Who can participate in the AI Genius Olympiad?',
    answer: 'The Olympiad is open to students studying in Class 11 and Class 12.',
  },
  {
    question: 'Is the Olympiad free to enter?',
    answer: 'Yes, the AI Genius Olympiad is completely free to register and participate.',
  },
  {
    question: 'How does the competition work?',
    answer:
      'Students compete through timed online rounds that test problem-solving, AI concepts, and logical thinking, with top performers advancing to the national final.',
  },
  {
    question: 'What will I be tested on?',
    answer:
      "You'll be tested on AI fundamentals, mathematics, logical reasoning, and coding — the same skills covered throughout the Olympiad.",
  },
  {
    question: 'Is the exam online?',
    answer:
      'Yes, the first round is conducted entirely online so students from anywhere in India can participate.',
  },
  {
    question: 'What happens after Round 1?',
    answer: 'Top-ranking students from Round 1 are invited to compete in the offline national final.',
  },
];

export const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-28">
      <div className="w-full px-6 sm:px-10 lg:px-[120px] flex flex-col items-center gap-10 sm:gap-14 max-w-[1160px] mx-auto">
        <div className="flex flex-col items-center gap-4 sm:gap-5 text-center">
          <p className="font-grotesque font-semibold text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#0a0a0b]">
            Frequently asked <span className="text-[#e7000b]">questions</span>
          </p>
          <p className="font-grotesque text-base sm:text-lg text-[#0a0a0b]/80 max-w-[557px]">
            Everything you need to know before you register, prepare, and take on the challenge.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 w-full">
          {FAQS.map((faq, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={faq.question}
                onClick={() => setActiveIndex(isActive ? -1 : i)}
                className={`w-full px-5 sm:px-8 py-5 sm:py-6 cursor-pointer transition-colors duration-300 ${
                  isActive ? 'bg-[#151615]' : 'bg-[#f5f6f8]'
                }`}
              >
                <div className="flex items-start justify-between gap-4 sm:gap-6">
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <p
                      className={`font-grotesque font-medium text-lg sm:text-2xl ${
                        isActive ? 'text-white' : 'text-[#0a0a0b]'
                      }`}
                    >
                      {faq.question}
                    </p>
                    <div
                      className="grid transition-all duration-300 ease-out"
                      style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                    >
                      <p className="overflow-hidden font-grotesque text-base sm:text-xl text-white/80">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-center shrink-0 size-7 sm:size-8 border transition-colors duration-300 ${
                      isActive ? 'border-white' : 'border-[#0a0a0b]'
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? 'rotate-180 text-white' : 'text-[#0a0a0b]'
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
