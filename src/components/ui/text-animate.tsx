"use client"

import { ElementType } from "react"
import { motion, MotionProps, Variants } from "framer-motion"

import { cn } from "@/lib/utils"

type AnimationType = "text" | "word" | "character" | "line"
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown"

interface TextAnimateProps extends MotionProps {
  /**
   * The text content to animate
   */
  children: string
  /**
   * The class name to be applied to the component
   */
  className?: string
  /**
   * The class name to be applied to each segment
   */
  segmentClassName?: string
  /**
   * The delay before the animation starts
   */
  delay?: number
  /**
   * The duration of the animation
   */
  duration?: number
  /**
   * Custom motion variants for the animation
   */
  variants?: Variants
  /**
   * The element type to render
   */
  as?: ElementType
  /**
   * How to split the text ("text", "word", "character")
   */
  by?: AnimationType
  /**
   * Whether to start animation when component enters viewport
   */
  startOnView?: boolean
  /**
   * Whether to animate only once
   */
  once?: boolean
  /**
   * The animation preset to use
   */
  animation?: AnimationVariant
}

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
}

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const defaultItemAnimationVariants: Record<AnimationVariant, { container?: Variants; item: Variants }> = {
  fadeIn: {
    item: {
      hidden: { opacity: 0, y: 0 },
      show: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 0 },
    },
  },
  blurIn: {
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      show: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(10px)" },
    },
  },
  blurInUp: {
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
      show: { opacity: 1, filter: "blur(0px)", y: 0 },
      exit: { opacity: 0, filter: "blur(10px)", y: 20 },
    },
  },
  blurInDown: {
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
      show: { opacity: 1, filter: "blur(0px)", y: 0 },
      exit: { opacity: 0, filter: "blur(10px)", y: -20 },
    },
  },
  slideUp: {
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
  slideDown: {
    item: {
      hidden: { opacity: 0, y: -20 },
      show: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
  },
  slideLeft: {
    item: {
      hidden: { opacity: 0, x: 20 },
      show: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
  },
  slideRight: {
    item: {
      hidden: { opacity: 0, x: -20 },
      show: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
  },
  scaleUp: {
    item: {
      hidden: { opacity: 0, scale: 0.5 },
      show: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.5 },
    },
  },
  scaleDown: {
    item: {
      hidden: { opacity: 0, scale: 1.5 },
      show: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.5 },
    },
  },
}

export function TextAnimate({
  children,
  delay = 0,
  duration = 0.3,
  variants,
  className,
  segmentClassName,
  as: Component = "p",
  startOnView = true,
  once = false,
  by = "word",
  animation = "fadeIn",
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion.create(Component)

  // Use the animation preset variants if available
  const finalVariants = animation
    ? {
        container: {
          ...defaultContainerVariants,
          show: {
            ...defaultContainerVariants.show,
            transition: {
              ...defaultContainerVariants.show.transition,
              staggerChildren: staggerTimings[by],
            },
          },
          exit: {
            ...defaultContainerVariants.exit,
            transition: {
              ...defaultContainerVariants.exit.transition,
              staggerChildren: staggerTimings[by],
              staggerDirection: -1,
            },
          },
          ...defaultItemAnimationVariants[animation].container,
        },
        item: {
          ...defaultItemVariants,
          ...defaultItemAnimationVariants[animation].item,
        },
      }
    : { container: defaultContainerVariants, item: defaultItemVariants }

  // Use the custom transition if available
  if (variants) {
    if (variants.container) {
      finalVariants.container = {
        ...finalVariants.container,
        ...variants.container,
      }
    }
    if (variants.item) {
      finalVariants.item = {
        ...finalVariants.item,
        ...variants.item,
      } as Variants
    }
  }

  return (
    <MotionComponent
      variants={finalVariants.container}
      initial="hidden"
      whileInView={startOnView ? "show" : undefined}
      animate={startOnView ? undefined : "show"}
      exit="exit"
      className={cn("whitespace-pre-wrap", className)}
      viewport={{ once }}
      {...props}
    >
      {by === "text" ? (
        <motion.span variants={finalVariants.item} transition={{ delay, duration }}>
          {children}
        </motion.span>
      ) : (
        children.split(by === "word" ? " " : "").map((segment, i) => (
          <motion.span
            key={i}
            variants={finalVariants.item}
            transition={{
              delay: delay + i * staggerTimings[by],
              duration,
            }}
            className={cn("inline-block", segmentClassName)}
            style={{ marginRight: by === "word" ? "0.25em" : 0 }}
          >
            {segment}
          </motion.span>
        ))
      )}
    </MotionComponent>
  )
}
