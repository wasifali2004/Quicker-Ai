"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { NavigationControls } from "./navigation-control";
import ProgressBar from "./progress.bar";
import SummaryPoints from "./Summary-Points";

const parseSection = (section: string): { title: string; points: string[] } => {
  const lines = section.split("\n");
  const title = lines[0] || "";
  const contentLines = lines.slice(1);

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];
  let currentPoint = "";
  contentLines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("•")) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = trimmedLine.substring(1).trim();
    } else if (trimmedLine === "") {
      if (currentPoint) {
        points.push(currentPoint.trim());
        currentPoint = "";
      }
    } else {
      currentPoint += " " + trimmedLine;
    }
  });

  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ),
  };
};

const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex flex-col gap-2 mb-4 sm:mb-6">
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-slate-800 leading-tight">
      {title}
    </h2>
  </div>
);

const SummaryViewer = ({ summary }: { summary: string }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = summary
    .split("\n#")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const handleSectionSelect = (index: number) => {
    setCurrentSection(index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="relative min-h-[600px] max-h-[80vh] bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl sm:rounded-3xl border border-rose-200 flex flex-col overflow-hidden">
        {/* Progress Bar - Fixed at top */}
        <div className="flex-shrink-0 border-b border-rose-100/50">
          <ProgressBar sections={sections} currentSection={currentSection} />
        </div>

        {/* Main Content - Scrollable middle section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-4">
            <SectionTitle title={sections[currentSection]?.title || ""} />
            <div className="pb-4">
              <SummaryPoints
                title={sections[currentSection]?.title || ""}
                points={sections[currentSection]?.points || []}
              />
            </div>
          </div>
        </div>

        {/* Navigation Controls - Fixed at bottom */}
        <div className="flex-shrink-0 border-t border-rose-100/50 bg-white/80 backdrop-blur-sm">
          <NavigationControls
            currentSection={currentSection}
            totalSections={sections.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSectionSelect={handleSectionSelect}
          />
        </div>
      </Card>
    </div>
  );
}

export default SummaryViewer;