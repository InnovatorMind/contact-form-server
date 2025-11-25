// server/controllers/formController.js  (or wherever your controller file lives)
import { formSchema } from "../validation/formSchema.js";
import Contact from "../models/Contact.js";

export const submitForm = async (req, res, next) => {
  try {
    const result = formSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.errors,
      });
    }

    const data = result.data;

    console.log("VALID DATA RECEIVED:", data);

    // save to MongoDB Atlas
    const saved = await Contact.create(data); // will insert & return saved document

    return res.status(201).json({
      success: true,
      message: "Form submitted successfully!",
      data: saved,
    });
  } catch (err) {
    console.error("Error saving contact:", err);
    next(err);
  }
};
