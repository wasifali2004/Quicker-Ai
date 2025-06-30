import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const OurFileRouter = {
  pdfUploader: f({
    pdf: { maxFileSize: "32MB" },
  })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      if (!user) {
        console.log("Unauthorized User");
      }
      return { userId: user?.id };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload completed for user id: ", metadata.userId);

      return {
        userId: metadata.userId,
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          key: file.key,
          url: file.url,
          customId: file.customId,
        },
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof OurFileRouter;
