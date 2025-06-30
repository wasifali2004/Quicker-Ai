import { ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";
import DownloadSummaryButton from "./summary-download-button";

export function SourceInfo({fileName, originalFileUrl, title, createdAt, summaryText}: {fileName: string, originalFileUrl: string, title: string, createdAt:string, summaryText:string}) {
   return (
     <div className="flex flex-col items-center gap-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-100/50">
       <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
         <FileText className="h-4 w-4 text-rose-500" />
         <span className="font-medium">Source: {fileName}</span>
       </div>
       
       <div className="flex items-center justify-center gap-2">
         <Button
           variant="outline"
           size="sm"
           className="flex items-center gap-2 h-8 px-3 text-rose-600 bg-white border-rose-200 hover:text-rose-700 hover:bg-rose-50 transition-colors"
           asChild
         >
           <a href={originalFileUrl} target="_blank" rel="noopener noreferrer">
             <ExternalLink className="h-4 w-4" />
             View Original
           </a>
         </Button>
         
         <DownloadSummaryButton 
           title={title} 
           summaryText={summaryText} 
           fileName={fileName} 
           createdAt={createdAt} 
         />
       </div>
     </div>
   );
}