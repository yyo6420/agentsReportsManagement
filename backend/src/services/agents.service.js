import { ObjectId } from "mongodb";
import { agentsCollection, db } from "../mongodb/mongodb.js";

export const createAgent = async (agentCode, password, role) => {
    if (!agentsCollection) {
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
    if (!agentsCollection) {
        agentsCollection = db?.collection("agents");
    }
    const result = await agentsCollection.findOne({ agentCode: agentCode });

    return result;
}

export const getAgentById = async (id, fieldToDelete = []) => {
    if (!agentsCollection) {
        agentsCollection = db?.collection("agents");
    }

    const result = await agentsCollection.findOne({ _id: new ObjectId(id) });
    if (!result) throw new Error("The resulst are not found :(");

    fieldToDelete.forEach(field => {
        delete result[field]
    })
    return result;
}

export const getAgents = async (filter = {}) => {
    if (!agentsCollection) {
        agentsCollection = db?.collection("agents");
    }

    const result = agentsCollection.find(filter).toArray();
    if (!result) throw new Error("The resulst are not found :(");

    return result;

}