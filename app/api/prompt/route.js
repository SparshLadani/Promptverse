import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Correctly define and export the GET function
export const GET = async (request) => {
    try {
        await connectToDB();

        console.log("Connected to MongoDB");

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
    }
};
