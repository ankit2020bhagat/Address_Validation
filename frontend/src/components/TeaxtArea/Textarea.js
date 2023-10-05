import React, { useMemo, useRef } from "react";
import {
  StyledTextareaWrapper,
  StyledTextarea,
  StyledNumbers,
  StyledNumber,
} from "./TextareaStyles";

export const Textarea = ({
  value,
  numOfLines,
  onValueChange,
  placeholder = "Enter Message",
  name,
}) => {
  const lineCount = useMemo(() => value.split("\n").length, [value]);
  const linesArr = useMemo(
    () =>
      Array.from({ length: Math.max(numOfLines, lineCount) }, (_, i) => i + 1),
    [lineCount, numOfLines]
  );

  const lineCounterRef = useRef(null);
  const textareaRef = useRef(null);

  const handleTextareaChange = (event) => {
    onValueChange(event.target.value);
  };

  const handleTextareaScroll = () => {
    if (lineCounterRef.current && textareaRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <StyledTextareaWrapper>
      <StyledNumbers ref={lineCounterRef}>
        {linesArr.map((count) => (
          <StyledNumber active={count <= lineCount} key={count}>
            {count}
          </StyledNumber>
        ))}
      </StyledNumbers>
      <StyledTextarea
        name={name}
        onChange={handleTextareaChange}
        onScroll={handleTextareaScroll}
        placeholder={placeholder}
        ref={textareaRef}
        value={value}
        wrap="off"
      />
    </StyledTextareaWrapper>
  );
};
