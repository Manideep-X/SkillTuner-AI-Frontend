import z from "zod"

const MAX_RESUME_SIZE = 4 * 1024 * 1024; // 5 MB
const ACCEPTED_EXTENSIONS = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const resumeFormSchema = z.object({
    resumeTitle: z.string().trim()
        .min(1, "Title is required!"),

    resumeFile: z.any()
        .refine((resumes) => resumes?.length === 1, "Resume is required!")
        .refine((resumes) => resumes?.[0]?.size <= MAX_RESUME_SIZE, "Max resume size should be 4MB!")
        .refine((resumes) => ACCEPTED_EXTENSIONS.includes(resumes?.[0]?.type), "Only .pdf, .docx, and docx file are accepted")
});

export { resumeFormSchema }