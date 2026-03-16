export interface Section {
  title: string;
  points: string[];
}

export function parseSection(raw: string): Section {
  const lines = raw.split("\n");
  const titleLine = lines[0] || "";
  const cleanTitle = titleLine.startsWith("#")
    ? titleLine.replace(/^#+\s*/, "").trim()
    : titleLine.trim();

  const points: string[] = [];
  let current = "";

  for (const line of lines.slice(1)) {
    const trimmed = line.trim();
    // Accept standard markdown bullets like '-', '*', '•'
    if (/^[\-\*\•]\s/.test(trimmed)) {
      if (current) points.push(current.trim());
      current = trimmed.replace(/^[\-\*\•]\s+/, "").trim();
    } else if (trimmed === "") {
      if (current) {
        points.push(current.trim());
        current = "";
      }
    } else {
      current += " " + trimmed;
    }
  }
  if (current) points.push(current.trim());

  return {
    title: cleanTitle,
    points: points
      .map((p) => p.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1"))
      .filter((p) => p && !p.startsWith("#") && !p.startsWith("[Choose")),
  };
}

export function parseSummary(text: string): Section[] {
  return text
    .split("\n#")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parseSection)
    .filter((s) => s.points.length > 0);
}
