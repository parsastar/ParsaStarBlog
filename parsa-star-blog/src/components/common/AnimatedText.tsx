"use client";
import React, { ElementType } from "react";
import { AnimationControls, m, Variant } from "motion/react";

type AnimatedTextProps = {
    controls: AnimationControls;
    totalDelay?: number;
    staggerDur?: number;
    type?: "word" | "char" | "all";
    text: string | string[];
    duration?: number;
    el?: ElementType;
    className?: string;
    animType?: "custom" | "maxHeight" | "opacity";
    repeatDelay?: number;
    animation?: {
        hidden: Variant;
        visible: Variant;
    };
};

const opacityAnim = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

const maxHeightAnim = {
    hidden: {
        y: "100%",
    },
    visible: {
        y: "0%",
    },
};

export const AnimatedText = ({
    controls,
    totalDelay = 0,
    duration = 0.1,
    type = "word",
    animType = "opacity",
    staggerDur = 0.1,
    text,
    el: Wrapper = "p",
    className,
    animation,
}: AnimatedTextProps) => {
    const textArray = Array.isArray(text) ? text : [text];
    const AnimSelect = () => {
        switch (animType) {
            case "custom":
                return animation;
            case "maxHeight":
                return maxHeightAnim;
            default:
                return opacityAnim;
        }
    };

    return (
        <Wrapper className={`${className}`}>
            <span className="sr-only">{textArray.join(" ")}</span>
            <m.span
                initial="hidden"
                animate={controls}
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: staggerDur,
                            delayChildren: totalDelay,
                        },
                    },
                    hidden: {},
                }}
                aria-hidden
            >
                {type == "all"
                    ? textArray.map((line, index) => (
                          <span key={index}>
                              <span
                                  style={
                                      animType == "maxHeight"
                                          ? {
                                                display: "block",
                                                maxHeight: "100%",
                                                overflow: "hidden",
                                                whiteSpace: "none",
                                            }
                                          : {}
                                  }
                              >
                                  <m.span
                                      className={`inline-block `}
                                      transition={{ duration: duration }}
                                      variants={AnimSelect()}
                                  >
                                      {line}
                                  </m.span>
                              </span>
                          </span>
                      ))
                    : textArray.map((line, lineIndex) => (
                          <span
                              style={
                                  animType == "maxHeight"
                                      ? {
                                            display: "block",
                                            maxHeight: "100%",
                                            overflow: "hidden",
                                            whiteSpace: "none",
                                        }
                                      : {}
                              }
                              key={`${line}-${lineIndex}`}
                          >
                              {line.split(" ").map((word, wordIndex) => (
                                  <span
                                      className="inline-block text-nowrap"
                                      key={`${word}-${wordIndex}`}
                                  >
                                      {type == "word" && (
                                          <m.span
                                              className="inline-block"
                                              variants={AnimSelect()}
                                              transition={{
                                                  duration: duration,
                                              }}
                                          >
                                              {word}
                                          </m.span>
                                      )}
                                      {type == "char" &&
                                          word
                                              .split("")
                                              .map((char, charIndex) => (
                                                  <m.span
                                                      key={`${char}-${charIndex}`}
                                                      className="inline-block"
                                                      variants={AnimSelect()}
                                                      transition={{
                                                          duration: duration,
                                                      }}
                                                  >
                                                      {char}
                                                  </m.span>
                                              ))}
                                      {line.split(" ")[wordIndex + 1] && (
                                          <span className="inline-block ">
                                              &nbsp;
                                          </span>
                                      )}
                                  </span>
                              ))}
                          </span>
                      ))}
            </m.span>
        </Wrapper>
    );
};
