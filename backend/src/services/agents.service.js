import { ObjectId } from "mongodb";
import { getdb } from "../mongodb/mongodb.js";

const db = await getdb(process.env.DB_NAME);
const agentsCollection = db?.collection("agents");

export const createAgent = async (agentCode, password) => {
    if (agentsCollection === undefined) {
        agentsCollection = db?.collection("agents");
    }

    const result = await agentsCollection.insertOne({
        agentCode,
        password,
        role: "Agent"
    });
    return { id: result.insertedId, agentCode }
}

export const getAgent = async (agentCode) => {
    if (agentsCollection === undefined) {
        agentsCollection = db?.collection("agents");
    }

    return agentsCollection.findOne({ agentCode })
}

export const getAgentById = async (id, fieldToDelet = []) => {
    if (agentsCollection === undefined) {
        agentsCollection = db?.collection("agents");
    }

    const result = await agentsCollection.findOne({ _id: new ObjectId(id) });
    fieldToDelet.forEach(field => {
        delete result[field]
    })
    return result;
}

export const getAgents = async (filter = {}) => {
    try {
        if (agentsCollection === undefined) {
            agentsCollection = db?.collection("agents");
        }

        const result = agentsCollection.find(filter).toArray();

        return result;
    } catch (error) {
        console.error("Failed to fetch agents with filter:", filter);
        throw error;
    }
}