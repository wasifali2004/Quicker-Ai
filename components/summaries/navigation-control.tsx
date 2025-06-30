import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function NavigationControls({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSectionSelect,
}: {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onSectionSelect: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-sm border-t border-rose-100/50">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevious}
          disabled={currentSection === 0}
          className={cn(
            "rounded-full w-15 h-15 bg-gradient-to-br from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700",
            currentSection === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          )}
        >
          <ChevronLeft className='h-5 w-5' />    
        </Button>
        
        <div className="flex gap-2">
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSectionSelect(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentSection === index
                  ? 'bg-gradient-to-r from-rose-500 to-rose-600 scale-125'
                  : 'bg-rose-300/50 hover:bg-rose-400/70'
              )}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNext}
          disabled={currentSection === totalSections - 1}
          className={cn(
            "rounded-full w-15 h-15 bg-gradient-to-br from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700",
            currentSection === totalSections - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105"
          )}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}