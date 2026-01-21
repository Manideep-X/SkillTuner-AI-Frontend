import z from "zod"

const ChangePassFormSchema = z.object({
    existingPassword: z.string().trim()
        .min(1, "Existing password is required!"),

    newPassword: z.string().trim()
        .min(6, "Must be atleast 6 characters long")
        .regex(/[a-z]/, "Must contain alteast one lower character")
        .regex(/[A-Z]/, "Must contain alteast one upper character")
        .regex(/\d/, "Must contain atleast one digit")
        .regex(/[^A-Za-z0-9]/, "Must contain atleast one special character"),

    repeatPassword: z.string().trim()
        .min(1, "Repeat the new password please!")
})
.refine(
    (data) => data.newPassword !== data.existingPassword,
    { error: "New password must be different from exisiting one", path: ["newPassword"] }
)
.refine(
    (data) => data.newPassword === data.repeatPassword,
    { error: "Passwords didn't match!" }
);

export { ChangePassFormSchema }