import z from "zod"

const changeNameFormSchema = z.object({
    firstName: z.string().trim()
        .min(1, "First name is required!"),

    lastName: z.string().trim()
        .min(1, "Last name is required!")
});

export { changeNameFormSchema }