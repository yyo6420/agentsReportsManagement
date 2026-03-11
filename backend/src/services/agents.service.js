import { ObjectId } from "mongodb";
import { agentsCollection, db } from "../mongodb/mongodb.js";

export const createAgent = async (agentCode, password, role) => {
    if (agentsCollection === undefined) {
        agentsCollection = db?.collection("agents");
    }

    const result = await agentsCollection.insertOne({
        agentCode,
        password,
        role
    });
    return { id: result.insertedId, agentCode }
}

export const getAgent = async (agentCode) => {
    if (agentsCollection === undefined) {
        agentsCollection = db?.collection("agents");
    }
    const result = agentsCollection.findOne({ agentCode })

    return result;
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