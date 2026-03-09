import { ObjectId } from "mongodb";
import { getdb } from "../mongodb/mongodb.js";

const db = await getdb(process.env.DB_NAME);
const collection = db?.collection("agents");

export const createAgent = async (agentCode, password) => {
    const result = await collection.insertOne({
        agentCode,
        password,
        role: "Agent"
    });
    return { id: result.insertedId, agentCode }
}

export const getAgent = async (agentCode) => {
    return collection.findOne({ agentCode })
}

export const getAgentById = async (id, fieldToDelet = []) => {
    const result = await collection.findOne({ _id: new ObjectId(id) });
    fieldToDelet.forEach(field => {
        delete result[field]
    })
    return result;
}