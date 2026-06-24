'use server'

import { serverMutation } from "../api/server"



export const createSubscribe = async (subInfo) => {
    return serverMutation('/api/subscribes','POST', subInfo);
} 