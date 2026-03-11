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
    if (agentsCollection === undefined) {
        agentsCollection = db?.collection("agents");
    }

    const result = agentsCollection.find(filter).toArray();
    if (!result) throw new Error("The resulst are not found :(");

    return result;

}