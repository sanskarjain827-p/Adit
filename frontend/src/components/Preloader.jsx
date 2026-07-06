import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Two beats:
//  1) WORDS  — on a solid light screen a single word swaps in place, telling
//     the studio's story: Design → Build → Train → Grow → Insyd.
//  2) REVEAL — the screen (8 cols × 2 rows) splits each column at its centre —
//     top half up, bottom half down, in sync — uncovering home from the middle
//     out, column by column left→right ("double stairs").
const WORDS = ['Design', 'Build', 'Train', 'Grow', 'Insyd']
const WORD_MS = 620
const LAST_HOLD_MS = 650

const COLS = 8
const PANEL_DURATION = 0.6
const STAGGER = 0.08
const EASE = [0.76, 0, 0.24, 1]

const revealMs = (COLS - 1) * STAGGER * 1000 + PANEL_DURATION * 1000

const ROWS = ['top', 'bottom']

export default function Preloader({ onDone }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [revealing, setRevealing] = useState(false)

  // step through the words; on the last one, hold a beat then start the reveal
  useEffect(() => {
    if (wordIndex >= WORDS.length - 1) {
      const toReveal = setTimeout(() => setRevealing(true), LAST_HOLD_MS)
      return () => clearTimeout(toReveal)
    }
    const toNext = setTimeout(() => setWordIndex((i) => i + 1), WORD_MS)
    return () => clearTimeout(toNext)
  }, [wordIndex])

  useEffect(() => {
    if (!revealing) return
    const toDone = setTimeout(() => onDone?.(), revealMs + 80)
    return () => clearTimeout(toDone)
  }, [revealing, onDone])

  const cols = Array.from({ length: COLS })

  return (
    <div className="preloader" aria-hidden="true">
      {ROWS.map((row) => (
        <div key={row} className={`preloader-row preloader-row-${row}`}>
          {cols.map((_, i) => (
            <motion.span
              key={i}
              className="preloader-bar"
              // each column splits at its centre line: top half retracts UP to
              // the top edge, bottom half DOWN to the bottom edge, in sync (same
              // delay). Columns fire left→right via i * STAGGER — the staircase.
              style={{ transformOrigin: row }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: revealing ? 0 : 1 }}
              transition={{
                duration: PANEL_DURATION,
                ease: EASE,
                delay: revealing ? i * STAGGER : 0,
              }}
            />
          ))}
        </div>
      ))}

      <motion.div
        className="preloader-logo"
        initial={false}
        animate={{ opacity: revealing ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* keyed span: each new word remounts and rises in (plain motion, no
            AnimatePresence — its initial-enter is unreliable under StrictMode) */}
        <motion.span
          key={wordIndex}
          className="preloader-word"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          {WORDS[wordIndex]}
          <span className="preloader-word-dot">.</span>
        </motion.span>
      </motion.div>
    </div>
  )
}
