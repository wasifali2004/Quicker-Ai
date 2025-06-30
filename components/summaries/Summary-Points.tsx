import { motion } from "framer-motion";

function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^\*/.test(point);
  // Replace the Unicode property escape with a simpler regex
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[\*\|]\s*/, '').trim();
  
  const matches = cleanContent.match(/^(\p{Emoji})\s*(.*)$/u);
  if (!matches) return null;
  
  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}

const SummaryPoints = ({ title, points }: { title: string; points: string[] }) => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for individual points
  const pointVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  // Hover animation variants
  const hoverVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
    initial: {
      scale: 1,
    },
  };

  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, isEmpty } = parsePoint(point);
        const parsedEmoji = parseEmojiPoint(point);
        if (isEmpty) return null;

        if (hasEmoji || isMainPoint) {
          return (
            <motion.div
              key={`point-${index}`}
              variants={pointVariants}
              whileHover="hover"
              initial="initial"
              className="group relative bg-gradient-to-br 
              from-gray-200/[0.08] to-gray-400/[0.03] p-3
              rounded-2xl border border-gray-500/10
              hover:shadow-lg transition-all cursor-pointer"
            >
              <motion.div 
                className="absolute inset-0
                bg-gradient-to-br from-gray-100 to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity rounded-2xl"
                variants={hoverVariants}
              />
              <div className="relative flex items-start gap-3">
                <motion.span 
                  className="text-lg lg:text-xl shrink-0 pt-1"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: index * 0.1 + 0.3,
                    duration: 0.4,
                    ease: "backOut" as const,
                  }}
                >
                  {parsedEmoji?.emoji || '•'}
                </motion.span>
                <motion.p 
                  className="text-lg lg:text-xl
                  text-muted-foreground/90 leading-relaxed"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.1 + 0.4,
                    duration: 0.4,
                  }}
                >
                  {parsedEmoji?.text || point.replace(/^[\*•]\s*/, '')}
                </motion.p>
              </div>
            </motion.div>
          );
        }

        return (
          <motion.div
            key={`point-${index}`}
            variants={pointVariants}
            whileHover="hover"
            initial="initial"
            className="group relative bg-gradient-to-br 
            from-gray-200/[0.08] to-gray-400/[0.03] p-3
            rounded-2xl border border-gray-500/10
            hover:shadow-lg transition-all cursor-pointer"
          >
            <motion.div 
              className="absolute inset-0
              bg-gradient-to-br from-gray-100 to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity rounded-2xl"
              variants={hoverVariants}
            />
            <div className="relative flex items-start gap-3">
              <motion.span 
                className="text-lg lg:text-xl shrink-0 pt-1"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: index * 0.1 + 0.3,
                  duration: 0.4,
                  ease: "backOut" as const,
                }}
              >
                {isNumbered ? '' : '•'}
              </motion.span>
              <motion.p 
                className="text-lg lg:text-xl
                text-muted-foreground/90 leading-relaxed"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.1 + 0.4,
                  duration: 0.4,
                }}
              >
                {point}
              </motion.p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SummaryPoints;