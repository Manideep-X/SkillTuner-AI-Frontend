import z from "zod"

const addNewAnalysisSchema = z.object({
    jobTitle: z.string().trim()
        .min(1, "Job title is required!"),
    
    companyName: z.string().trim()
        .min(1, "Company name is required!"),
    
    description: z.string().trim().refine(
        (value) => value.split(/\s+/).filter(Boolean).length >= 40,
        { error: "Description must be at least 40 words" }),
    
    resumeId: z.string()
        .min(1, "A resume is needed to be linked!"),
});

export { addNewAnalysisSchema }